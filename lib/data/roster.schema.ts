import { z } from 'zod';

const hex = z.string().regex(/^#[0-9A-Fa-f]{6}$/);
const https = z.string().url().startsWith('https://');
const noDash = z.string().min(1).refine((s) => !s.includes('—'), 'em dash');

export const RosterAppSchema = z
  .object({
    key: z.string().regex(/^[a-z0-9]+$/),
    name: noDash.max(40),
    relationship: z.enum(['own', 'internal', 'client', 'co-founded', 'venture']),
    status: z.enum(['live', 'in-development']),
    band: z.enum(['own', 'client', 'internal']),
    order: z.number().int().nonnegative(),
    line: noDash.max(180),
    liveUrl: https.optional(),
    host: noDash.max(48),
    access: z.enum(['public', 'login', 'owner-only']),
    paper: hex,
    accent: hex,
    accentInk: hex,
    cover: z.discriminatedUnion('kind', [
      z.object({ kind: z.literal('phone'), id: z.string() }),
      z.object({ kind: z.literal('desk'), id: z.string().regex(/^[a-z0-9]+-\d{6}$/) }),
      z.object({ kind: z.literal('plate') }),
    ]),
    phone: z.enum(['varsityos', 'k53', 'sanyu']).optional(),
    desk: z.enum(['adminos', 'jarvis', 'sanyu', 'greendiaspora', 'selves', 'amanda', 'isd', 'ecdc']).optional(),
    caseFile: z.enum(['adminos', 'jarvis', 'sanyu']).optional(),
    recording: z.string().optional(),
    dossier: z.string().optional(),
    partner: z.object({ name: noDash.max(48), role: noDash.max(32) }).optional(),
  })
  .refine((a) => a.access !== 'owner-only' || !a.liveUrl, 'owner-only apps have no public link')
  .refine((a) => a.status === 'live' || !a.caseFile, 'bench apps have no case file');
