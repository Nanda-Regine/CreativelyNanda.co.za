'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard, FileText, Package, ShoppingCart, Feather,
  MessageSquare, ArrowLeft, Save, Loader2, AlertCircle, CheckCircle,
} from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import { getPoem, updatePoem } from '../../../actions/poems';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Blog Posts', href: '/admin/blog', icon: FileText },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { label: 'Poetry', href: '/admin/poetry', icon: Feather, active: true },
  { label: 'Reviews', href: '/admin/reviews', icon: MessageSquare },
];

const THEMES = ['love', 'sensual', 'life', 'personal', 'healing', 'empowerment', 'nature', 'spirituality'];
const MOODS = ['tender', 'fierce', 'melancholic', 'joyful', 'reflective', 'raw', 'hopeful', 'longing'];

export default function EditPoemPage() {
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [collection, setCollection] = useState('');
  const [theme, setTheme] = useState('');
  const [mood, setMood] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);

  useEffect(() => {
    async function load() {
      const { data, error } = await getPoem(id);
      if (error || !data) {
        setError(error || 'Poem not found');
        setLoading(false);
        return;
      }
      setTitle(data.title);
      setSlug(data.slug);
      setContent(data.content);
      setExcerpt(data.excerpt || '');
      setCollection(data.collection || '');
      setTheme(data.theme || '');
      setMood(data.mood || '');
      setAudioUrl(data.audio_url || '');
      setIsPublished(data.is_published);
      setIsFeatured(data.is_featured);
      setLoading(false);
    }
    load();
  }, [id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const { error } = await updatePoem(id, {
      title,
      slug,
      content,
      excerpt: excerpt || null,
      collection: collection || null,
      theme: theme || null,
      mood: mood || null,
      audio_url: audioUrl || null,
      is_published: isPublished,
      is_featured: isFeatured,
      published_at: isPublished ? new Date().toISOString() : null,
    });

    if (error) {
      setError(error);
    } else {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
    setSaving(false);
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
              <Link href="/admin/poetry">
                <button className="p-2 rounded-lg hover:bg-navy/5 text-navy/60 transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </Link>
              <div>
                <h1 className="text-3xl font-display font-bold text-navy">Edit Poem</h1>
                <p className="text-navy/60">Update your poem content and settings</p>
              </div>
            </div>

            {loading && (
              <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-navy/10">
                <Loader2 className="w-8 h-8 text-cherry animate-spin mx-auto mb-4" />
                <p className="text-navy/60">Loading poem...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 rounded-xl p-4 border border-red-200 mb-6 flex items-center gap-3 text-red-700">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {success && (
              <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200 mb-6 flex items-center gap-3 text-emerald-700">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <p>Poem saved successfully!</p>
              </div>
            )}

            {!loading && (
              <form onSubmit={handleSave} className="space-y-6">
                {/* Core Info */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-navy/10">
                  <h2 className="font-semibold text-navy mb-5 text-lg">Poem Details</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">Title *</label>
                      <input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                        className="w-full px-4 py-2.5 border border-navy/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry/20 focus:border-cherry"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">Slug *</label>
                      <input
                        value={slug}
                        onChange={e => setSlug(e.target.value)}
                        required
                        className="w-full px-4 py-2.5 border border-navy/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry/20 focus:border-cherry font-mono text-sm"
                      />
                      <p className="text-xs text-navy/40 mt-1">URL: /poetry/collection/{slug}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">Poem Content *</label>
                      <textarea
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        required
                        rows={16}
                        className="w-full px-4 py-2.5 border border-navy/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry/20 focus:border-cherry resize-y font-serif text-base leading-relaxed"
                        placeholder="Write your poem here..."
                      />
                      <p className="text-xs text-navy/40 mt-1">Use line breaks to format stanzas.</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">Excerpt</label>
                      <textarea
                        value={excerpt}
                        onChange={e => setExcerpt(e.target.value)}
                        rows={2}
                        className="w-full px-4 py-2.5 border border-navy/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry/20 focus:border-cherry resize-none"
                        placeholder="Short preview shown on collection page..."
                      />
                    </div>
                  </div>
                </div>

                {/* Classification */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-navy/10">
                  <h2 className="font-semibold text-navy mb-5 text-lg">Classification & Settings</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">Collection</label>
                      <input
                        value={collection}
                        onChange={e => setCollection(e.target.value)}
                        className="w-full px-4 py-2.5 border border-navy/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry/20 focus:border-cherry"
                        placeholder="Inside Her Roses"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">Theme</label>
                      <select
                        value={theme}
                        onChange={e => setTheme(e.target.value)}
                        className="w-full px-4 py-2.5 border border-navy/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry/20 focus:border-cherry bg-white capitalize"
                      >
                        <option value="">Select theme</option>
                        {THEMES.map(t => <option key={t} value={t} className="capitalize">{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">Mood</label>
                      <select
                        value={mood}
                        onChange={e => setMood(e.target.value)}
                        className="w-full px-4 py-2.5 border border-navy/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry/20 focus:border-cherry bg-white capitalize"
                      >
                        <option value="">Select mood</option>
                        {MOODS.map(m => <option key={m} value={m} className="capitalize">{m}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">Audio URL</label>
                      <input
                        value={audioUrl}
                        onChange={e => setAudioUrl(e.target.value)}
                        className="w-full px-4 py-2.5 border border-navy/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry/20 focus:border-cherry font-mono text-sm"
                        placeholder="https://..."
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
                      <label htmlFor="published" className="text-sm font-medium text-navy cursor-pointer">Published</label>
                    </div>
                    <div className="flex items-center gap-3 pt-1">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={isFeatured}
                        onChange={e => setIsFeatured(e.target.checked)}
                        className="rounded border-navy/20 text-cherry focus:ring-cherry w-4 h-4"
                      />
                      <label htmlFor="featured" className="text-sm font-medium text-navy cursor-pointer">Featured</label>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pb-12">
                  <Link href="/admin/poetry">
                    <Button type="button" variant="ghost" className="rounded-lg">Cancel</Button>
                  </Link>
                  <Button
                    type="submit"
                    variant="primary"
                    className="rounded-lg px-8"
                    disabled={saving}
                    leftIcon={saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
