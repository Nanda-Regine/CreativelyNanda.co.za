/**
 * The Honours Hall — every credential on the site, and only credentials that
 * can be shown.
 *
 * ── THE RULE ──────────────────────────────────────────────────────────────────
 *
 * Nothing is listed here without its certificate file in `/public/certificates`.
 * The 2026-09-27 audit (BUILD_JOURNEY §19.0) found the old `CERTS` array on the
 * Education page had drifted from the real documents: two Canva Design School
 * courses credited to "IDEO" and "Online Academy" and dated a year early, three
 * SheCodes certificates collapsed into one, and a Google / Coursera course with
 * no certificate at all. A page about excellence cannot survive one visitor
 * clicking "verify" and finding a mismatch. So every field below is transcribed
 * from the document itself — issuer, title and date exactly as printed.
 *
 * `Google Digital Marketing & E-commerce` was removed on that audit. Add it back
 * the day its certificate lands in the folder.
 *
 * ── ADDING A CERTIFICATE ──────────────────────────────────────────────────────
 *
 *   1. Drop the file in `/public/certificates/` named `<issuer>-<course>.jpg|png`.
 *   2. Add an entry below. Copy title/date/ID from the certificate, not memory.
 *   3. `width`/`height` are the file's real pixels (next/image needs them).
 *   4. `crop` trims screenshot chrome (status bars, black edges) in percent, so
 *      the source file never has to be edited.
 *
 * The hero counts, the Hall, the ledger pins and the page's JSON-LD all read
 * this file — there is no second place a number can drift in.
 */

export type CredentialTier = 'programme' | 'course';

export interface Credential {
  slug: string;
  /** Title exactly as printed on the certificate. */
  title: string;
  issuer: string;
  /** A line under the issuer — the tier, a sponsor. As printed. */
  issuerDetail?: string;
  /** ISO date of completion, as printed. */
  date: string;
  tier: CredentialTier;
  /** Groups the SheCodes certificates into one path in the Hall. */
  path?: string;
  /** Step label within a path. */
  step?: string;
  credentialId?: string;
  verifyUrl?: string;
  /** Only where the certificate itself states it. */
  duration?: string;
  /** What it became — the one sentence of interpretation allowed per entry. */
  context: string;
  image: { src: string; width: number; height: number };
  crop?: { t?: number; r?: number; b?: number; l?: number };
}

