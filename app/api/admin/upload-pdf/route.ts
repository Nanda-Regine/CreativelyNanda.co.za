import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

const BUCKET = 'products';
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const ALLOWED_TYPES = ['application/pdf'];

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'pdfs';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: 'Only PDF files are allowed' }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File must be under 50MB' }, { status: 400 });
    }

    const supabase = createAdminClient();

    // Ensure the products bucket exists (private — files served via signed URLs)
    await supabase.storage.createBucket(BUCKET, {
      public: false,
      fileSizeLimit: MAX_FILE_SIZE,
    });

    const safeName = file.name
      .replace(/\.pdf$/i, '')
      .replace(/[^a-z0-9]/gi, '-')
      .toLowerCase()
      .slice(0, 60);
    const path = `${folder}/${Date.now()}-${safeName}.pdf`;

    const buffer = await file.arrayBuffer();

    const { data, error } = await supabase.storage
      .from(BUCKET)
      .upload(path, buffer, {
        contentType: 'application/pdf',
        upsert: false,
      });

    if (error) {
      console.error('PDF upload error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Return the storage path (not a public URL — downloads go via signed URL)
    return NextResponse.json({ path: data.path });
  } catch (err) {
    console.error('PDF upload route error:', err);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { path } = await req.json();
    if (!path) return NextResponse.json({ error: 'No path provided' }, { status: 400 });

    const supabase = createAdminClient();

    const { error } = await supabase.storage.from(BUCKET).remove([path]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('PDF delete route error:', err);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
