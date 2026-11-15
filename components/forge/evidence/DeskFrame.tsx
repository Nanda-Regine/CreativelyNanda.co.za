'use client';

/**
 * Case-file lookup wrapper around DeskView: resolves a screen id against the
 * static evidence maps. Floors do not use this (they would pull every app's
 * manifest into the route); they pass their own entries to DeskView.
 */

import { MANIFEST_BY_ID, SCREEN_BY_ID } from '@/lib/data/evidence/screens';
import DeskView from './DeskView';

interface Props {
  screenId: string;
  path?: string;
  tilt?: boolean;
  priority?: boolean;
  className?: string;
}

export default function DeskFrame({ screenId, path, tilt = false, priority = false, className = '' }: Props) {
  const entry = MANIFEST_BY_ID[screenId];
  const screen = SCREEN_BY_ID[screenId];
  if (!entry || !screen) return null;
  const app = screenId.slice(0, screenId.lastIndexOf('-'));
  const shownPath = path ?? (app === 'jarvis' ? 'Jarvis OS, owner login' : app === 'sanyu' ? 'sanyubotanicals.co.za' : `${app}.co.za`);
  return <DeskView id={screenId} entry={entry} alt={screen.alt} caption={screen.caption} path={shownPath} tilt={tilt} priority={priority} className={className} />;
}