export const CREDENTIALS: Credential[] = [
  // ── II · The Path — SheCodes, three steps ───────────────────────────────────
  {
    slug: 'shecodes-basics-intro-to-coding',
    title: 'Introduction to Coding',
    issuer: 'SheCodes',
    issuerDetail: 'SheCodes Basics · supported by the Delac Foundation',
    date: '2025-07-01',
    tier: 'programme',
    path: 'shecodes',
    step: 'Basics',
    context: 'The first line of code. HTML, CSS, JavaScript and VS Code, taught by the SheCodes founder.',
    image: { src: '/certificates/shecodes-basics-intro-to-coding.png', width: 3508, height: 2479 },
  },
  {
    slug: 'shecodes-basics-addon-web-development',
    title: 'Introduction to Web Development',
    issuer: 'SheCodes',
    issuerDetail: 'SheCodes Basics Add-on · supported by the Delac Foundation',
    date: '2025-07-22',
    tier: 'programme',
    path: 'shecodes',
    step: 'Basics Add-on',
    context: 'Three weeks later: from writing code to building pages that live on the web.',
    image: { src: '/certificates/shecodes-basics-addon-web-development.png', width: 3508, height: 2479 },
  },
  {
    slug: 'shecodes-plus-web-development',
    title: 'Web Development',
    issuer: 'SheCodes',
    issuerDetail: 'SheCodes Plus · fully supported by the SheDreams Foundation',
    date: '2026-02-26',
    tier: 'programme',
    path: 'shecodes',
    step: 'Plus',
    // The K53 Drill Master repository's first commit is 2026-02-27
    // (lib/data/forge-github.json) — measured, not remembered.
    context: 'Certified on 26 February 2026. The K53 Drill Master repository opened the next morning.',
    image: { src: '/certificates/shecodes-plus-web-development.png', width: 3508, height: 2479 },
  },

  // ── III · The Cabinet — short courses ───────────────────────────────────────
  {
    slug: 'great-learning-master-generative-ai',
    title: 'Master Generative AI',
    issuer: 'Great Learning',
    issuerDetail: 'Professional online course',
    date: '2025-12-13',
    tier: 'course',
    credentialId: 'IEWIXPZJ',
    verifyUrl: 'https://www.mygreatlearning.com/certificate/IEWIXPZJ',
    context: 'Prompt engineering theory that now runs the AI agents across her production apps.',
    image: { src: '/certificates/great-learning-master-generative-ai.jpg', width: 1080, height: 771 },
    crop: { t: 1, b: 1 },
  },
  {
    slug: 'great-learning-chatgpt-business-communication',
    title: 'ChatGPT for Business Communication',
    issuer: 'Great Learning',
    issuerDetail: 'Online course',
    date: '2025-08-19',
    tier: 'course',
    credentialId: 'SFBWQPHH',
    verifyUrl: 'https://www.mygreatlearning.com/certificate/SFBWQPHH',
    context: 'How she builds AI assistants that sound human, not robotic.',
    image: { src: '/certificates/great-learning-chatgpt-business-communication.jpg', width: 1080, height: 777 },
    crop: { t: 2, b: 1 },
  },
  {
    slug: 'great-learning-affiliate-marketing',
    title: 'Affiliate Marketing',
    issuer: 'Great Learning',
    issuerDetail: 'Online course',
    date: '2025-08-23',
    tier: 'course',
    credentialId: 'YXVMXKDC',
    verifyUrl: 'https://www.mygreatlearning.com/certificate/YXVMXKDC',
    context: 'Distribution, the half of a product that is not the code.',
    image: { src: '/certificates/great-learning-affiliate-marketing.jpg', width: 1080, height: 759 },
    crop: { t: 1.5, b: 1 },
  },
  {
    slug: 'great-learning-google-ai-studio',
    title: 'Hands-On with Google AI Studio',
    issuer: 'Great Learning',
    issuerDetail: 'Online course',
    date: '2025-08-27',
    tier: 'course',
    credentialId: 'UWIVNAHO',
    verifyUrl: 'https://www.mygreatlearning.com/certificate/UWIVNAHO',
    context: 'Working with models as a workbench rather than a chat window.',
    image: { src: '/certificates/great-learning-google-ai-studio.jpg', width: 1080, height: 746 },
  },
  {
    slug: 'canva-graphic-design-essentials',
    title: 'Graphic Design Essentials',
    issuer: 'Canva Design School',
    issuerDetail: 'Canva certified',
    date: '2025-09-29',
    tier: 'course',
    credentialId: '2ff694',
    duration: '45 minutes of training',
    context: 'The editorial eye behind every case study, every brand, every cover.',
    image: { src: '/certificates/canva-graphic-design-essentials.jpg', width: 1080, height: 769 },
    crop: { t: 1, b: 1.5 },
  },
  {
    slug: 'canva-human-centered-design',
    title: 'The Field Guide to Human-Centered Design',
    issuer: 'Canva Design School',
    issuerDetail: 'Canva certified',
    date: '2025-09-30',
    tier: 'course',
    credentialId: 'b9ebd9',
    context: 'Nova on VarsityOS. The UX of StokvelOS. The onboarding of AdminOS. All start here.',
    image: { src: '/certificates/canva-human-centered-design.jpg', width: 1080, height: 775 },
    crop: { t: 1, b: 1.5 },
  },
];

/** Oldest first — the order the Hall walks and the ledger reads. */
export const CREDENTIALS_BY_DATE = [...CREDENTIALS].sort((a, b) => a.date.localeCompare(b.date));

export const PROGRAMME_PATH = CREDENTIALS_BY_DATE.filter((c) => c.tier === 'programme');

/** The cabinet, one shelf per issuer, shelves in order of each issuer's first certificate. */
export const CABINET: { issuer: string; items: Credential[] }[] = CREDENTIALS_BY_DATE
  .filter((c) => c.tier === 'course')
  .reduce<{ issuer: string; items: Credential[] }[]>((shelves, c) => {
    const shelf = shelves.find((s) => s.issuer === c.issuer);
    if (shelf) shelf.items.push(c);
    else shelves.push({ issuer: c.issuer, items: [c] });
    return shelves;
  }, []);

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/**
 * "1 July 2025" / "Jul 2025". Formatted by hand, not `toLocaleDateString`:
 * Node's ICU and the browser's can disagree on a locale's output, and a
 * mismatched date string is exactly the React #425 this site keeps hitting
 * (memory: hydration-patterns).
 */
export function formatCredentialDate(iso: string, style: 'long' | 'short' = 'long'): string {
  const [y, m, d] = iso.split('-').map(Number);
  return style === 'long' ? `${d} ${MONTHS[m - 1]} ${y}` : `${MONTHS[m - 1].slice(0, 3)} ${y}`;
}
