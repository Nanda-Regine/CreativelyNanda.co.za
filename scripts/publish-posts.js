/**
 * Blog Post Publishing Script
 *
 * Publishes scheduled posts that are ready (publishDate <= today)
 * Or publish specific posts by slug
 *
 * Usage:
 *   npm run publish-posts              # Publish all due posts
 *   npm run publish-posts -- --all     # Publish all scheduled posts
 *   npm run publish-posts -- my-slug   # Publish specific post
 */

const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '..', 'content');
const SCHEDULED_DIR = path.join(CONTENT_DIR, 'scheduled');
const PUBLISHED_DIR = path.join(CONTENT_DIR, 'published');
const POSTS_FILE = path.join(CONTENT_DIR, 'posts-ready.json');
const BLOG_PAGE = path.join(__dirname, '..', 'app', 'blog', '[category]', '[slug]', 'page.tsx');

function loadPosts() {
  if (!fs.existsSync(POSTS_FILE)) {
    return [];
  }
  return JSON.parse(fs.readFileSync(POSTS_FILE, 'utf-8'));
}

function savePosts(posts) {
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));
}

// Generate the article entry for the blog page
function generateArticleEntry(post) {
  const coverImage = post.coverImage ? `'${post.coverImage}'` : 'null';
  const tocEntries = post.tableOfContents
    .map(t => `      { id: '${t.id}', title: '${t.title.replace(/'/g, "\\'")}', level: ${t.level} },`)
    .join('\n');

  return `  '${post.slug}': {
    article: {
      slug: '${post.slug}',
      title: '${post.title.replace(/'/g, "\\'")}',
      excerpt: '${post.excerpt.replace(/'/g, "\\'")}',
      coverImage: ${coverImage},
      category: '${post.category}',
      publishedAt: '${post.publishDate || new Date().toISOString().split('T')[0]}',
      readingTime: ${post.readingTime},
      author: { name: 'Nanda Kabali-Kagwa', avatar: '/assets/professional/nanda-professional.png' },
    },
    content: \`
${post.content}
    \`,
    tableOfContents: [
${tocEntries}
    ],
  },`;
}

// Generate article card entry for blog listing
function generateListingEntry(post) {
  const coverImage = post.coverImage ? `'${post.coverImage}'` : 'null';
  return `  {
    slug: '${post.slug}',
    title: '${post.title.replace(/'/g, "\\'")}',
    excerpt: '${post.excerpt.replace(/'/g, "\\'")}',
    coverImage: ${coverImage},
    category: '${post.category}',
    publishedAt: '${post.publishDate || new Date().toISOString().split('T')[0]}',
    readingTime: ${post.readingTime},
    author: { name: 'Nanda Kabali-Kagwa', avatar: null },
  },`;
}

function publishPost(post) {
  // Move the MD file from scheduled to published
  const scheduledFile = path.join(SCHEDULED_DIR, post.sourceFile);
  const publishedFile = path.join(PUBLISHED_DIR, post.sourceFile);

  if (fs.existsSync(scheduledFile)) {
    if (!fs.existsSync(PUBLISHED_DIR)) {
      fs.mkdirSync(PUBLISHED_DIR, { recursive: true });
    }
    fs.copyFileSync(scheduledFile, publishedFile);
    fs.unlinkSync(scheduledFile);
  }

  return {
    articleEntry: generateArticleEntry(post),
    listingEntry: generateListingEntry(post)
  };
}

function main() {
  console.log('\n📰 Blog Post Publisher\n');
  console.log('======================\n');

  const args = process.argv.slice(2);
  const publishAll = args.includes('--all');
  const specificSlug = args.find(a => !a.startsWith('--'));

  const posts = loadPosts();

  if (posts.length === 0) {
    console.log('📭 No posts in queue. Run `npm run prepare-posts` first.\n');
    return;
  }

  const today = new Date().toISOString().split('T')[0];

  // Determine which posts to publish
  let toPublish = [];

  if (specificSlug) {
    const post = posts.find(p => p.slug === specificSlug);
    if (post) {
      toPublish = [post];
    } else {
      console.log(`❌ Post not found: ${specificSlug}\n`);
      console.log('Available posts:');
      posts.forEach(p => console.log(`   - ${p.slug}`));
      return;
    }
  } else if (publishAll) {
    toPublish = posts;
  } else {
    // Publish posts with publishDate <= today
    toPublish = posts.filter(p => p.publishDate && p.publishDate <= today);
  }

  if (toPublish.length === 0) {
    console.log('📅 No posts due for publishing today.\n');
    console.log('Scheduled posts:');
    posts.forEach(p => {
      const status = p.publishDate <= today ? '✅ Ready' : '⏳ Scheduled';
      console.log(`   ${p.publishDate || 'No date'}: ${p.title} [${status}]`);
    });
    console.log('\nUse --all to publish all, or specify a slug.\n');
    return;
  }

  console.log(`📝 Publishing ${toPublish.length} post(s):\n`);

  const articleEntries = [];
  const listingEntries = [];

  toPublish.forEach(post => {
    console.log(`✅ ${post.title}`);
    console.log(`   → ${post.category} | ${post.readingTime} min read`);

    const { articleEntry, listingEntry } = publishPost(post);
    articleEntries.push(articleEntry);
    listingEntries.push(listingEntry);
  });

  // Remove published posts from queue
  const remainingPosts = posts.filter(p => !toPublish.find(tp => tp.slug === p.slug));
  savePosts(remainingPosts);

  // Output the code to add
  console.log('\n======================\n');
  console.log('📋 ADD TO app/blog/[category]/[slug]/page.tsx (ARTICLES_DB):\n');
  console.log(articleEntries.join('\n'));

  console.log('\n📋 ADD TO app/blog/page.tsx (ARTICLES array):\n');
  console.log(listingEntries.join('\n'));

  console.log('\n======================');
  console.log(`\n✨ Published ${toPublish.length} post(s)`);
  console.log(`📁 MD files moved to /content/published/`);
  console.log(`📊 Remaining in queue: ${remainingPosts.length}`);

  if (remainingPosts.length > 0) {
    console.log('\n📅 Next up:');
    remainingPosts.slice(0, 3).forEach(p => {
      console.log(`   ${p.publishDate || 'No date'}: ${p.title}`);
    });
  }

  console.log('\n');
}

main();
