'use client';

import { useState, useEffect } from 'react';

const SESSION_KEY = 'cn_session_id';

export function useSessionId(): string {
  const [sessionId, setSessionId] = useState<string>('');

  useEffect(() => {
    // Check for existing session ID
    let id = localStorage.getItem(SESSION_KEY);

    if (!id) {
      // Generate new session ID
      id = crypto.randomUUID();
      localStorage.setItem(SESSION_KEY, id);
    }

    setSessionId(id);
  }, []);

  return sessionId;
}
