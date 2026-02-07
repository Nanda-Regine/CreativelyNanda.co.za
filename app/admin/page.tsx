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
  TrendingUp,
  Eye,
  DollarSign,
  Heart,
  Clock,
  Loader2,
} from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import { getProducts } from './actions/products';
import { getOrders, getOrderStats } from './actions/orders';
import { getPosts } from './actions/posts';
import { getPoems, getPoemStats } from './actions/poems';

const QUICK_ACTIONS = [
  { label: 'New Blog Post', href: '/admin/blog/new', icon: FileText, color: 'bg-blue-500' },
  { label: 'Add Product', href: '/admin/products/new', icon: Package, color: 'bg-purple-500' },
  { label: 'View Orders', href: '/admin/orders', icon: ShoppingCart, color: 'bg-emerald-500' },
  { label: 'Manage Poetry', href: '/admin/poetry', icon: Feather, color: 'bg-pink-500' },
];

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard, active: true },
  { label: 'Blog Posts', href: '/admin/blog', icon: FileText },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { label: 'Poetry', href: '/admin/poetry', icon: Feather },
];

type DashboardStats = {
  revenue: number;
  totalOrders: number;
  totalProducts: number;
  totalPoems: number;
  totalHearts: number;
  pendingOrders: number;
};

type RecentOrder = {
  id: string;
  user_name: string | null;
  user_email: string;
  amount: number;
  status: string;
  created_at: string;
  products?: { name: string } | null;
};

type RecentPost = {
  id: string;
  title: string;
  category: string;
  is_published: boolean;
  reading_time: number | null;
};

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    revenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalPoems: 0,
    totalHearts: 0,
    pendingOrders: 0,
  });
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [recentPosts, setRecentPosts] = useState<RecentPost[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  async function loadDashboardData() {
    setLoading(true);

    // Fetch all data in parallel
    const [productsRes, ordersRes, orderStatsRes, postsRes, poemStatsRes] = await Promise.all([
      getProducts(),
      getOrders(),
      getOrderStats(),
      getPosts(),
      getPoemStats(),
    ]);

    // Calculate stats
    const orderStats = orderStatsRes.data || { total: 0, completed: 0, pending: 0, revenue: 0 };
    const poemStats = poemStatsRes.data || { total: 0, published: 0, totalHearts: 0 };

    setStats({
      revenue: orderStats.revenue,
      totalOrders: orderStats.total,
      totalProducts: productsRes.data?.length || 0,
      totalPoems: poemStats.total,
      totalHearts: poemStats.totalHearts,
      pendingOrders: orderStats.pending,
    });

    // Get recent orders (first 4)
    if (ordersRes.data) {
      setRecentOrders(ordersRes.data.slice(0, 4));
    }

    // Get recent posts (first 4)
    if (postsRes.data) {
      setRecentPosts(postsRes.data.slice(0, 4));
    }

    setLoading(false);
  }

  function formatTimeAgo(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  }

  const STATS = [
    {
      label: 'Total Revenue',
      value: `R ${(stats.revenue / 100).toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-emerald-100 text-emerald-600',
    },
    {
      label: 'Total Orders',
      value: stats.totalOrders.toString(),
      icon: ShoppingCart,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      label: 'Products',
      value: stats.totalProducts.toString(),
      icon: Package,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      label: 'Poetry Hearts',
      value: stats.totalHearts.toLocaleString(),
      icon: Heart,
      color: 'bg-pink-100 text-pink-600',
    },
  ];

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
          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold text-navy mb-2">Dashboard</h1>
            <p className="text-navy/60">Welcome back, Nanda. Here's what's happening.</p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-cherry animate-spin" />
            </div>
          )}

          {!loading && (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {STATS.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white rounded-xl p-6 shadow-sm border border-navy/10"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                          <Icon className="w-6 h-6" />
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-navy">{stat.value}</p>
                      <p className="text-sm text-navy/60">{stat.label}</p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Quick Actions */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-navy mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {QUICK_ACTIONS.map((action) => {
                    const Icon = action.icon;
                    return (
                      <Link
                        key={action.label}
                        href={action.href}
                        className="bg-white rounded-xl p-4 shadow-sm border border-navy/10 hover:shadow-md transition-shadow group"
                      >
                        <div
                          className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <p className="font-medium text-navy">{action.label}</p>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Two Column Layout */}
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Recent Orders */}
                <div className="bg-white rounded-xl shadow-sm border border-navy/10">
                  <div className="px-6 py-4 border-b border-navy/10 flex items-center justify-between">
                    <h2 className="font-semibold text-navy">Recent Orders</h2>
                    <Link href="/admin/orders" className="text-sm text-cherry hover:underline">
                      View All
                    </Link>
                  </div>
                  {recentOrders.length === 0 ? (
                    <div className="px-6 py-8 text-center">
                      <ShoppingCart className="w-10 h-10 text-navy/20 mx-auto mb-2" />
                      <p className="text-navy/60">No orders yet</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-100">
                      {recentOrders.map((order) => (
                        <div key={order.id} className="px-6 py-4 flex items-center justify-between">
                          <div>
                            <p className="font-medium text-navy">{order.user_name || 'Customer'}</p>
                            <p className="text-sm text-navy/60">{order.products?.name || 'Product'}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-navy">R {(order.amount / 100).toFixed(0)}</p>
                            <div className="flex items-center gap-2 justify-end">
                              <span
                                className={`text-xs px-2 py-0.5 rounded-full ${
                                  order.status === 'completed'
                                    ? 'bg-emerald-100 text-emerald-700'
                                    : order.status === 'pending'
                                    ? 'bg-amber-100 text-amber-700'
                                    : 'bg-red-100 text-red-700'
                                }`}
                              >
                                {order.status}
                              </span>
                              <span className="text-xs text-navy/40 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {formatTimeAgo(order.created_at)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Recent Blog Posts */}
                <div className="bg-white rounded-xl shadow-sm border border-navy/10">
                  <div className="px-6 py-4 border-b border-navy/10 flex items-center justify-between">
                    <h2 className="font-semibold text-navy">Recent Posts</h2>
                    <Link href="/admin/blog" className="text-sm text-cherry hover:underline">
                      View All
                    </Link>
                  </div>
                  {recentPosts.length === 0 ? (
                    <div className="px-6 py-8 text-center">
                      <FileText className="w-10 h-10 text-navy/20 mx-auto mb-2" />
                      <p className="text-navy/60">No posts yet</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-100">
                      {recentPosts.map((post) => (
                        <div key={post.id} className="px-6 py-4 flex items-center justify-between">
                          <div>
                            <p className="font-medium text-navy">{post.title}</p>
                            <p className="text-sm text-navy/60 capitalize">{post.category}</p>
                          </div>
                          <div className="text-right">
                            {post.reading_time && (
                              <p className="text-sm text-navy/70 flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {post.reading_time} min
                              </p>
                            )}
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full ${
                                post.is_published
                                  ? 'bg-emerald-100 text-emerald-700'
                                  : 'bg-gray-100 text-navy/70'
                              }`}
                            >
                              {post.is_published ? 'published' : 'draft'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
