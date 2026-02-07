'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  LayoutDashboard,
  FileText,
  Package,
  ShoppingCart,
  Feather,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  Filter,
} from 'lucide-react';
import { Button, Badge } from '@/components/ui';

// Mock blog posts - will come from Supabase in production
const BLOG_POSTS = [
  {
    id: '1',
    title: 'Next.js 14 App Router: A Practical Guide',
    excerpt: 'Everything you need to know about the App Router...',
    category: 'dev',
    status: 'published',
    publishedAt: '2024-01-28',
    views: 1247,
  },
  {
    id: '2',
    title: 'Poetry as Therapy: Writing Through Pain',
    excerpt: 'How writing poetry helped me process grief...',
    category: 'writing',
    status: 'published',
    publishedAt: '2024-01-20',
    views: 892,
  },
  {
    id: '3',
    title: 'Building Notion Templates That Actually Sell',
    excerpt: 'A deep dive into creating Notion templates...',
    category: 'business',
    status: 'draft',
    publishedAt: null,
    views: 0,
  },
  {
    id: '4',
    title: 'TypeScript for JavaScript Developers',
    excerpt: 'A gentle introduction to TypeScript...',
    category: 'dev',
    status: 'published',
    publishedAt: '2024-01-10',
    views: 654,
  },
  {
    id: '5',
    title: 'The Journey of "Inside Her Roses"',
    excerpt: 'From late-night scribbles to a published book...',
    category: 'writing',
    status: 'published',
    publishedAt: '2024-01-05',
    views: 423,
  },
];

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Blog Posts', href: '/admin/blog', icon: FileText, active: true },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { label: 'Poetry', href: '/admin/poetry', icon: Feather },
];

const categoryColors: Record<string, string> = {
  dev: 'bg-blue-100 text-blue-700',
  writing: 'bg-purple-100 text-purple-700',
  business: 'bg-emerald-100 text-emerald-700',
};

export default function AdminBlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || post.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
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
        <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-64px)] p-4">
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
                      : 'text-gray-600 hover:bg-gray-100'
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
              <p className="text-gray-500">Manage your blog content</p>
            </div>
            <Link href="/admin/blog/new">
              <Button variant="primary" className="rounded-lg" leftIcon={<Plus className="w-4 h-4" />}>
                New Post
              </Button>
            </Link>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry/20 focus:border-cherry"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry/20 focus:border-cherry bg-white"
                >
                  <option value="all">All Categories</option>
                  <option value="dev">Development</option>
                  <option value="writing">Writing</option>
                  <option value="business">Business</option>
                </select>
              </div>
            </div>
          </div>

          {/* Posts Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Title</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Category</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Views</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Date</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredPosts.map((post) => (
                  <motion.tr
                    key={post.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <p className="font-medium text-navy">{post.title}</p>
                      <p className="text-sm text-gray-500 truncate max-w-xs">{post.excerpt}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full capitalize ${categoryColors[post.category]}`}>
                        {post.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          post.status === 'published'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-600 flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {post.views.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm">
                      {post.publishedAt || 'Not published'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Edit className="w-4 h-4 text-gray-500" />
                        </button>
                        <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No posts found</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
