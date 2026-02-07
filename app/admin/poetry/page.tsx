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
  Search,
  Edit,
  Trash2,
  Heart,
  Filter,
  Eye,
  Plus,
} from 'lucide-react';
import { Button, Badge } from '@/components/ui';

// Import poems data
const SAMPLE_POEMS = [
  { id: '1', title: 'Love Letters', category: 'Romance', likes: 234, views: 1456 },
  { id: '2', title: 'Inside Her Roses', category: 'Sensual', likes: 189, views: 1234 },
  { id: '3', title: 'Black Girl Magic', category: 'Empowering', likes: 312, views: 2345 },
  { id: '4', title: 'Healing Waters', category: 'Life', likes: 156, views: 987 },
  { id: '5', title: 'Mother Tongue', category: 'Personal', likes: 278, views: 1567 },
  { id: '6', title: 'Midnight Confessions', category: 'Depth', likes: 145, views: 876 },
  { id: '7', title: 'Ubuntu', category: 'Life', likes: 198, views: 1123 },
  { id: '8', title: 'Warrior Queen', category: 'Empowering', likes: 267, views: 1890 },
];

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Blog Posts', href: '/admin/blog', icon: FileText },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { label: 'Poetry', href: '/admin/poetry', icon: Feather, active: true },
];

const categoryColors: Record<string, string> = {
  Romance: 'bg-pink-100 text-pink-700',
  Sensual: 'bg-red-100 text-red-700',
  Life: 'bg-blue-100 text-blue-700',
  Personal: 'bg-purple-100 text-purple-700',
  Depth: 'bg-indigo-100 text-indigo-700',
  Empowering: 'bg-amber-100 text-amber-700',
};

export default function AdminPoetryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const filteredPoems = SAMPLE_POEMS.filter((poem) => {
    const matchesSearch = poem.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || poem.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const totalLikes = SAMPLE_POEMS.reduce((sum, p) => sum + p.likes, 0);
  const totalViews = SAMPLE_POEMS.reduce((sum, p) => sum + p.views, 0);

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
                  <p className="text-2xl font-bold text-navy">{SAMPLE_POEMS.length}</p>
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
                  <p className="text-2xl font-bold text-navy">{totalLikes.toLocaleString()}</p>
                  <p className="text-sm text-navy/60">Total Likes</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-navy/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-navy">{totalViews.toLocaleString()}</p>
                  <p className="text-sm text-navy/60">Total Views</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-navy/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Filter className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-navy">6</p>
                  <p className="text-sm text-navy/60">Categories</p>
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
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-4 py-2.5 border border-navy/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry/20 focus:border-cherry bg-white"
                >
                  <option value="all">All Categories</option>
                  <option value="Romance">Romance</option>
                  <option value="Sensual">Sensual</option>
                  <option value="Life">Life</option>
                  <option value="Personal">Personal</option>
                  <option value="Depth">Depth</option>
                  <option value="Empowering">Empowering</option>
                </select>
              </div>
            </div>
          </div>

          {/* Poems Table */}
          <div className="bg-white rounded-xl shadow-sm border border-navy/10 overflow-hidden">
            <table className="w-full">
              <thead className="bg-parchment border-b border-navy/10">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-medium text-navy/60">Title</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-navy/60">Category</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-navy/60">Likes</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-navy/60">Views</th>
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
                      <p className="font-medium text-navy">{poem.title}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${categoryColors[poem.category]}`}>
                        {poem.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1 text-navy/70">
                        <Heart className="w-4 h-4 text-pink-500" />
                        {poem.likes.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1 text-navy/70">
                        <Eye className="w-4 h-4" />
                        {poem.views.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/poetry/collection/${poem.title.toLowerCase().replace(/\s+/g, '-')}`}
                          className="p-2 hover:bg-navy/5 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4 text-navy/60" />
                        </Link>
                        <button className="p-2 hover:bg-navy/5 rounded-lg transition-colors">
                          <Edit className="w-4 h-4 text-navy/60" />
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

            {filteredPoems.length === 0 && (
              <div className="text-center py-12">
                <Feather className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-navy/60">No poems found</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
