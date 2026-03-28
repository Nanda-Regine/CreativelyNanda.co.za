'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
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
  Star,
  Filter,
  DollarSign,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import { getProducts, deleteProduct } from '../actions/products';
import type { Product } from '@/types/database';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Blog Posts', href: '/admin/blog', icon: FileText },
  { label: 'Products', href: '/admin/products', icon: Package, active: true },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { label: 'Poetry', href: '/admin/poetry', icon: Feather },
  { label: 'Reviews', href: '/admin/reviews', icon: MessageSquare },
];

const categoryColors: Record<string, string> = {
  student: 'bg-blue-100 text-blue-700',
  business: 'bg-emerald-100 text-emerald-700',
  creative: 'bg-purple-100 text-purple-700',
  wellness: 'bg-pink-100 text-pink-700',
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);
    const { data, error } = await getProducts();
    if (error) {
      setError(error);
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    setDeleting(id);
    const { success, error } = await deleteProduct(id);

    if (success) {
      setProducts(products.filter(p => p.id !== id));
    } else {
      alert(`Error deleting product: ${error}`);
    }
    setDeleting(null);
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const totalRevenue = products.reduce((sum, p) => sum + (p.price || 0), 0);

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
            <div className="bg-white rounded-xl p-6 shadow-sm border border-navy/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-navy">R {totalRevenue.toLocaleString()}</p>
                  <p className="text-sm text-navy/60">Total Value</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-navy/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-navy">{products.length}</p>
                  <p className="text-sm text-navy/60">Total Products</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-navy/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-navy">
                    {products.filter(p => p.status === 'live').length}
                  </p>
                  <p className="text-sm text-navy/60">Live Products</p>
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
                  <option value="student">Student</option>
                  <option value="business">Business</option>
                  <option value="creative">Creative</option>
                  <option value="wellness">Wellness</option>
                </select>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="bg-white rounded-xl shadow-sm border border-navy/10 p-12 text-center">
              <Loader2 className="w-8 h-8 text-cherry animate-spin mx-auto mb-4" />
              <p className="text-navy/60">Loading products...</p>
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
          {!loading && !error && products.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-navy/10 text-center py-12">
              <Package className="w-12 h-12 text-navy/30 mx-auto mb-4" />
              <p className="text-navy/60 mb-4">No products yet</p>
              <Link href="/admin/products/new">
                <Button variant="primary" className="rounded-lg">
                  Add Your First Product
                </Button>
              </Link>
            </div>
          )}

          {/* Products Grid */}
          {!loading && filteredProducts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-xl shadow-sm border border-navy/10 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative h-40 bg-navy/5">
                    {product.thumbnail ? (
                      <Image
                        src={product.thumbnail}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-12 h-12 text-navy/20" />
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          product.status === 'live'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-navy/10 text-navy/70'
                        }`}
                      >
                        {product.status}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-navy">{product.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${categoryColors[product.category] || 'bg-navy/10 text-navy/70'}`}>
                        {product.category}
                      </span>
                    </div>
                    <p className="text-xl font-bold text-cherry mb-3">R {(product.price / 100).toFixed(0)}</p>
                    <p className="text-sm text-navy/60 line-clamp-2 mb-4">{product.tagline || 'No description'}</p>
                    <div className="flex gap-2 pt-4 border-t border-navy/10">
                      <Link href={`/admin/products/${product.id}/edit`} className="flex-1">
                        <button className="w-full py-2 text-sm font-medium text-navy/70 hover:bg-navy/5 rounded-lg transition-colors flex items-center justify-center gap-1">
                          <Edit className="w-4 h-4" />
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id, product.name)}
                        disabled={deleting === product.id}
                        className="flex-1 py-2 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center gap-1 disabled:opacity-50"
                      >
                        {deleting === product.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {!loading && products.length > 0 && filteredProducts.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-navy/10 text-center py-12">
              <Search className="w-12 h-12 text-navy/30 mx-auto mb-4" />
              <p className="text-navy/60">No products match your search</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
