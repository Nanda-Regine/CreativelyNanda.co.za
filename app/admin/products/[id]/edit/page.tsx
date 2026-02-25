'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  FileText,
  Package,
  ShoppingCart,
  Feather,
  MessageSquare,
  ArrowLeft,
  Save,
  Loader2,
  AlertCircle,
  CheckCircle,
  Plus,
  Trash2,
} from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { getProduct, updateProduct } from '../../../actions/products';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Blog Posts', href: '/admin/blog', icon: FileText },
  { label: 'Products', href: '/admin/products', icon: Package, active: true },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { label: 'Poetry', href: '/admin/poetry', icon: Feather },
  { label: 'Reviews', href: '/admin/reviews', icon: MessageSquare },
];

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface FAQ {
  question: string;
  answer: string;
}

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Core fields
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [category, setCategory] = useState<'student' | 'business' | 'creative' | 'wellness'>('student');
  const [type, setType] = useState<'template' | 'saas' | 'ebook' | 'service'>('template');
  const [status, setStatus] = useState<'draft' | 'live' | 'coming-soon' | 'archived'>('draft');
  const [badge, setBadge] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);

  // Media & delivery
  const [thumbnail, setThumbnail] = useState('');
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [notionUrl, setNotionUrl] = useState('');
  const [guideUrl, setGuideUrl] = useState('');

  // Features & FAQs
  const [features, setFeatures] = useState<Feature[]>([{ title: '', description: '', icon: '' }]);
  const [faqs, setFaqs] = useState<FAQ[]>([{ question: '', answer: '' }]);

  useEffect(() => {
    async function load() {
      const { data, error } = await getProduct(id);
      if (error || !data) {
        setError(error || 'Product not found');
        setLoading(false);
        return;
      }
      setName(data.name);
      setSlug(data.slug);
      setTagline(data.tagline || '');
      setDescription(data.description || '');
      // Price stored in cents - show in rands
      setPrice(data.price ? (data.price / 100).toFixed(0) : '');
      setOriginalPrice(data.original_price ? (data.original_price / 100).toFixed(0) : '');
      setCategory(data.category);
      setType(data.type || 'template');
      setStatus(data.status || 'draft');
      setBadge(data.badge || '');
      setIsFeatured(data.is_featured || false);
      setThumbnail(data.thumbnail || '');
      setGalleryImages(data.images || []);
      setNotionUrl(data.file_path || '');
      setGuideUrl(data.guide_url || '');
      if (Array.isArray(data.features) && data.features.length > 0) {
        setFeatures(data.features as Feature[]);
      }
      if (Array.isArray(data.faqs) && data.faqs.length > 0) {
        setFaqs(data.faqs as FAQ[]);
      }
      setLoading(false);
    }
    load();
  }, [id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const updates = {
      name,
      slug,
      tagline,
      description,
      price: Math.round(parseFloat(price || '0') * 100),
      original_price: originalPrice ? Math.round(parseFloat(originalPrice) * 100) : null,
      category,
      type,
      status,
      badge: badge || null,
      is_featured: isFeatured,
      thumbnail: thumbnail || null,
      images: galleryImages,
      file_path: notionUrl || null,
      guide_url: guideUrl || null,
      features: features.filter(f => f.title),
      faqs: faqs.filter(f => f.question && f.answer),
    };

    const { error } = await updateProduct(id, updates);
    if (error) {
      setError(error);
    } else {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
    setSaving(false);
  };

  const addFeature = () => setFeatures([...features, { title: '', description: '', icon: '' }]);
  const removeFeature = (i: number) => setFeatures(features.filter((_, idx) => idx !== i));
  const updateFeature = (i: number, field: keyof Feature, value: string) => {
    const updated = [...features];
    updated[i] = { ...updated[i], [field]: value };
    setFeatures(updated);
  };

  const addFaq = () => setFaqs([...faqs, { question: '', answer: '' }]);
  const removeFaq = (i: number) => setFaqs(faqs.filter((_, idx) => idx !== i));
  const updateFaq = (i: number, field: keyof FAQ, value: string) => {
    const updated = [...faqs];
    updated[i] = { ...updated[i], [field]: value };
    setFaqs(updated);
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
              <Link href="/admin/products">
                <button className="p-2 rounded-lg hover:bg-navy/5 text-navy/60 transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </Link>
              <div>
                <h1 className="text-3xl font-display font-bold text-navy">Edit Product</h1>
                <p className="text-navy/60">Update product details, images, and delivery</p>
              </div>
            </div>

            {loading && (
              <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-navy/10">
                <Loader2 className="w-8 h-8 text-cherry animate-spin mx-auto mb-4" />
                <p className="text-navy/60">Loading product...</p>
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
                <p>Product saved successfully!</p>
              </div>
            )}

            {!loading && (
              <form onSubmit={handleSave} className="space-y-6">
                {/* Core Info */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-navy/10">
                  <h2 className="font-semibold text-navy mb-5 text-lg">Core Information</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-navy mb-1.5">Product Name *</label>
                      <input value={name} onChange={e => setName(e.target.value)} required
                        className="w-full px-4 py-2.5 border border-navy/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry/20 focus:border-cherry" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">Slug *</label>
                      <input value={slug} onChange={e => setSlug(e.target.value)} required
                        className="w-full px-4 py-2.5 border border-navy/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry/20 focus:border-cherry font-mono text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">Status *</label>
                      <select value={status} onChange={e => setStatus(e.target.value as typeof status)}
                        className="w-full px-4 py-2.5 border border-navy/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry/20 focus:border-cherry bg-white">
                        <option value="draft">Draft</option>
                        <option value="live">Live</option>
                        <option value="coming-soon">Coming Soon</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-navy mb-1.5">Tagline</label>
                      <input value={tagline} onChange={e => setTagline(e.target.value)}
                        className="w-full px-4 py-2.5 border border-navy/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry/20 focus:border-cherry"
                        placeholder="Short compelling description" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-navy mb-1.5">Full Description</label>
                      <textarea value={description} onChange={e => setDescription(e.target.value)} rows={5}
                        className="w-full px-4 py-2.5 border border-navy/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry/20 focus:border-cherry resize-none"
                        placeholder="Detailed description shown on the product page..." />
                    </div>
                  </div>
                </div>

                {/* Pricing & Category */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-navy/10">
                  <h2 className="font-semibold text-navy mb-5 text-lg">Pricing & Category</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">Price (R) *</label>
                      <input type="number" value={price} onChange={e => setPrice(e.target.value)} required min="0" step="1"
                        className="w-full px-4 py-2.5 border border-navy/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry/20 focus:border-cherry"
                        placeholder="149" />
                      <p className="text-xs text-navy/40 mt-1">Enter in Rands, e.g. 149 for R149</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">Original Price (R)</label>
                      <input type="number" value={originalPrice} onChange={e => setOriginalPrice(e.target.value)} min="0" step="1"
                        className="w-full px-4 py-2.5 border border-navy/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry/20 focus:border-cherry"
                        placeholder="199 (for strikethrough price)" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">Category *</label>
                      <select value={category} onChange={e => setCategory(e.target.value as typeof category)}
                        className="w-full px-4 py-2.5 border border-navy/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry/20 focus:border-cherry bg-white">
                        <option value="student">Student</option>
                        <option value="business">Business</option>
                        <option value="creative">Creative</option>
                        <option value="wellness">Wellness</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">Type *</label>
                      <select value={type} onChange={e => setType(e.target.value as typeof type)}
                        className="w-full px-4 py-2.5 border border-navy/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry/20 focus:border-cherry bg-white">
                        <option value="template">Notion Template</option>
                        <option value="ebook">E-Book</option>
                        <option value="saas">SaaS Tool</option>
                        <option value="service">Service</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">Badge</label>
                      <select value={badge} onChange={e => setBadge(e.target.value)}
                        className="w-full px-4 py-2.5 border border-navy/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry/20 focus:border-cherry bg-white">
                        <option value="">None</option>
                        <option value="NEW">NEW</option>
                        <option value="BESTSELLER">BESTSELLER</option>
                        <option value="POPULAR">POPULAR</option>
                        <option value="LAUNCHING">LAUNCHING</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-3 pt-6">
                      <input type="checkbox" id="featured" checked={isFeatured} onChange={e => setIsFeatured(e.target.checked)}
                        className="rounded border-navy/20 text-cherry focus:ring-cherry w-4 h-4" />
                      <label htmlFor="featured" className="text-sm font-medium text-navy cursor-pointer">Featured product</label>
                    </div>
                  </div>
                </div>

                {/* Media & Delivery */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-navy/10">
                  <h2 className="font-semibold text-navy mb-5 text-lg">Media & Delivery</h2>
                  <div className="space-y-4">
                    <ImageUploader
                      images={thumbnail ? [thumbnail] : []}
                      onChange={(imgs) => setThumbnail(imgs[0] || '')}
                      folder="products/covers"
                      maxImages={1}
                      label="Cover Photo"
                    />
                    <ImageUploader
                      images={galleryImages}
                      onChange={setGalleryImages}
                      folder="products"
                      maxImages={12}
                      label="Gallery Screenshots"
                    />
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">Notion Template URL / Download Link</label>
                      <input value={notionUrl} onChange={e => setNotionUrl(e.target.value)}
                        className="w-full px-4 py-2.5 border border-navy/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry/20 focus:border-cherry font-mono text-sm"
                        placeholder="https://www.notion.so/templates/..." />
                      <p className="text-xs text-navy/40 mt-1">Customers receive this URL after purchase via email</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">Quick Start Guide URL</label>
                      <input value={guideUrl} onChange={e => setGuideUrl(e.target.value)}
                        className="w-full px-4 py-2.5 border border-navy/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry/20 focus:border-cherry font-mono text-sm"
                        placeholder="https://..." />
                      <p className="text-xs text-navy/40 mt-1">Optional PDF guide included in the confirmation email</p>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-navy/10">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="font-semibold text-navy text-lg">Features (What&apos;s Included)</h2>
                    <button type="button" onClick={addFeature}
                      className="flex items-center gap-1.5 text-sm text-cherry hover:bg-cherry/10 px-3 py-1.5 rounded-lg transition-colors">
                      <Plus className="w-4 h-4" />Add Feature
                    </button>
                  </div>
                  <div className="space-y-4">
                    {features.map((feat, i) => (
                      <div key={i} className="p-4 bg-parchment/50 rounded-xl border border-navy/5">
                        <div className="flex items-start gap-3">
                          <div className="flex-1 grid grid-cols-2 gap-3">
                            <input value={feat.title} onChange={e => updateFeature(i, 'title', e.target.value)}
                              className="col-span-2 px-3 py-2 border border-navy/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry/20 focus:border-cherry text-sm"
                              placeholder="Feature title" />
                            <textarea value={feat.description} onChange={e => updateFeature(i, 'description', e.target.value)} rows={2}
                              className="col-span-2 px-3 py-2 border border-navy/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry/20 focus:border-cherry text-sm resize-none"
                              placeholder="Brief description of this feature..." />
                          </div>
                          <button type="button" onClick={() => removeFeature(i)}
                            className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* FAQs */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-navy/10">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="font-semibold text-navy text-lg">FAQs</h2>
                    <button type="button" onClick={addFaq}
                      className="flex items-center gap-1.5 text-sm text-cherry hover:bg-cherry/10 px-3 py-1.5 rounded-lg transition-colors">
                      <Plus className="w-4 h-4" />Add FAQ
                    </button>
                  </div>
                  <div className="space-y-4">
                    {faqs.map((faq, i) => (
                      <div key={i} className="p-4 bg-parchment/50 rounded-xl border border-navy/5">
                        <div className="flex items-start gap-3">
                          <div className="flex-1 space-y-3">
                            <input value={faq.question} onChange={e => updateFaq(i, 'question', e.target.value)}
                              className="w-full px-3 py-2 border border-navy/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry/20 focus:border-cherry text-sm"
                              placeholder="Question..." />
                            <textarea value={faq.answer} onChange={e => updateFaq(i, 'answer', e.target.value)} rows={2}
                              className="w-full px-3 py-2 border border-navy/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry/20 focus:border-cherry text-sm resize-none"
                              placeholder="Answer..." />
                          </div>
                          <button type="button" onClick={() => removeFaq(i)}
                            className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Save button */}
                <div className="flex items-center justify-between pb-12">
                  <Link href="/admin/products">
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
