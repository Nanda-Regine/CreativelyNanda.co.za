'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  LayoutDashboard,
  FileText,
  Package,
  ShoppingCart,
  Feather,
  Users,
  TrendingUp,
  Eye,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Clock,
} from 'lucide-react';
import { Button, Badge } from '@/components/ui';

// Mock stats - will come from Supabase in production
const STATS = [
  {
    label: 'Total Revenue',
    value: 'R 24,580',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'bg-emerald-100 text-emerald-600',
  },
  {
    label: 'Page Views',
    value: '12,847',
    change: '+8.2%',
    trend: 'up',
    icon: Eye,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    label: 'Orders',
    value: '156',
    change: '+23.1%',
    trend: 'up',
    icon: ShoppingCart,
    color: 'bg-purple-100 text-purple-600',
  },
  {
    label: 'Blog Readers',
    value: '3,421',
    change: '-2.4%',
    trend: 'down',
    icon: Users,
    color: 'bg-amber-100 text-amber-600',
  },
];

const QUICK_ACTIONS = [
  { label: 'New Blog Post', href: '/admin/blog/new', icon: FileText, color: 'bg-blue-500' },
  { label: 'Add Product', href: '/admin/products/new', icon: Package, color: 'bg-purple-500' },
  { label: 'View Orders', href: '/admin/orders', icon: ShoppingCart, color: 'bg-emerald-500' },
  { label: 'Manage Poetry', href: '/admin/poetry', icon: Feather, color: 'bg-pink-500' },
];

const RECENT_ORDERS = [
  { id: 'ORD-001', customer: 'Thabo M.', product: 'NSFAS Tracker', amount: 149, status: 'completed', date: '2 hours ago' },
  { id: 'ORD-002', customer: 'Lindiwe K.', product: 'Freelancer Hub', amount: 349, status: 'completed', date: '5 hours ago' },
  { id: 'ORD-003', customer: 'Sipho N.', product: 'SME Hub', amount: 499, status: 'pending', date: '1 day ago' },
  { id: 'ORD-004', customer: 'Naledi P.', product: 'Inside Her Roses (eBook)', amount: 99, status: 'completed', date: '2 days ago' },
];

const RECENT_POSTS = [
  { title: 'Next.js 14 App Router Guide', category: 'dev', views: 1247, status: 'published' },
  { title: 'Poetry as Therapy', category: 'writing', views: 892, status: 'published' },
  { title: 'Building Notion Templates', category: 'business', views: 654, status: 'draft' },
];

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard, active: true },
  { label: 'Blog Posts', href: '/admin/blog', icon: FileText },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { label: 'Poetry', href: '/admin/poetry', icon: Feather },
];

export default function AdminDashboard() {
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
                    <span
                      className={`text-sm font-medium flex items-center gap-1 ${
                        stat.trend === 'up' ? 'text-emerald-600' : 'text-red-500'
                      }`}
                    >
                      {stat.trend === 'up' ? (
                        <ArrowUpRight className="w-4 h-4" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4" />
                      )}
                      {stat.change}
                    </span>
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
              <div className="divide-y divide-gray-100">
                {RECENT_ORDERS.map((order) => (
                  <div key={order.id} className="px-6 py-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-navy">{order.customer}</p>
                      <p className="text-sm text-navy/60">{order.product}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-navy">R {order.amount}</p>
                      <div className="flex items-center gap-2 justify-end">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            order.status === 'completed'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          {order.status}
                        </span>
                        <span className="text-xs text-navy/40 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {order.date}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Blog Posts */}
            <div className="bg-white rounded-xl shadow-sm border border-navy/10">
              <div className="px-6 py-4 border-b border-navy/10 flex items-center justify-between">
                <h2 className="font-semibold text-navy">Recent Posts</h2>
                <Link href="/admin/blog" className="text-sm text-cherry hover:underline">
                  View All
                </Link>
              </div>
              <div className="divide-y divide-gray-100">
                {RECENT_POSTS.map((post) => (
                  <div key={post.title} className="px-6 py-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-navy">{post.title}</p>
                      <p className="text-sm text-navy/60 capitalize">{post.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-navy/70 flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {post.views.toLocaleString()}
                      </p>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          post.status === 'published'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-gray-100 text-navy/70'
                        }`}
                      >
                        {post.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
