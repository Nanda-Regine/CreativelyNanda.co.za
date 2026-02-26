'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard, FileText, Package, ShoppingCart, Feather,
  MessageSquare, ArrowLeft, Save, Loader2, AlertCircle, Plus, X,
} from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { createPost } from '../../actions/posts';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Blog Posts', href: '/admin/blog', icon: FileText, active: true },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { label: 'Poetry', href: '/admin/poetry', icon: Feather },
  { label: 'Reviews', href: '/admin/reviews', icon: MessageSquare },
];

export default function NewBlogPostPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [category, setCategory] = useState<'dev' | 'writing' | 'business'>('writing');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [readingTime, setReadingTime] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);

  const autoSlug = (t: string) =>
    t.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();

  const handleTitleChange = (t: string) => {
    setTitle(t);
    if (!slug || slug === autoSlug(title)) {
      setSlug(autoSlug(t));
    }
  };

  const addTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
    setTagInput('');
  };

  const removeTag = (tag: string) => setTags(tags.filter(t => t !== tag));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !content) {
      setError('Title, slug, and content are required.');
      return;
    }
    setSaving(true);
    setError(null);

    const { data, error } = await createPost({
      title,
      slug,
      excerpt: excerpt || null,
      content,
      cover_image: coverImage || null,
      category,
      tags,
      reading_time: readingTime ? parseInt(readingTime) : null,
      is_published: isPublished,
      is_featured: isFeatured,
      published_at: isPublished ? new Date().toISOString() : null,
      author_id: null,
      view_count: 0,
      like_count: 0,
    });

    if (error) {
      setError(error);
      setSaving(false);
    } else if (data) {
      router.push(`/admin/blog/${data.id}/edit`);
    }
  };

  return (
    <div className="min-h-screen bg-parchment">
      <header className="bg-navy text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-display text-2xl font-bold text-beige">Nanda</Link>
          <Badge variant="secondary" size="sm" className="bg-cherry/20 text-cherry-light">Admin</Badge>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-beige/70 hover:text-beige text-sm">View Site</Link>
          <div className="w-10 h-10 rounded-full bg-cherry flex items-center justify-center text-white font-medium">N</div>
        </div>
      </header>

      <div className="flex">
        <aside className="w-64 bg-white border-r border-navy/10 min-h-[calc(100vh-64px)] p-4">
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    item.active ? 'bg-cherry/10 text-cherry font-medium' : 'text-navy/70 hover:bg-navy/5'
                  }`}
                >
                  <Icon className="w-5 h-5" />{item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 p-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <Link href="/admin/blog">
                <button className="p-2 rounded-lg hover:bg-navy/5 text-navy/60 transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </Link>
              <div>
                <h1 className="text-3xl font-display font-bold text-navy">New Blog Post</h1>
                <p className="text-navy/60">Write and publish a new article</p>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 rounded-xl p-4 border border-red-200 mb-6 flex items-center gap-3 text-red-700">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-6">
              {/* Core Info */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-navy/10">
                <h2 className="font-semibold text-navy mb-5 text-lg">Core Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5">Title *</label>
                    <input
                      value={title}
                      onChange={e => handleTitleChange(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 border border-navy/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry/20 focus:border-cherry"
                      placeholder="An interesting title..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5">Slug *</label>
                    <input
                      value={slug}
                      onChange={e => setSlug(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 border border-navy/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry/20 focus:border-cherry font-mono text-sm"
                      placeholder="auto-generated-from-title"
                    />
                    <p className="text-xs text-navy/40 mt-1">URL: /blog/{category}/{slug}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5">Excerpt</label>
                    <textarea
                      value={excerpt}
                      onChange={e => setExcerpt(e.target.value)}
                      rows={2}
                      className="w-full px-4 py-2.5 border border-navy/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry/20 focus:border-cherry resize-none"
                      placeholder="Short summary shown in post cards..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5">Content *</label>
                    <textarea
                      value={content}
                      onChange={e => setContent(e.target.value)}
                      required
                      rows={16}
                      className="w-full px-4 py-2.5 border border-navy/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry/20 focus:border-cherry resize-y font-mono text-sm"
                      placeholder="Write your full article here. Markdown is supported..."
                    />
                  </div>
                </div>
              </div>

              {/* Category & Settings */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-navy/10">
                <h2 className="font-semibold text-navy mb-5 text-lg">Category & Settings</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5">Category *</label>
                    <select
                      value={category}
                      onChange={e => setCategory(e.target.value as typeof category)}
                      className="w-full px-4 py-2.5 border border-navy/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry/20 focus:border-cherry bg-white"
                    >
                      <option value="writing">Writing</option>
                      <option value="dev">Development</option>
                      <option value="business">Business</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5">Reading Time (mins)</label>
                    <input
                      type="number"
                      value={readingTime}
                      onChange={e => setReadingTime(e.target.value)}
                      min="1"
                      className="w-full px-4 py-2.5 border border-navy/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry/20 focus:border-cherry"
                      placeholder="5"
                    />
                  </div>
                  <div className="flex items-center gap-3 pt-1">
                    <input
                      type="checkbox"
                      id="published"
                      checked={isPublished}
                      onChange={e => setIsPublished(e.target.checked)}
                      className="rounded border-navy/20 text-cherry focus:ring-cherry w-4 h-4"
                    />
                    <label htmlFor="published" className="text-sm font-medium text-navy cursor-pointer">
                      Publish immediately
                    </label>
                  </div>
                  <div className="flex items-center gap-3 pt-1">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={isFeatured}
                      onChange={e => setIsFeatured(e.target.checked)}
                      className="rounded border-navy/20 text-cherry focus:ring-cherry w-4 h-4"
                    />
                    <label htmlFor="featured" className="text-sm font-medium text-navy cursor-pointer">
                      Featured post
                    </label>
                  </div>
                </div>

                {/* Tags */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-navy mb-1.5">Tags</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      value={tagInput}
                      onChange={e => setTagInput(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
                      className="flex-1 px-4 py-2.5 border border-navy/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry/20 focus:border-cherry text-sm"
                      placeholder="Type a tag and press Enter or Add"
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      className="flex items-center gap-1 px-4 py-2.5 bg-navy/5 hover:bg-navy/10 text-navy rounded-lg transition-colors text-sm"
                    >
                      <Plus className="w-4 h-4" /> Add
                    </button>
                  </div>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {tags.map(tag => (
                        <span key={tag} className="flex items-center gap-1 px-3 py-1 bg-cherry/10 text-cherry text-sm rounded-full">
                          {tag}
                          <button type="button" onClick={() => removeTag(tag)} className="hover:text-cherry/60">
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Cover Image */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-navy/10">
                <h2 className="font-semibold text-navy mb-5 text-lg">Cover Image</h2>
                <ImageUploader
                  images={coverImage ? [coverImage] : []}
                  onChange={(imgs) => setCoverImage(imgs[0] || '')}
                  folder="blog/covers"
                  maxImages={1}
                  label="Cover Photo"
                />
              </div>

              <div className="flex items-center justify-between pb-12">
                <Link href="/admin/blog">
                  <Button type="button" variant="ghost" className="rounded-lg">Cancel</Button>
                </Link>
                <Button
                  type="submit"
                  variant="primary"
                  className="rounded-lg px-8"
                  disabled={saving}
                  leftIcon={saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                >
                  {saving ? 'Creating...' : isPublished ? 'Publish Post' : 'Save Draft'}
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
