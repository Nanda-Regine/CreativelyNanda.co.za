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
  Search,
  Eye,
  Filter,
  Download,
  Mail,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import { getOrders, updateOrderStatus } from '../actions/orders';
import type { Order } from '@/types/database';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Blog Posts', href: '/admin/blog', icon: FileText },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingCart, active: true },
  { label: 'Poetry', href: '/admin/poetry', icon: Feather },
];

const statusConfig: Record<string, { icon: any; color: string; bg: string }> = {
  completed: { icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  pending: { icon: Clock, color: 'text-amber-600', bg: 'bg-amber-100' },
  failed: { icon: XCircle, color: 'text-red-600', bg: 'bg-red-100' },
};

type OrderWithProduct = Order & {
  products?: { name: string; slug: string } | null;
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderWithProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    setLoading(true);
    const { data, error } = await getOrders();
    if (error) {
      setError(error);
    } else {
      setOrders(data || []);
    }
    setLoading(false);
  }

  async function handleStatusChange(id: string, newStatus: Order['status']) {
    setUpdating(id);
    const { data, error } = await updateOrderStatus(id, newStatus);

    if (data) {
      setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
    } else {
      alert(`Error updating order: ${error}`);
    }
    setUpdating(null);
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      (order.user_name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      order.user_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: orders.length,
    completed: orders.filter((o) => o.status === 'completed').length,
    pending: orders.filter((o) => o.status === 'pending').length,
    revenue: orders.filter((o) => o.status === 'completed').reduce((sum, o) => sum + o.amount, 0),
  };

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
              <h1 className="text-3xl font-display font-bold text-navy mb-2">Orders</h1>
              <p className="text-navy/60">Track and manage customer orders</p>
            </div>
            <Button
              variant="outline"
              className="rounded-lg border-gray-300"
              leftIcon={<Download className="w-4 h-4" />}
            >
              Export CSV
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-navy/10">
              <p className="text-sm text-navy/60 mb-1">Total Orders</p>
              <p className="text-2xl font-bold text-navy">{stats.total}</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-navy/10">
              <p className="text-sm text-navy/60 mb-1">Completed</p>
              <p className="text-2xl font-bold text-emerald-600">{stats.completed}</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-navy/10">
              <p className="text-sm text-navy/60 mb-1">Pending</p>
              <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-navy/10">
              <p className="text-sm text-navy/60 mb-1">Revenue</p>
              <p className="text-2xl font-bold text-cherry">R {(stats.revenue / 100).toLocaleString()}</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-navy/10 p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-navy/40" />
                <input
                  type="text"
                  placeholder="Search by customer or order ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-navy/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry/20 focus:border-cherry"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-navy/40" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2.5 border border-navy/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry/20 focus:border-cherry bg-white"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="bg-white rounded-xl shadow-sm border border-navy/10 p-12 text-center">
              <Loader2 className="w-8 h-8 text-cherry animate-spin mx-auto mb-4" />
              <p className="text-navy/60">Loading orders...</p>
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
          {!loading && !error && orders.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-navy/10 text-center py-12">
              <ShoppingCart className="w-12 h-12 text-navy/30 mx-auto mb-4" />
              <p className="text-navy/60">No orders yet</p>
              <p className="text-sm text-navy/40 mt-2">Orders will appear here when customers make purchases</p>
            </div>
          )}

          {/* Orders Table */}
          {!loading && filteredOrders.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-navy/10 overflow-hidden">
              <table className="w-full">
                <thead className="bg-parchment border-b border-navy/10">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-medium text-navy/60">Order ID</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-navy/60">Customer</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-navy/60">Product</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-navy/60">Amount</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-navy/60">Status</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-navy/60">Date</th>
                    <th className="text-right px-6 py-4 text-sm font-medium text-navy/60">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredOrders.map((order) => {
                    const status = statusConfig[order.status] || statusConfig.pending;
                    const StatusIcon = status.icon;
                    return (
                      <motion.tr
                        key={order.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hover:bg-parchment"
                      >
                        <td className="px-6 py-4">
                          <span className="font-mono text-sm font-medium text-navy">
                            {order.id.slice(0, 8)}...
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-medium text-navy">{order.user_name || 'Unknown'}</p>
                          <p className="text-sm text-navy/60">{order.user_email}</p>
                        </td>
                        <td className="px-6 py-4 text-navy/70">
                          {order.products?.name || 'Product Deleted'}
                        </td>
                        <td className="px-6 py-4 font-medium text-navy">
                          R {(order.amount / 100).toFixed(0)}
                        </td>
                        <td className="px-6 py-4">
                          {updating === order.id ? (
                            <Loader2 className="w-4 h-4 animate-spin text-navy/60" />
                          ) : (
                            <select
                              value={order.status}
                              onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                              className={`text-xs px-2 py-1 rounded-full border-0 cursor-pointer ${status.bg} ${status.color}`}
                            >
                              <option value="pending">Pending</option>
                              <option value="completed">Completed</option>
                              <option value="failed">Failed</option>
                            </select>
                          )}
                        </td>
                        <td className="px-6 py-4 text-navy/60 text-sm">
                          {new Date(order.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              className="p-2 hover:bg-navy/5 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4 text-navy/60" />
                            </button>
                            <a
                              href={`mailto:${order.user_email}`}
                              className="p-2 hover:bg-navy/5 rounded-lg transition-colors"
                              title="Email Customer"
                            >
                              <Mail className="w-4 h-4 text-navy/60" />
                            </a>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {!loading && orders.length > 0 && filteredOrders.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-navy/10 text-center py-12">
              <Search className="w-12 h-12 text-navy/30 mx-auto mb-4" />
              <p className="text-navy/60">No orders match your search</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
