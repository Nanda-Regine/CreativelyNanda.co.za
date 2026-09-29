// The reader's trail: which poems this browser has opened, and which it keeps.
// Lives in localStorage only (no account, nothing sent anywhere), so every
// read and write is guarded: storage can be missing, full or blocked.
//
// "Kept" is the bookmark on a poem (the `savedPoems` key predates this file
// and is kept for existing readers). "Read" is recorded when a poem, or its
// Reading Room, is opened. My Garden draws both.

const READ_KEY = 'readPoems';
const KEPT_KEY = 'savedPoems';

function readList(key: string): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(key) || '[]');
    return Array.isArray(v) ? v.filter((s): s is string => typeof s === 'string') : [];
  } catch {
    return [];
  }
}

function writeList(key: string, list: string[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(list));
  } catch {
    /* storage unavailable: the garden simply does not grow on this device */
  }
}

/** Slugs read, oldest first. */
export function getRead(): string[] {
  return readList(READ_KEY);
}

/** Record a poem as read. Re-reading moves it to the end (most recent). */
export function recordRead(slug: string): void {
  const list = readList(READ_KEY).filter((s) => s !== slug);
  list.push(slug);
  writeList(READ_KEY, list.slice(-500));
}

export function getKept(): string[] {
  return readList(KEPT_KEY);
}
