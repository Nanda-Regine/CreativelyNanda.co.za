'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, FileText, Package, ShoppingCart, Feather,
  MessageSquare, Star, Trash2, Loader2, AlertCircle, CheckCircle,
  Search, Filter, ExternalLink, StarOff,
} from 'lucide-react';
import { Badge } from '@/components/ui';
import { getAllBlogReviews, deleteBlogReview, toggleReviewFeatured } from '../actions/reviews';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Blog Posts', href: '/admin/blog', icon: FileText },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { label: 'Reviews', href: '/admin/reviews', icon: MessageSquare, active: true },
  { label: 'Poetry', href: '/admin/poetry', icon: Feather },
];

type Review = {
  id: string;
  author_name: string;
  author_email: string | null;
  content: string;
  rating: number | null;
  is_approved: boolean;
  is_featured: boolean;
  created_at: string;
  blog_posts: { title: string; slug: string } | null;
};

export default function ReviewsAdminPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    const { data, error } = await getAllBlogReviews();
    if (error) setError(error);
    else setReviews((data as Review[]) || []);
    setLoading(false);
  }

  function showToast(msg: string, type: 'success' | 'error' = 'success') {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete review from "${name}"?`)) return;
    setDeleting(id);
    const { success, error } = await deleteBlogReview(id);
    if (success) {
      setReviews(prev => prev.filter(r => r.id !== id));
      showToast('Review deleted');
    } else {
      showToast(error || 'Failed to delete', 'error');
    }
    setDeleting(null);
  }

  async function handleToggleFeatured(review: Review) {
    const { success } = await toggleReviewFeatured(review.id, !review.is_featured);
    if (success) {
      setReviews(prev => prev.map(r => r.id === review.id ? { ...r, is_featured: !r.is_featured } : r));
      showToast(review.is_featured ? 'Removed from featured' : 'Marked as featured');
    }
  }

  const filtered = reviews.filter(r => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      r.author_name.toLowerCase().includes(q) ||
      r.content.toLowerCase().includes(q) ||
      r.blog_posts?.title?.toLowerCase().includes(q)
    );
  });

  const stats = {
    total: reviews.length,
    featured: reviews.filter(r => r.is_featured).length,
    withRating: reviews.filter(r => r.rating).length,
    avgRating: reviews.filter(r => r.rating).length
      ? (reviews.reduce((s, r) => s + (r.rating || 0), 0) / reviews.filter(r => r.rating).length).toFixed(1)
      : '—',
  };

  return (
    <div className="min-h-screen bg-parchment">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-sm font-medium ${
              toast.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
            }`}
          >
            {toast.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

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
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-display font-bold text-navy mb-1">Blog Reviews</h1>
              <p className="text-navy/60">All reader insights — you can delete or feature any review</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Reviews', value: stats.total, color: 'bg-blue-100 text-blue-600' },
              { label: 'Featured', value: stats.featured, color: 'bg-amber-100 text-amber-600' },
              { label: 'With Rating', value: stats.withRating, color: 'bg-purple-100 text-purple-600' },
              { label: 'Avg Rating', value: stats.avgRating, color: 'bg-emerald-100 text-emerald-600' },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-xl p-5 shadow-sm border border-navy/10">
                <p className={`text-2xl font-bold ${s.color.split(' ')[1]}`}>{s.value}</p>
                <p className="text-sm text-navy/60">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Search */}
          <div className="bg-white rounded-xl shadow-sm border border-navy/10 p-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-navy/40" />
              <input
                type="text"
                placeholder="Search by author, content or post title..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-navy/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry/20 focus:border-cherry"
              />
            </div>
          </div>

          {loading && (
            <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-navy/10">
              <Loader2 className="w-8 h-8 text-cherry animate-spin mx-auto mb-3" />
              <p className="text-navy/60">Loading reviews...</p>
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-navy/10">
              <MessageSquare className="w-12 h-12 text-navy/20 mx-auto mb-3" />
              <p className="text-navy/60">{search ? 'No reviews match your search' : 'No reviews yet'}</p>
            </div>
          )}

          {!loading && filtered.length > 0 && (
            <div className="space-y-3">
              <AnimatePresence>
                {filtered.map((review, i) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ delay: i * 0.03 }}
                    className="bg-white rounded-xl shadow-sm border border-navy/10 p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        {/* Meta row */}
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="font-semibold text-navy">{review.author_name}</span>
                          {review.author_email && (
                            <span className="text-xs text-navy/40">{review.author_email}</span>
                          )}
                          {review.rating && (
                            <span className="flex items-center gap-0.5">
                              {[...Array(5)].map((_, j) => (
                                <Star key={j} className={`w-3.5 h-3.5 ${j < review.rating! ? 'fill-amber-400 text-amber-400' : 'text-navy/20'}`} />
                              ))}
                            </span>
                          )}
                          {review.is_featured && (
                            <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full font-medium">Featured</span>
                          )}
                        </div>

                        {/* Content */}
                        <p className="text-navy/80 text-sm leading-relaxed mb-3">{review.content}</p>

                        {/* Post link */}
                        <div className="flex items-center gap-3 text-xs text-navy/40">
                          <span>{new Date(review.created_at).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                          {review.blog_posts && (
                            <>
                              <span>·</span>
                              <Link
                                href={`/blog/${review.blog_posts.slug}`}
                                className="flex items-center gap-1 text-cherry hover:underline"
                                target="_blank"
                              >
                                <ExternalLink className="w-3 h-3" />
                                {review.blog_posts.title}
                              </Link>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => handleToggleFeatured(review)}
                          title={review.is_featured ? 'Remove from featured' : 'Mark as featured'}
                          className={`p-2 rounded-lg transition-colors ${
                            review.is_featured
                              ? 'bg-amber-100 text-amber-600 hover:bg-amber-200'
                              : 'text-navy/40 hover:bg-navy/5 hover:text-amber-500'
                          }`}
                        >
                          {review.is_featured ? <Star className="w-4 h-4 fill-current" /> : <Star className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => handleDelete(review.id, review.author_name)}
                          disabled={deleting === review.id}
                          className="p-2 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors disabled:opacity-50"
                          title="Delete review"
                        >
                          {deleting === review.id
                            ? <Loader2 className="w-4 h-4 animate-spin" />
                            : <Trash2 className="w-4 h-4" />
                          }
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
