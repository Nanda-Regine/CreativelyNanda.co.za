'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Loader2, Check, Star, X, Trash2, Flower2, ArrowLeft, Mail } from 'lucide-react';
import { Button } from '@/components/ui';
import {
  getGuestPoems,
  setGuestPoemStatus,
  deleteGuestPoem,
  type GuestPoem,
} from '../actions/guest-poems';

const TABS: { key: GuestPoem['status'] | 'all'; label: string }[] = [
  { key: 'pending', label: 'Pending' },
  { key: 'approved', label: 'Approved' },
  { key: 'featured', label: 'Featured' },
  { key: 'rejected', label: 'Rejected' },
  { key: 'all', label: 'All' },
];

const STATUS_STYLES: Record<GuestPoem['status'], string> = {
  pending: 'bg-amber-100 text-amber-700',
  approved: 'bg-emerald-100 text-emerald-700',
  featured: 'bg-cherry/10 text-cherry',
  rejected: 'bg-gray-200 text-gray-600',
};

export default function AdminGuestPoems() {
  const [poems, setPoems] = useState<GuestPoem[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<GuestPoem['status'] | 'all'>('pending');
  const [busy, setBusy] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await getGuestPoems();
    setPoems(data || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const act = async (id: string, fn: () => Promise<unknown>) => {
    setBusy(id);
    await fn();
    await load();
    setBusy(null);
  };

  const visible = tab === 'all' ? poems : poems.filter((p) => p.status === tab);
  const pendingCount = poems.filter((p) => p.status === 'pending').length;

  return (
    <div className="min-h-screen bg-parchment text-navy">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <Link href="/admin" className="inline-flex items-center gap-2 text-navy/50 hover:text-cherry text-sm mb-6">
          <ArrowLeft className="w-4 h-4" /> Admin
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <Flower2 className="w-7 h-7 text-cherry" />
          <h1 className="font-display text-3xl font-bold">Guest Garden</h1>
        </div>
        <p className="text-navy/60 mb-8">
          Poems submitted by readers &amp; fellow writers. {pendingCount > 0 && (
            <span className="text-cherry font-medium">{pendingCount} awaiting your blessing.</span>
          )}
        </p>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {TABS.map((t) => {
            const count = t.key === 'all' ? poems.length : poems.filter((p) => p.status === t.key).length;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  tab === t.key ? 'bg-cherry text-white shadow' : 'bg-white text-navy hover:bg-cherry/10'
                }`}
              >
                {t.label} <span className="opacity-60">({count})</span>
              </button>
            );
          })}
        </div>

        {loading ? (
          <div className="flex items-center gap-2 text-navy/50 py-16 justify-center">
            <Loader2 className="w-5 h-5 animate-spin" /> Loading the garden…
          </div>
        ) : visible.length === 0 ? (
          <div className="text-center py-16 text-navy/40">
            <Flower2 className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p>Nothing here yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {visible.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-display text-xl font-bold">{p.title}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[p.status]}`}>
                        {p.status}
                      </span>
                    </div>
                    <p className="text-sm text-navy/50">
                      {p.is_anonymous ? 'Anonymous' : p.author_name || 'A reader'}
                      {p.author_email && (
                        <a href={`mailto:${p.author_email}`} className="inline-flex items-center gap-1 ml-2 text-navy/40 hover:text-cherry">
                          <Mail className="w-3 h-3" /> {p.author_email}
                        </a>
                      )}
                      <span className="mx-2">·</span>
                      {new Date(p.created_at).toLocaleDateString('en-ZA', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                </div>

                <p className="whitespace-pre-line font-serif text-navy/80 leading-relaxed border-l-2 border-cherry/20 pl-4 mb-5 max-h-52 overflow-y-auto">
                  {p.content}
                </p>

                <div className="flex flex-wrap gap-2">
                  {p.status !== 'approved' && (
                    <Button size="sm" className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white"
                      disabled={busy === p.id} leftIcon={<Check className="w-4 h-4" />}
                      onClick={() => act(p.id, () => setGuestPoemStatus(p.id, 'approved'))}>
                      Approve
                    </Button>
                  )}
                  {p.status !== 'featured' && (
                    <Button size="sm" variant="outline" className="rounded-full border-cherry text-cherry hover:bg-cherry hover:text-white"
                      disabled={busy === p.id} leftIcon={<Star className="w-4 h-4" />}
                      onClick={() => act(p.id, () => setGuestPoemStatus(p.id, 'featured'))}>
                      Feature
                    </Button>
                  )}
                  {p.status !== 'rejected' && (
                    <Button size="sm" variant="ghost" className="rounded-full text-navy/60"
                      disabled={busy === p.id} leftIcon={<X className="w-4 h-4" />}
                      onClick={() => act(p.id, () => setGuestPoemStatus(p.id, 'rejected'))}>
                      Reject
                    </Button>
                  )}
                  <Button size="sm" variant="ghost" className="rounded-full text-red-500 hover:bg-red-50 ml-auto"
                    disabled={busy === p.id} leftIcon={<Trash2 className="w-4 h-4" />}
                    onClick={() => { if (confirm('Delete this submission permanently?')) act(p.id, () => deleteGuestPoem(p.id)); }}>
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
