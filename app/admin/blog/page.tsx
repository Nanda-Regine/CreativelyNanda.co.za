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
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Filter,
  Loader2,
  AlertCircle,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import { getPosts, deletePost, publishPost, unpublishPost } from '../actions/posts';
import type { BlogPost } from '@/types/database';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Blog Posts', href: '/admin/blog', icon: FileText, active: true },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { label: 'Poetry', href: '/admin/poetry', icon: Feather },
  { label: 'Reviews', href: '/admin/reviews', icon: MessageSquare },
];

const categoryColors: Record<string, string> = {
  dev: 'bg-blue-100 text-blue-700',
  writing: 'bg-purple-100 text-purple-700',
  business: 'bg-emerald-100 text-emerald-700',
};

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [deleting, setDeleting] = useState<string | null>(null);
  const [toggling, setToggling] = useState<string | null>(null);

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    setLoading(true);
    const { data, error } = await getPosts();
    if (error) {
      setError(error);
    } else {
      setPosts(data || []);
    }
    setLoading(false);
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    setDeleting(id);
    const { success, error } = await deletePost(id);

    if (success) {
      setPosts(posts.filter(p => p.id !== id));
    } else {
      alert(`Error deleting post: ${error}`);
    }
    setDeleting(null);
  }

  async function handleTogglePublish(id: string, isPublished: boolean) {
    setToggling(id);
    const action = isPublished ? unpublishPost : publishPost;
    const { data, error } = await action(id);

    if (data) {
      setPosts(posts.map(p => p.id === id ? data : p));
    } else {
      alert(`Error updating post: ${error}`);
    }
    setToggling(null);
  }

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || post.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

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
              <h1 className="text-3xl font-display font-bold text-navy mb-2">Blog Posts</h1>
              <p className="text-navy/60">Manage your blog content</p>
            </div>
            <Link href="/admin/blog/new">
              <Button variant="primary" className="rounded-lg" leftIcon={<Plus className="w-4 h-4" />}>
                New Post
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-navy/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-navy">{posts.length}</p>
                  <p className="text-sm text-navy/60">Total Posts</p>
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
                    {posts.filter(p => p.is_published).length}
                  </p>
                  <p className="text-sm text-navy/60">Published</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-navy/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Edit className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-navy">
                    {posts.filter(p => !p.is_published).length}
                  </p>
                  <p className="text-sm text-navy/60">Drafts</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-navy/10 p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-navy/40" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-navy/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry/20 focus:border-cherry"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-navy/40" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-4 py-2.5 border border-navy/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry/20 focus:border-cherry bg-white"
                >
                  <option value="all">All Categories</option>
                  <option value="dev">Development</option>
                  <option value="writing">Writing</option>
                  <option value="business">Business</option>
                </select>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="bg-white rounded-xl shadow-sm border border-navy/10 p-12 text-center">
              <Loader2 className="w-8 h-8 text-cherry animate-spin mx-auto mb-4" />
              <p className="text-navy/60">Loading posts...</p>
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
          {!loading && !error && posts.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-navy/10 text-center py-12">
              <FileText className="w-12 h-12 text-navy/30 mx-auto mb-4" />
              <p className="text-navy/60 mb-4">No blog posts yet</p>
              <Link href="/admin/blog/new">
                <Button variant="primary" className="rounded-lg">
                  Write Your First Post
                </Button>
              </Link>
            </div>
          )}

          {/* Posts Table */}
          {!loading && filteredPosts.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-navy/10 overflow-hidden">
              <table className="w-full">
                <thead className="bg-parchment border-b border-navy/10">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-medium text-navy/60">Title</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-navy/60">Category</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-navy/60">Status</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-navy/60">Date</th>
                    <th className="text-right px-6 py-4 text-sm font-medium text-navy/60">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredPosts.map((post) => (
                    <motion.tr
                      key={post.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-parchment"
                    >
                      <td className="px-6 py-4">
                        <p className="font-medium text-navy">{post.title}</p>
                        <p className="text-sm text-navy/60 truncate max-w-xs">{post.excerpt}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs px-2 py-1 rounded-full capitalize ${categoryColors[post.category] || 'bg-gray-100 text-gray-700'}`}>
                          {post.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleTogglePublish(post.id, post.is_published)}
                          disabled={toggling === post.id}
                          className={`text-xs px-2 py-1 rounded-full cursor-pointer transition-colors ${
                            post.is_published
                              ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                              : 'bg-navy/5 text-navy/70 hover:bg-navy/10'
                          }`}
                        >
                          {toggling === post.id ? (
                            <Loader2 className="w-3 h-3 animate-spin inline" />
                          ) : post.is_published ? (
                            'published'
                          ) : (
                            'draft'
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-navy/60 text-sm">
                        {post.published_at
                          ? new Date(post.published_at).toLocaleDateString()
                          : 'Not published'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/blog/${post.category}/${post.slug}`}
                            className="p-2 hover:bg-navy/5 rounded-lg transition-colors"
                            title="View"
                          >
                            <Eye className="w-4 h-4 text-navy/60" />
                          </Link>
                          <Link
                            href={`/admin/blog/${post.id}/edit`}
                            className="p-2 hover:bg-navy/5 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4 text-navy/60" />
                          </Link>
                          <button
                            onClick={() => handleDelete(post.id, post.title)}
                            disabled={deleting === post.id}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                            title="Delete"
                          >
                            {deleting === post.id ? (
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

          {!loading && posts.length > 0 && filteredPosts.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-navy/10 text-center py-12">
              <Search className="w-12 h-12 text-navy/30 mx-auto mb-4" />
              <p className="text-navy/60">No posts match your search</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
