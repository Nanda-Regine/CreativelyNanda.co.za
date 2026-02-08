/**
 * Blog Post Preparation Script
 *
 * Converts Markdown drafts to site-ready format
 *
 * Usage: npm run prepare-posts
 *
 * MD Format (frontmatter):
 * ---
 * title: Your Post Title
 * slug: your-post-slug
 * category: dev | writing | business
 * excerpt: Short description for previews
 * coverImage: /assets/path/to/image.jpg (optional)
 * publishDate: 2024-03-15 (scheduled date)
 * ---
 *
 * Your markdown content here...
 */

const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '..', 'content');
const DRAFTS_DIR = path.join(CONTENT_DIR, 'drafts');
const SCHEDULED_DIR = path.join(CONTENT_DIR, 'scheduled');
const OUTPUT_FILE = path.join(CONTENT_DIR, 'posts-ready.json');

// Parse frontmatter from MD file
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { metadata: {}, content: content };
  }

  const frontmatter = match[1];
  const markdownContent = match[2];

  const metadata = {};
  frontmatter.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      const value = line.slice(colonIndex + 1).trim();
      metadata[key] = value;
    }
  });

  return { metadata, content: markdownContent.trim() };
}

// Generate table of contents from markdown headings
function generateTOC(content) {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const toc = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const title = match[2];
    const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    toc.push({ id, title, level });
  }

  return toc;
}

// Estimate reading time
function estimateReadingTime(content) {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Process a single MD file
function processMarkdownFile(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { metadata, content } = parseFrontmatter(fileContent);

  if (!metadata.title || !metadata.slug || !metadata.category) {
    console.warn(`⚠️  Skipping ${path.basename(filePath)}: Missing required frontmatter (title, slug, category)`);
    return null;
  }

  const post = {
    slug: metadata.slug,
    title: metadata.title,
    excerpt: metadata.excerpt || '',
    category: metadata.category,
    coverImage: metadata.coverImage || null,
    publishDate: metadata.publishDate || null,
    readingTime: estimateReadingTime(content),
    author: {
      name: 'Nanda Kabali-Kagwa',
      avatar: '/assets/professional/nanda-professional.png'
    },
    content: content,
    tableOfContents: generateTOC(content),
    sourceFile: path.basename(filePath),
    processedAt: new Date().toISOString()
  };

  return post;
}

// Main function
function preparePosts() {
  console.log('\n📝 Blog Post Preparation Script\n');
  console.log('================================\n');

  // Ensure directories exist
  [DRAFTS_DIR, SCHEDULED_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  // Get all MD files from drafts
  const draftFiles = fs.readdirSync(DRAFTS_DIR)
    .filter(f => f.endsWith('.md'))
    .map(f => path.join(DRAFTS_DIR, f));

  if (draftFiles.length === 0) {
    console.log('📭 No draft files found in /content/drafts/');
    console.log('\nCreate a .md file with this format:\n');
    console.log(`---
title: Your Post Title
slug: your-post-slug
category: dev
excerpt: A short description
publishDate: 2024-03-15
---

## Your Content Here

Write your post in markdown...
`);
    return;
  }

  console.log(`📂 Found ${draftFiles.length} draft(s)\n`);

  const processedPosts = [];
  const errors = [];

  draftFiles.forEach(filePath => {
    const fileName = path.basename(filePath);
    try {
      const post = processMarkdownFile(filePath);
      if (post) {
        processedPosts.push(post);

        // Move to scheduled folder
        const destPath = path.join(SCHEDULED_DIR, fileName);
        fs.copyFileSync(filePath, destPath);
        fs.unlinkSync(filePath);

        console.log(`✅ ${post.title}`);
        console.log(`   → Category: ${post.category}`);
        console.log(`   → Reading time: ${post.readingTime} min`);
        console.log(`   → Scheduled: ${post.publishDate || 'Not set'}`);
        console.log('');
      }
    } catch (err) {
      errors.push({ file: fileName, error: err.message });
      console.log(`❌ ${fileName}: ${err.message}\n`);
    }
  });

  // Save processed posts to JSON
  if (processedPosts.length > 0) {
    // Load existing posts if any
    let allPosts = [];
    if (fs.existsSync(OUTPUT_FILE)) {
      allPosts = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf-8'));
    }

    // Add new posts (avoid duplicates by slug)
    const existingSlugs = new Set(allPosts.map(p => p.slug));
    processedPosts.forEach(post => {
      if (!existingSlugs.has(post.slug)) {
        allPosts.push(post);
      } else {
        // Update existing
        const index = allPosts.findIndex(p => p.slug === post.slug);
        allPosts[index] = post;
      }
    });

    // Sort by publishDate
    allPosts.sort((a, b) => {
      if (!a.publishDate) return 1;
      if (!b.publishDate) return -1;
      return new Date(a.publishDate) - new Date(b.publishDate);
    });

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allPosts, null, 2));

    console.log('================================\n');
    console.log(`✨ Processed ${processedPosts.length} post(s)`);
    console.log(`📁 Moved to /content/scheduled/`);
    console.log(`📄 Updated /content/posts-ready.json`);
    console.log(`\n📊 Total scheduled posts: ${allPosts.length}`);

    // Show upcoming schedule
    const upcoming = allPosts.filter(p => p.publishDate).slice(0, 5);
    if (upcoming.length > 0) {
      console.log('\n📅 Upcoming Schedule:');
      upcoming.forEach(p => {
        console.log(`   ${p.publishDate}: ${p.title}`);
      });
    }
  }

  if (errors.length > 0) {
    console.log(`\n⚠️  ${errors.length} file(s) had errors`);
  }

  console.log('\n');
}

// Run
preparePosts();
