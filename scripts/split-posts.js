/**
 * Split a single MD file with multiple posts into individual files
 */

const fs = require('fs');
const path = require('path');

const DRAFTS_DIR = path.join(__dirname, '..', 'content', 'drafts');

// Category mapping based on post titles/content
const categoryMap = {
  'TECH EDUCATION': 'dev',
  'BUSINESS STRATEGY': 'business',
  'CREATIVE PROCESS': 'writing',
  'PSYCHOLOGY': 'writing',
  'MARKETING': 'business',
  'PRODUCTIVITY': 'business',
  'WELLNESS': 'writing',
  'CULTURAL': 'writing',
  'PERSONAL FINANCE': 'business',
  'FUTURE': 'dev',
  'AI': 'dev',
  'DESIGN': 'dev',
  'ENTREPRENEURSHIP': 'business',
  'FREELANCING': 'business',
  'WRITING': 'writing',
  'POETRY': 'writing',
  'MINDSET': 'writing',
};

function detectCategory(title, content) {
  const upperTitle = title.toUpperCase();
  for (const [key, cat] of Object.entries(categoryMap)) {
    if (upperTitle.includes(key)) return cat;
  }
  // Default based on content keywords
  if (content.includes('code') || content.includes('developer') || content.includes('programming')) return 'dev';
  if (content.includes('income') || content.includes('business') || content.includes('career')) return 'business';
  return 'writing';
}

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 60)
    .replace(/-$/, '');
}

function generateExcerpt(content) {
  // Get first paragraph after intro
  const paragraphs = content.split('\n\n').filter(p => p.trim() && !p.startsWith('#') && !p.startsWith('**'));
  if (paragraphs.length > 0) {
    let excerpt = paragraphs[0].replace(/\*\*/g, '').replace(/\n/g, ' ').trim();
    if (excerpt.length > 200) {
      excerpt = excerpt.substring(0, 197) + '...';
    }
    return excerpt;
  }
  return 'An insightful article on creativity, technology, and growth.';
}

// Schedule posts: 3 per week (Mon, Wed, Fri)
function generateSchedule(count) {
  const dates = [];
  let currentDate = new Date('2024-02-12'); // Start date
  let dayCount = 0;

  for (let i = 0; i < count; i++) {
    // Mon=1, Wed=3, Fri=5
    while (![1, 3, 5].includes(currentDate.getDay())) {
      currentDate.setDate(currentDate.getDate() + 1);
    }
    dates.push(currentDate.toISOString().split('T')[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

function splitPosts() {
  console.log('\n✂️  Post Splitter\n');

  // Find the combined file
  const files = fs.readdirSync(DRAFTS_DIR).filter(f => f.endsWith('.md'));
  const combinedFile = files.find(f => f.toLowerCase().includes('post') || f.toLowerCase().includes('educational'));

  if (!combinedFile) {
    console.log('No combined posts file found in /content/drafts/');
    return;
  }

  const filePath = path.join(DRAFTS_DIR, combinedFile);
  const content = fs.readFileSync(filePath, 'utf-8');

  // Split by "## POST" pattern
  const postPattern = /## POST \d+:?\s*([A-Z\s&]+)\n### \*\*(.+?)\*\*/g;
  const posts = [];
  let lastIndex = 0;
  let match;

  // Find all post markers
  const markers = [];
  while ((match = postPattern.exec(content)) !== null) {
    markers.push({
      index: match.index,
      category: match[1].trim(),
      title: match[2].trim()
    });
  }

  // Extract content for each post
  for (let i = 0; i < markers.length; i++) {
    const start = markers[i].index;
    const end = markers[i + 1]?.index || content.length;
    const postContent = content.substring(start, end).trim();

    // Remove the "## POST N:" line and get clean content
    const cleanContent = postContent
      .replace(/^## POST \d+:?\s*[A-Z\s&]+\n/, '')
      .replace(/^### \*\*(.+?)\*\*\n/, '## $1\n')
      .trim();

    posts.push({
      category: markers[i].category,
      title: markers[i].title,
      content: cleanContent
    });
  }

  console.log(`Found ${posts.length} posts\n`);

  // Generate schedule
  const schedule = generateSchedule(posts.length);

  // Create individual files
  posts.forEach((post, i) => {
    const slug = generateSlug(post.title);
    const category = detectCategory(post.category, post.content);
    const excerpt = generateExcerpt(post.content);
    const publishDate = schedule[i];

    const frontmatter = `---
title: ${post.title}
slug: ${slug}
category: ${category}
excerpt: ${excerpt.replace(/:/g, ' -')}
publishDate: ${publishDate}
---

${post.content}`;

    const fileName = `${String(i + 1).padStart(2, '0')}-${slug.substring(0, 40)}.md`;
    const outputPath = path.join(DRAFTS_DIR, fileName);

    fs.writeFileSync(outputPath, frontmatter);

    console.log(`✅ ${fileName}`);
    console.log(`   → ${post.title.substring(0, 50)}...`);
    console.log(`   → Category: ${category} | Scheduled: ${publishDate}\n`);
  });

  // Remove original combined file
  fs.unlinkSync(filePath);
  console.log(`\n🗑️  Removed original file: ${combinedFile}`);
  console.log(`\n✨ Created ${posts.length} individual post files`);
  console.log(`\nNext: Run 'npm run prepare-posts' to process them\n`);
}

splitPosts();
