/**
 * 📖 The Press — the reading page.
 *
 * Server-rendered. The previous page was a client component that fetched the
 * post after mount, so the HTML the server sent held a spinner and no text:
 * search engines and readers without JavaScript got "Turning the page" and
 * nothing else. Now the whole essay arrives in the first response, and only
 * the likes, views, reviews, progress bar and copy-link hydrate.
 *
 * URL stays /blog/{category}/{slug} (decided 2026-09-28). A post requested
 * under the wrong category is redirected to its own, so one piece has one URL.
 */

import Image from 'next/image';
import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import { ArrowLeft, Linkedin, Twitter } from 'lucide-react';
import { LikeButton, ViewCounter, ReaderReviews } from '@/components/blog';
import { ReadingProgress, CopyLink } from '@/components/press/ReadingIslands';
import DraftDiff from '@/components/press/DraftDiff';
import { getPressPost, getRevisions, imprintNameFor, wordCount } from '@/lib/press';
import { renderPress } from '@/lib/press-render';
import { issueFor, issueLabel, PRESS_NAME, PRESS_SHORT, STUDIO_CATEGORIES } from '@/lib/data/press-issues';
import { SITE_URL } from '@/lib/seo';
import { rhythm } from '@/components/ui/Stock';
import '../../../press.css';

export const revalidate = 3600;

const NAVY = '#0A1128';
const GOLD = '#C9943A';
const ROSE = '#6B0F20';
const CREAM = '#F5F0E8';
/** The house cherry paper (app/stock.css .stock-cherry). */
const CHERRY_PAPER = '#7A1236';

