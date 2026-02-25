'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  LayoutDashboard,
  FileText,
  Package,
  ShoppingCart,
  Feather,
  MessageSquare,
  Search,
  Edit,
  Trash2,
  Heart,
  Filter,
  Eye,
  Plus,
  Loader2,
  AlertCircle,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import { getPoems, deletePoem, updatePoem } from '../actions/poems';
import type { Poem } from '@/types/database';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Blog Posts', href: '/admin/blog', icon: FileText },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { label: 'Poetry', href: '/admin/poetry', icon: Feather, active: true },
  { label: 'Reviews', href: '/admin/reviews', icon: MessageSquare },
];

const themeColors: Record<string, string> = {
  love: 'bg-pink-100 text-pink-700',
  sensual: 'bg-red-100 text-red-700',
  life: 'bg-blue-100 text-blue-700',
  personal: 'bg-purple-100 text-purple-700',
  healing: 'bg-teal-100 text-teal-700',
  empowerment: 'bg-amber-100 text-amber-700',
  nature: 'bg-green-100 text-green-700',
  spirituality: 'bg-indigo-100 text-indigo-700',
};

export default function AdminPoetryPage() {
  const [poems, setPoems] = useState<Poem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTheme, setFilterTheme] = useState('all');
  const [deleting, setDeleting] = useState<string | null>(null);
  const [toggling, setToggling] = useState<string | null>(null);

  useEffect(() => {
    loadPoems();
  }, []);

  async function loadPoems() {
    setLoading(true);
    const { data, error } = await getPoems();
    if (error) {
      setError(error);
    } else {
      setPoems(data || []);
    }
    setLoading(false);
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    setDeleting(id);
    const { success, error } = await deletePoem(id);

    if (success) {
      setPoems(poems.filter(p => p.id !== id));
    } else {
      alert(`Error deleting poem: ${error}`);
    }
    setDeleting(null);
  }

  async function handleTogglePublish(id: string, isPublished: boolean) {
    setToggling(id);
    const { data, error } = await updatePoem(id, { is_published: !isPublished });

    if (data) {
      setPoems(poems.map(p => p.id === id ? data : p));
    } else {
      alert(`Error updating poem: ${error}`);
    }
    setToggling(null);
  }

  async function handleToggleFeatured(id: string, isFeatured: boolean) {
    const { data, error } = await updatePoem(id, { is_featured: !isFeatured });

    if (data) {
      setPoems(poems.map(p => p.id === id ? data : p));
    } else {
      alert(`Error updating poem: ${error}`);
    }
  }

  const filteredPoems = poems.filter((poem) => {
    const matchesSearch = poem.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTheme = filterTheme === 'all' || poem.theme === filterTheme;
    return matchesSearch && matchesTheme;
  });

  const totalHearts = poems.reduce((sum, p) => sum + (p.heart_count || 0), 0);
  const uniqueThemes = Array.from(new Set(poems.map(p => p.theme).filter(Boolean)));

  return (
    <div className="min-h-screen bg-parchment">
      {/* Top Bar */}
      <header className="bg-navy text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-display text-2xl font-bold text-beige">
            Nanda
          </Link>
          <Badge variant="secondary" size="sm" className="bg-cherry/20 text-cherry-light">
            Admin
          </Badge>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-beige/70 hover:text-beige text-sm">
            View Site
          </Link>
          <div className="w-10 h-10 rounded-full bg-cherry flex items-center justify-center text-white font-medium">
            N
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-navy/10 min-h-[calc(100vh-64px)] p-4">
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    item.active
                      ? 'bg-cherry/10 text-cherry font-medium'
                      : 'text-navy/70 hover:bg-navy/5'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-display font-bold text-navy mb-2">Poetry Collection</h1>
              <p className="text-navy/60">Manage your poetry from "Inside Her Roses"</p>
            </div>
            <Link href="/admin/poetry/new">
              <Button variant="primary" className="rounded-lg" leftIcon={<Plus className="w-4 h-4" />}>
                Add Poem
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-navy/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Feather className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-navy">{poems.length}</p>
                  <p className="text-sm text-navy/60">Total Poems</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-navy/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-pink-100 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-navy">{totalHearts.toLocaleString()}</p>
                  <p className="text-sm text-navy/60">Total Hearts</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-navy/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-navy">
                    {poems.filter(p => p.is_published).length}
                  </p>
                  <p className="text-sm text-navy/60">Published</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-navy/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Filter className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-navy">{uniqueThemes.length}</p>
                  <p className="text-sm text-navy/60">Themes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-navy/10 p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-navy/40" />
                <input
                  type="text"
                  placeholder="Search poems..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-navy/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry/20 focus:border-cherry"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-navy/40" />
                <select
                  value={filterTheme}
                  onChange={(e) => setFilterTheme(e.target.value)}
                  className="px-4 py-2.5 border border-navy/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry/20 focus:border-cherry bg-white"
                >
                  <option value="all">All Themes</option>
                  {uniqueThemes.map(theme => (
                    <option key={theme} value={theme}>{theme}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="bg-white rounded-xl shadow-sm border border-navy/10 p-12 text-center">
              <Loader2 className="w-8 h-8 text-cherry animate-spin mx-auto mb-4" />
              <p className="text-navy/60">Loading poems...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 rounded-xl p-6 border border-red-200 mb-6">
              <div className="flex items-center gap-3 text-red-700">
                <AlertCircle className="w-5 h-5" />
                <p>{error}</p>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && poems.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-navy/10 text-center py-12">
              <Feather className="w-12 h-12 text-navy/30 mx-auto mb-4" />
              <p className="text-navy/60 mb-4">No poems yet</p>
              <Link href="/admin/poetry/new">
                <Button variant="primary" className="rounded-lg">
                  Add Your First Poem
                </Button>
              </Link>
            </div>
          )}

          {/* Poems Table */}
          {!loading && filteredPoems.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-navy/10 overflow-hidden">
              <table className="w-full">
                <thead className="bg-parchment border-b border-navy/10">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-medium text-navy/60">Title</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-navy/60">Theme</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-navy/60">Collection</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-navy/60">Hearts</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-navy/60">Status</th>
                    <th className="text-right px-6 py-4 text-sm font-medium text-navy/60">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredPoems.map((poem) => (
                    <motion.tr
                      key={poem.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-parchment"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-navy">{poem.title}</p>
                          {poem.is_featured && (
                            <span className="text-xs bg-cherry/10 text-cherry px-1.5 py-0.5 rounded">
                              Featured
                            </span>
                          )}
                        </div>
                        {poem.excerpt && (
                          <p className="text-sm text-navy/60 truncate max-w-xs">{poem.excerpt}</p>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {poem.theme && (
                          <span className={`text-xs px-2 py-1 rounded-full capitalize ${themeColors[poem.theme.toLowerCase()] || 'bg-gray-100 text-gray-700'}`}>
                            {poem.theme}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-navy/70 text-sm">
                        {poem.collection || 'Uncategorized'}
                      </td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-1 text-navy/70">
                          <Heart className="w-4 h-4 text-pink-500" />
                          {(poem.heart_count || 0).toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleTogglePublish(poem.id, poem.is_published)}
                          disabled={toggling === poem.id}
                          className={`text-xs px-2 py-1 rounded-full cursor-pointer transition-colors ${
                            poem.is_published
                              ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                              : 'bg-navy/5 text-navy/70 hover:bg-navy/10'
                          }`}
                        >
                          {toggling === poem.id ? (
                            <Loader2 className="w-3 h-3 animate-spin inline" />
                          ) : poem.is_published ? (
                            'published'
                          ) : (
                            'draft'
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/poetry/collection/${poem.slug}`}
                            className="p-2 hover:bg-navy/5 rounded-lg transition-colors"
                            title="View"
                          >
                            <Eye className="w-4 h-4 text-navy/60" />
                          </Link>
                          <Link
                            href={`/admin/poetry/${poem.id}/edit`}
                            className="p-2 hover:bg-navy/5 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4 text-navy/60" />
                          </Link>
                          <button
                            onClick={() => handleDelete(poem.id, poem.title)}
                            disabled={deleting === poem.id}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                            title="Delete"
                          >
                            {deleting === poem.id ? (
                              <Loader2 className="w-4 h-4 animate-spin text-red-500" />
                            ) : (
                              <Trash2 className="w-4 h-4 text-red-500" />
                            )}
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!loading && poems.length > 0 && filteredPoems.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-navy/10 text-center py-12">
              <Search className="w-12 h-12 text-navy/30 mx-auto mb-4" />
              <p className="text-navy/60">No poems match your search</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
