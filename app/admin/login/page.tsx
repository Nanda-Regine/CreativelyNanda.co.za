'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '/admin';
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });

    if (res.ok) {
      router.push(next);
    } else {
      setError('Invalid token');
      setLoading(false);
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#1a1a2e' }}>
      <form onSubmit={handleSubmit} style={{ background: '#f5f1e8', padding: '2.5rem', borderRadius: '8px', minWidth: '320px' }}>
        <h1 style={{ fontFamily: 'serif', color: '#1a1a2e', marginBottom: '1.5rem', fontSize: '1.5rem' }}>Admin Access</h1>
        <input
          type="password"
          placeholder="Security token"
          value={token}
          onChange={e => setToken(e.target.value)}
          required
          autoComplete="current-password"
          style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '1rem', fontSize: '1rem', boxSizing: 'border-box' }}
        />
        {error && <p style={{ color: '#c21e56', marginBottom: '1rem', fontSize: '0.875rem' }}>{error}</p>}
        <button
          type="submit"
          disabled={loading}
          style={{ width: '100%', padding: '0.75rem', background: '#c21e56', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          {loading ? 'Verifying…' : 'Enter'}
        </button>
      </form>
    </div>
  );
}
