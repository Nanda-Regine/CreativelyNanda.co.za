'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
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
  Star,
  Filter,
  DollarSign,
} from 'lucide-react';
import { Button, Badge } from '@/components/ui';

// Mock products - will come from Supabase in production
const PRODUCTS = [
  {
    id: '1',
    name: 'NSFAS Tracker',
    price: 149,
    category: 'Student',
    status: 'live',
    sales: 127,
    rating: 4.9,
    thumbnail: '/assets/professional/nanda-consulting.jpg',
  },
  {
    id: '2',
    name: 'Freelancer Hub',
    price: 349,
    category: 'Business',
    status: 'live',
    sales: 89,
    rating: 4.7,
    thumbnail: '/assets/professional/nanda-consulting.jpg',
  },
  {
    id: '3',
    name: 'SME Hub',
    price: 499,
    category: 'Business',
    status: 'live',
    sales: 56,
    rating: 4.9,
    thumbnail: '/assets/professional/nanda-consulting.jpg',
  },
  {
    id: '4',
    name: 'Inside Her Roses (eBook)',
    price: 99,
    category: 'Creative',
    status: 'live',
    sales: 234,
    rating: 5.0,
    thumbnail: '/assets/poetry-book/book-cover-1.jpg',
  },
  {
    id: '5',
    name: 'Poetry Companion',
    price: 199,
    category: 'Creative',
    status: 'draft',
    sales: 0,
    rating: null,
    thumbnail: '/assets/professional/nanda-consulting.jpg',
  },
];

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Blog Posts', href: '/admin/blog', icon: FileText },
  { label: 'Products', href: '/admin/products', icon: Package, active: true },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { label: 'Poetry', href: '/admin/poetry', icon: Feather },
];

const categoryColors: Record<string, string> = {
  Student: 'bg-blue-100 text-blue-700',
  Business: 'bg-emerald-100 text-emerald-700',
  Creative: 'bg-purple-100 text-purple-700',
};

export default function AdminProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const totalRevenue = PRODUCTS.reduce((sum, p) => sum + p.price * p.sales, 0);

  return (
    <div className="min-h-screen bg-beige/30">
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
        <aside className="w-64 bg-cream border-r border-navy/10 min-h-[calc(100vh-64px)] p-4">
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
              <h1 className="text-3xl font-display font-bold text-navy mb-2">Products</h1>
              <p className="text-navy/60">Manage your digital products</p>
            </div>
            <Link href="/admin/products/new">
              <Button variant="primary" className="rounded-lg" leftIcon={<Plus className="w-4 h-4" />}>
                Add Product
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-cream rounded-xl p-6 shadow-sm border border-navy/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-navy">R {totalRevenue.toLocaleString()}</p>
                  <p className="text-sm text-navy/60">Total Revenue</p>
                </div>
              </div>
            </div>
            <div className="bg-cream rounded-xl p-6 shadow-sm border border-navy/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-navy">{PRODUCTS.length}</p>
                  <p className="text-sm text-navy/60">Total Products</p>
                </div>
              </div>
            </div>
            <div className="bg-cream rounded-xl p-6 shadow-sm border border-navy/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-navy">
                    {PRODUCTS.reduce((sum, p) => sum + p.sales, 0)}
                  </p>
                  <p className="text-sm text-navy/60">Total Sales</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-cream rounded-xl shadow-sm border border-navy/10 p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-navy/40" />
                <input
                  type="text"
                  placeholder="Search products..."
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
                  <option value="Student">Student</option>
                  <option value="Business">Business</option>
                  <option value="Creative">Creative</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-cream rounded-xl shadow-sm border border-navy/10 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative h-40 bg-navy/5">
                  <Image
                    src={product.thumbnail}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        product.status === 'live'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-navy/5 text-navy/70'
                      }`}
                    >
                      {product.status}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-navy">{product.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${categoryColors[product.category]}`}>
                      {product.category}
                    </span>
                  </div>
                  <p className="text-xl font-bold text-cherry mb-3">R {product.price}</p>
                  <div className="flex items-center justify-between text-sm text-navy/60">
                    <span>{product.sales} sales</span>
                    {product.rating && (
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        {product.rating}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2 mt-4 pt-4 border-t border-navy/10">
                    <button className="flex-1 py-2 text-sm font-medium text-navy/70 hover:bg-navy/5 rounded-lg transition-colors flex items-center justify-center gap-1">
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button className="flex-1 py-2 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center gap-1">
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="bg-cream rounded-xl shadow-sm border border-navy/10 text-center py-12">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-navy/60">No products found</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
