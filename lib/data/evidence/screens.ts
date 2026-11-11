/**
 * Static lookup of screens and image manifests, built from the adminos JSON.
 * Add one import per app here as new case files land.
 */
import adminosScreens from './adminos/screens.json';
import adminosManifest from './adminos/manifest.json';
import type { ManifestEntry, ScreenEntry } from './types';

export const SCREEN_BY_ID: Record<string, ScreenEntry> = Object.fromEntries(
  (adminosScreens as ScreenEntry[]).map((s) => [s.id, s]),
);

export const MANIFEST_BY_ID: Record<string, ManifestEntry> = adminosManifest as Record<string, ManifestEntry>;
