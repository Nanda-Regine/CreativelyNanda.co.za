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
  Eye,
  Filter,
  Download,
  Mail,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react';
import { Button, Badge } from '@/components/ui';

// Mock orders - will come from Supabase in production
const ORDERS = [
  {
    id: 'ORD-001',
    customer: { name: 'Thabo Molefe', email: 'thabo@email.com' },
    product: 'NSFAS Tracker',
    amount: 149,
    status: 'completed',
    paymentMethod: 'PayFast',
    createdAt: '2024-02-07 14:32',
  },
  {
    id: 'ORD-002',
    customer: { name: 'Lindiwe Khumalo', email: 'lindiwe@email.com' },
    product: 'Freelancer Hub',
    amount: 349,
    status: 'completed',
    paymentMethod: 'PayFast',
    createdAt: '2024-02-07 09:15',
  },
  {
    id: 'ORD-003',
    customer: { name: 'Sipho Ndaba', email: 'sipho@email.com' },
    product: 'SME Hub',
    amount: 499,
    status: 'pending',
    paymentMethod: 'PayFast',
    createdAt: '2024-02-06 18:45',
  },
  {
    id: 'ORD-004',
    customer: { name: 'Naledi Pule', email: 'naledi@email.com' },
    product: 'Inside Her Roses (eBook)',
    amount: 99,
    status: 'completed',
    paymentMethod: 'Stripe',
    createdAt: '2024-02-05 11:20',
  },
  {
    id: 'ORD-005',
    customer: { name: 'Bongani Zulu', email: 'bongani@email.com' },
    product: 'Varsity Survival Kit',
    amount: 249,
    status: 'failed',
    paymentMethod: 'PayFast',
    createdAt: '2024-02-05 08:00',
  },
  {
    id: 'ORD-006',
    customer: { name: 'Zanele Dlamini', email: 'zanele@email.com' },
    product: 'NSFAS Tracker',
    amount: 149,
    status: 'completed',
    paymentMethod: 'PayFast',
    createdAt: '2024-02-04 16:30',
  },
];

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

export default function AdminOrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredOrders = ORDERS.filter((order) => {
    const matchesSearch =
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: ORDERS.length,
    completed: ORDERS.filter((o) => o.status === 'completed').length,
    pending: ORDERS.filter((o) => o.status === 'pending').length,
    revenue: ORDERS.filter((o) => o.status === 'completed').reduce((sum, o) => sum + o.amount, 0),
  };

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
              <h1 className="text-3xl font-display font-bold text-navy mb-2">Orders</h1>
              <p className="text-gray-500">Track and manage customer orders</p>
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
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 mb-1">Total Orders</p>
              <p className="text-2xl font-bold text-navy">{stats.total}</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 mb-1">Completed</p>
              <p className="text-2xl font-bold text-emerald-600">{stats.completed}</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 mb-1">Pending</p>
              <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 mb-1">Revenue</p>
              <p className="text-2xl font-bold text-cherry">R {stats.revenue.toLocaleString()}</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by customer or order ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry/20 focus:border-cherry"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry/20 focus:border-cherry bg-white"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Order ID</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Customer</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Product</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Amount</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Date</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredOrders.map((order) => {
                  const status = statusConfig[order.status];
                  const StatusIcon = status.icon;
                  return (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm font-medium text-navy">{order.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-navy">{order.customer.name}</p>
                        <p className="text-sm text-gray-500">{order.customer.email}</p>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{order.product}</td>
                      <td className="px-6 py-4 font-medium text-navy">R {order.amount}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${status.bg} ${status.color}`}
                        >
                          <StatusIcon className="w-3 h-3" />
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-sm">{order.createdAt}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="View">
                            <Eye className="w-4 h-4 text-gray-500" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Email">
                            <Mail className="w-4 h-4 text-gray-500" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>

            {filteredOrders.length === 0 && (
              <div className="text-center py-12">
                <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No orders found</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
