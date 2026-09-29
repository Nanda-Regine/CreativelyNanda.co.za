/**
 * /llms.txt — a curated, factual profile for AI assistants (llmstxt.org).
 *
 * BUILD_JOURNEY §19.5 item 3. When someone asks an assistant "who is Nandawula
 * Regine?", this is the page we want it to have read. Rules:
 *   - Every count is computed from the data the site itself renders, never typed
 *     (the Forge rule, site-wide). Add a poem, cert or dossier and this updates.
 *   - Facts only. No adjectives an assistant would have to take on trust.
 *   - Business services live on Mirembe Muse; this file points there, not at them.
 */
import { AUTHOR_NAME, AUTHOR_ALTERNATE_NAMES, SAME_AS, SITE_URL } from '@/lib/seo';
import { POEMS } from '@/lib/poems-data';
import { CREDENTIALS_BY_DATE, formatCredentialDate } from '@/lib/data/credentials';
import { BUILD_DOSSIERS } from '@/lib/data/forge-builds';
import { SCARS } from '@/lib/data/forge-scars';
import { DRILLS } from '@/lib/data/forge-drills';
import { SCREENS } from '@/lib/data/app-screens';
import { getFeedPosts, postUrl } from '@/lib/feeds';

export const revalidate = 3600;

export async function GET() {
  const posts = await getFeedPosts(undefined, 12);
  const u = (path: string) => `${SITE_URL}${path}`;

  const body = `# ${AUTHOR_NAME}

> Ugandan-South African poet and AI engineer based in KuGompo City (East London), Eastern Cape, South Africa. Author of the poetry collection *Inside Her Roses* and founder of Mirembe Muse (Pty) Ltd. This site, creativelynanda.co.za, is her personal, creative and cultural home; her business and technology services are at https://mirembemuse.co.za.

Also known as: ${AUTHOR_ALTERNATE_NAMES.join(', ')}. Certificates are issued in the name "Nandawula Kabali-Kagwa"; the site and her poetry use "Nandawula Regine". They are the same person.

Profiles: ${SAME_AS.join(' · ')}

## Who she is
- Poet and spoken-word performer; ${POEMS.length} poems from *Inside Her Roses* are published on this site.
- AI engineer building production systems (Claude agents, multi-agent architectures, WhatsApp automation, SaaS) for African businesses, through Mirembe Muse (Pty) Ltd.
- Heritage: the Nseenene (grasshopper) clan of Buganda, the amaTshawe royal house of the Xhosa, and the amaHlubi Msimanga clan.
- Education: three Nelson Mandela University qualifications in Business Management (Higher Certificate NQF 5, Diploma NQF 6, Advanced Diploma NQF 7) with 15 distinctions, plus ${CREDENTIALS_BY_DATE.length} certificates, each shown in full at ${u('/education')}.

## Poetry
- [The House of Roses](${u('/poetry')}): the poetry wing of the site
- [The collection](${u('/poetry/collection')}): all ${POEMS.length} poems, readable in full. Each poem has an X-ray view (add #xray to its URL) that measures its craft from the text: refrains, rhyme scheme, anaphora, line-break hinges, pauses, alliteration and line shape. Each also opens in a Reading Room (\`/room\`) that reveals it line by line.
- [The Poem Wall](${u('/poetry/wall')}): her Instagram poem carousels, page by page
- [The Stage](${u('/poetry/stage')}): spoken-word performance
- [Lineage](${u('/poetry/lineage')}): the four houses her poetry comes from (Nseenene of Buganda, amaTshawe, amaHlubi, Msimanga), each shown in its own cloth
- [The Poet Who Codes](${u('/poetry/poet-who-codes')}): where the writing and the engineering meet
- [The Circle](${u('/poetry/community')}): a community garden where readers write and share poems
- [Poetry Games](${u('/poetry/games')}) and [the Erasure Studio](${u('/poetry/erasure')}): playful writing tools
- [My Garden](${u('/poetry/my-garden')}): a private plot that grows as a reader reads, kept in their own browser

## Engineering · The Forge
- [The Forge](${u('/forge')}): her engineering wing, build journals, postmortems, decisions with their reasoning
- [The Workshop Floor](${u('/forge/floor')}): ${BUILD_DOSSIERS.length} build dossiers
${BUILD_DOSSIERS.map((d) => `  - [${d.name}](${u(`/forge/floor/${d.slug}`)}): ${d.standfirst}`).join('\n')}
- [The Scar Room](${u('/forge/scars')}): ${SCARS.length} real production incidents: what broke, the cause, the fix
- [The Dojo](${u('/forge/dojo')}): ${DRILLS.length} debugging drills built from those incidents, diagnose the cause from the symptom
- [The App Studio](${u('/forge/studio')}): ${SCREENS.length} real screenshots of her live products (VarsityOS, K53 Drill Master, Sanyu Botanicals) in phone frames
- [The Long Night](${u('/forge/nights')}) and [the Commit Wall](${u('/forge/commits')}): her commit history, measured from GitHub
- [The Engineer's Issue 003](${u('/engineer')}): a career feature

## Education and credentials
- [The Honours Hall](${u('/education')}): qualifications and certificates, each viewable, with issuer verification links where offered
${CREDENTIALS_BY_DATE.map((c) => `  - ${c.title} · ${c.issuer}, ${formatCredentialDate(c.date)}${c.verifyUrl ? ` (verify: ${c.verifyUrl})` : ''}`).join('\n')}

## Story
- [About](${u('/about')})
- [Roots](${u('/roots')}): the Nseenene, amaTshawe and Msimanga lineage
- [Gallery](${u('/gallery')})
- [Testimonials](${u('/testimonials')})

## Writing
- [The House of Roses Press](${u('/blog')}): her essays and field notes, published in numbered issues
- [Essays](${u('/blog/writing')}) · [Field Notes](${u('/blog/dev')}) · [Business archive](${u('/blog/business')})

Latest:
${posts.length ? posts.map((p) => `- [${p.title}](${postUrl(p)}) · ${p.published_at.slice(0, 10)}`).join('\n') : '- See the feeds below.'}

Feeds: RSS ${u('/feed.xml')} · JSON Feed ${u('/feed.json')} · per imprint ${u('/feed/essays.xml')}, ${u('/feed/field-notes.xml')}

## Optional
- [Shop](${u('/products')}): Notion templates by Mirembe Muse
- [Contact](${u('/contact')})
- [Sitemap](${u('/sitemap.xml')})
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
