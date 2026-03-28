import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

const BUCKET = 'product-images';
const BASE_URL = `https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/${BUCKET}`;

// Maps product slug → possible folder names in the bucket
const SLUG_FOLDER_MAP: Record<string, string[]> = {
  'writers-sanctuary':              ['writers-sanctuary', 'writers_sanctuary', 'writerssanctuary'],
  'creators-studio':                ['creators-studio', 'creators_studio', 'creatorsstudio'],
  'music-artist-career-command-center': ['music-artist', 'music-artist-career-command-center', 'music_artist'],
  'high-school-academic-excellence':    ['high-school', 'high-school-academic-excellence', 'high_school'],
  'varsity-academic-excellence':        ['varsity', 'varsity-academic-excellence'],
  'sme-command-center':                 ['sme', 'sme-command-center', 'sme_command_center'],
};

export async function GET() {
  const supabase = createAdminClient();

  // List all files in the bucket
  const { data: rootFolders, error: listError } = await supabase.storage
    .from(BUCKET)
    .list('', { limit: 100 });

  if (listError) {
    return NextResponse.json({ error: listError.message }, { status: 500 });
  }

  // Get all folder names that exist
  const existingFolders = (rootFolders || [])
    .filter(f => f.id === null) // folders have null id
    .map(f => f.name);

  // Also include root files (files uploaded directly without a folder)
  const rootFiles = (rootFolders || [])
    .filter(f => f.id !== null)
    .map(f => f.name);

  const report: Record<string, {
    folderFound: string | null;
    files: string[];
    coverPhoto: string | null;
    screenshots: string[];
    currentDbUrls: string[];
  }> = {};

  // For each product, find which folder it's in and list its files
  for (const [slug, candidates] of Object.entries(SLUG_FOLDER_MAP)) {
    const foundFolder = candidates.find(c => existingFolders.includes(c)) || null;

    let files: string[] = [];
    if (foundFolder) {
      const { data: folderFiles } = await supabase.storage
        .from(BUCKET)
        .list(foundFolder, { limit: 50 });
      files = (folderFiles || []).filter(f => f.id !== null).map(f => f.name);
    }

    const coverPhoto = files.find(f =>
      f.toLowerCase().includes('cover') || f.toLowerCase().startsWith('cover')
    ) || null;

    const screenshots = files
      .filter(f => f.toLowerCase().includes('screenshot'))
      .sort((a, b) => {
        const numA = parseInt(a.match(/\d+/)?.[0] || '0');
        const numB = parseInt(b.match(/\d+/)?.[0] || '0');
        return numA - numB;
      });

    report[slug] = { folderFound: foundFolder, files, coverPhoto, screenshots, currentDbUrls: [] };
  }

  // Fetch current DB image URLs for comparison
  const { data: products } = await supabase
    .from('products')
    .select('slug, thumbnail, images')
    .in('slug', Object.keys(SLUG_FOLDER_MAP));

  for (const p of products || []) {
    if (report[p.slug]) {
      report[p.slug].currentDbUrls = [p.thumbnail, ...(p.images || [])].filter(Boolean);
    }
  }

  return NextResponse.json({
    existingFolders,
    rootFiles,
    report,
  });
}

export async function POST() {
  const supabase = createAdminClient();
  const updated: string[] = [];
  const skipped: string[] = [];
  const errors: string[] = [];

  for (const [slug, candidates] of Object.entries(SLUG_FOLDER_MAP)) {
    // List root to find existing folders
    const { data: rootFolders } = await supabase.storage.from(BUCKET).list('', { limit: 100 });
    const existingFolders = (rootFolders || []).filter(f => f.id === null).map(f => f.name);
    const foundFolder = candidates.find(c => existingFolders.includes(c)) || null;

    if (!foundFolder) {
      skipped.push(`${slug}: no folder found (tried: ${candidates.join(', ')})`);
      continue;
    }

    // List files in the folder
    const { data: folderFiles } = await supabase.storage
      .from(BUCKET)
      .list(foundFolder, { limit: 50 });

    const files = (folderFiles || []).filter(f => f.id !== null).map(f => f.name);
    if (files.length === 0) {
      skipped.push(`${slug}: folder "${foundFolder}" is empty`);
      continue;
    }

    // Find cover photo
    const coverFile = files.find(f =>
      f.toLowerCase().startsWith('cover') || f.toLowerCase().includes('cover-photo')
    ) || files[0];

    // Find screenshots sorted by number
    const screenshotFiles = files
      .filter(f => f.toLowerCase().includes('screenshot'))
      .sort((a, b) => {
        const numA = parseInt(a.match(/\d+/)?.[0] || '0');
        const numB = parseInt(b.match(/\d+/)?.[0] || '0');
        return numA - numB;
      });

    // Build URLs
    const thumbnailUrl = `${BASE_URL}/${foundFolder}/${coverFile}`;
    const imageUrls = [
      `${BASE_URL}/${foundFolder}/${coverFile}`,
      ...screenshotFiles.map(f => `${BASE_URL}/${foundFolder}/${f}`),
    ];

    // Update product in DB
    const { error } = await supabase
      .from('products')
      .update({ thumbnail: thumbnailUrl, images: imageUrls })
      .eq('slug', slug);

    if (error) {
      errors.push(`${slug}: ${error.message}`);
    } else {
      updated.push(`${slug}: ${foundFolder}/ → ${imageUrls.length} images`);
    }
  }

  return NextResponse.json({ updated, skipped, errors });
}