const fmt = (d: string) =>
  new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export default async function PressArticlePage({
  params,
  searchParams,
}: {
  params: { category: string; slug: string };
  searchParams: { preview?: string };
}) {
  const post = await getPressPost(params.slug, searchParams.preview === '1');
  if (!post) notFound();
  if (post.category !== params.category) permanentRedirect(`/blog/${post.category}/${post.slug}`);

  const { html, toc } = renderPress(post.content);
  const issue = issueFor(post.published_at);
  const imprint = imprintNameFor(post.category);
  const studio = STUDIO_CATEGORIES[post.category];
  const words = wordCount(post.content);
  const minutes = post.reading_time || Math.max(1, Math.round(words / 230));
  const revisions = getRevisions(post);
  const url = `${SITE_URL}/blog/${post.category}/${post.slug}`;
  const published = post.published_at ?? post.created_at;
  // The piece, split at each chapter so every chapter prints on the next paper
  // in turn: beige, navy, cherry (the balance rule; app/press.css, chapter bands).
  const chapters = html.split(/(?=<div class="press-chapter"|<h2 )/).filter((c) => c.trim());

  return (
    <div className="relative min-h-screen overflow-x-clip" style={{ background: CREAM }}>
      <ReadingProgress />

      {/* ═══ THE OPENING ═══════════════════════════════════════════════════ */}
      <header className="relative -mt-20 overflow-hidden" style={{ background: CHERRY_PAPER }}>
        {post.cover_image ? (
          <div className="absolute inset-0">
            <Image src={post.cover_image} alt="" fill priority sizes="100vw" className="object-cover" />
          </div>
        ) : null}
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to top, ${CHERRY_PAPER} 6%, ${CHERRY_PAPER}d9 40%, ${NAVY}55 80%, ${CHERRY_PAPER}66)` }}
        />
        <div className="relative z-10 mx-auto flex min-h-[74vh] max-w-4xl flex-col justify-end px-6 pb-14 pt-36">
          <Link
            href="/blog"
            className="group mb-10 inline-flex w-fit items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.3em] transition-opacity hover:opacity-70"
            style={{ color: `${CREAM}b3` }}
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            {PRESS_SHORT}
          </Link>

          <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.3em]">
            <span style={{ color: GOLD }}>{imprint}</span>
            {issue ? (
              <>
                <span className="h-px w-10" style={{ background: `${GOLD}80` }} />
                <span style={{ color: `${CREAM}99` }}>
                  {issueLabel(issue.number)} · {issue.title}
                </span>
              </>
            ) : null}
            {!post.is_published ? <span className="rounded-sm bg-[#C1292E] px-2 py-1 text-white">Preview, unpublished</span> : null}
          </div>

          <h1 className="mb-7 break-words font-display italic leading-[1.02]" style={{ fontSize: 'clamp(2.4rem, 6.2vw, 4.8rem)', color: CREAM }}>
            {post.title}
          </h1>
          {post.excerpt ? (
            <p className="mb-10 max-w-2xl font-display" style={{ fontSize: 'clamp(1.15rem, 2vw, 1.45rem)', color: `${CREAM}cc`, lineHeight: 1.55 }}>
              {post.excerpt}
            </p>
          ) : null}

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t pt-6 font-mono text-[10.5px] uppercase tracking-[0.22em]" style={{ borderColor: `${CREAM}26`, color: `${CREAM}b3` }}>
            <span style={{ color: CREAM }}>Nandawula Regine</span>
            <span>{fmt(published)}</span>
            <span>{minutes} min read</span>
          </div>
        </div>
      </header>

      {/* ═══ THE PIECE ═════════════════════════════════════════════════════ */}
      <main className="relative z-10">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20 xl:max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_220px] xl:grid-cols-[minmax(0,1fr)_17rem_220px]">
            <article id="press-article" className="min-w-0">
              {studio ? (
                <p className="mb-10 border-l-2 pl-4 text-[14px] leading-relaxed" style={{ borderColor: GOLD, color: `${NAVY}99` }}>
                  {studio.name}. This piece is about the business side of the work, which lives at{' '}
                  <a href="https://mirembemuse.co.za" className="underline decoration-dotted underline-offset-4" style={{ color: ROSE }}>
                    Mirembe Muse
                  </a>
                  . It is kept here so its link keeps working.
                </p>
              ) : null}

              {chapters.map((c, i) => (
                <div key={i} className={`press-band stock-${rhythm(i)}`}>
                  <div className="press-body" dangerouslySetInnerHTML={{ __html: c }} />
                </div>
              ))}

              {/* ─── Colophon ─── */}
              <footer className="mt-16 border-t pt-8" style={{ borderColor: `${NAVY}26` }}>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: GOLD }}>
                  Colophon
                </p>
                <dl className="mt-5 grid grid-cols-2 gap-x-8 gap-y-4 text-[14px] sm:grid-cols-3" style={{ color: NAVY }}>
                  {[
                    ['Imprint', imprint],
                    ['Issue', issue ? `${issueLabel(issue.number)}, ${issue.dated}` : 'Before the issues'],
                    ['Published', fmt(published)],
                    ['Length', `${words.toLocaleString('en-ZA')} words`],
                    ['Drafts on file', revisions ? String(revisions.length - 1) : 'None yet'],
                    ['Set in', 'Cormorant Garamond & DM Sans'],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="font-mono text-[9.5px] uppercase tracking-[0.2em]" style={{ color: `${NAVY}80` }}>
                        {k}
                      </dt>
                      <dd className="mt-1 font-display text-lg italic">{v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-6 text-[13px]" style={{ color: `${NAVY}80` }}>
                  Published by {PRESS_NAME}, KuGompo City.
                </p>
              </footer>

              {revisions ? <DraftDiff revisions={revisions} /> : null}

              {post.is_published ? (
                <>
                  <div className="mt-12 flex items-center justify-between border-t py-6" style={{ borderColor: `${NAVY}1a` }}>
                    <LikeButton slug={post.slug} initialLikeCount={post.like_count} />
                    <ViewCounter slug={post.slug} initialViewCount={post.view_count} variant="badge" />
                  </div>
                  <ReaderReviews slug={post.slug} />
                </>
              ) : null}

              <div className="mt-14 border-t pt-8" style={{ borderColor: `${NAVY}1a` }}>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 border-b pb-1 font-mono text-xs uppercase tracking-[0.3em] transition-opacity hover:opacity-70"
                  style={{ color: NAVY, borderColor: GOLD }}
                >
                  <ArrowLeft className="h-4 w-4" style={{ color: GOLD }} /> Back to {PRESS_SHORT.toLowerCase()}
                </Link>
              </div>
            </article>

            {/* The margin column: asides float into it on wide screens. */}
            <div className="hidden xl:block" aria-hidden />

            <aside className="hidden lg:block">
              {/* Its own cream card: the chapter bands pass behind this column. */}
              <div className="sticky top-28 space-y-9 rounded-sm p-5" style={{ background: CREAM, boxShadow: '0 12px 40px -18px rgba(10,17,40,0.45)' }}>
                {toc.length > 1 ? (
                  <nav aria-label="In this piece">
                    <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: `${NAVY}99` }}>
                      In this piece
                    </p>
                    <ol className="space-y-2.5 border-l" style={{ borderColor: `${NAVY}1a` }}>
                      {toc.map((t) => (
                        <li key={t.id}>
                          <a
                            href={`#${t.id}`}
                            className={`-ml-px block border-l-2 border-transparent pl-4 text-sm transition-colors hover:border-[#C9943A] ${t.level === 3 ? 'pl-7 text-xs' : ''}`}
                            style={{ color: `${NAVY}b3` }}
                          >
                            {t.title}
                          </a>
                        </li>
                      ))}
                    </ol>
                  </nav>
                ) : null}

                <div>
                  <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: `${NAVY}99` }}>
                    Share
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(post.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on X"
                      className="rounded-sm border border-[#0A1128]/15 p-2.5 transition-opacity hover:opacity-70"
                    >
                      <Twitter className="h-4 w-4" style={{ color: NAVY }} />
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on LinkedIn"
                      className="rounded-sm border border-[#0A1128]/15 p-2.5 transition-opacity hover:opacity-70"
                    >
                      <Linkedin className="h-4 w-4" style={{ color: NAVY }} />
                    </a>
                    <CopyLink url={url} />
                  </div>
                </div>

                {post.tags?.length ? (
                  <div>
                    <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: `${NAVY}99` }}>
                      Topics
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((t) => (
                        <span key={t} className="rounded-sm border border-[#0A1128]/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: `${NAVY}99` }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
