'use client';

/**
 * /about — the woman.
 *
 * ── REBUILT, AUGUST 2026 ──────────────────────────────────────────────────────
 *
 * The previous version was four chapters on one navy ground, using five
 * photographs. It was well written and it was thin: a life with two radio
 * interviews, a book launch, a mountain range, a beer brewed in a clay pot and
 * two graduations, told in about six hundred words on a single colour.
 *
 * What changed:
 *
 * 1. **Seven chapters, seven grounds.** parchment → bone → cobalt → studio →
 *    ink → bone → rose. The paper changes when the subject changes, which is
 *    how a magazine signals a new movement. See `components/ui/Ground.tsx`.
 * 2. **Three chapters that did not exist**: On Air (the two radio interviews),
 *    Where She Comes From (the heritage and mountain photographs), and the
 *    reader's reply.
 * 3. **Her copy is kept nearly verbatim.** It is the best writing on the site
 *    and it did not need me. What it needed was room and pictures.
 *
 * ⚠️ It also said "Madiba Radio". The station is **Madibaz Radio** — Nelson
 * Mandela University's, "Connect. Inform. Engage." Corrected here and in the
 * eleven other places the site had it wrong.
 */

import Link from 'next/link';
import Ground, { PhotoBleed, groundTokens } from '@/components/ui/Ground';
import { Reveal, OffsetFigure, PullQuote, Rule, VideoTile, StackedPair } from '@/components/ui/Editorial';
import { FAMILY } from '@/lib/data/asset-atlas';

const P = (id: string) => `nanda-portraits/${id}`;

/** A chapter spread: prose one side, photography the other, alternating. */
function Chapter({
  kicker,
  title,
  accent,
  ink,
  children,
  media,
  flip = false,
}: {
  kicker: string;
  title: string;
  accent: string;
  ink: string;
  children: React.ReactNode;
  media: React.ReactNode;
  flip?: boolean;
}) {
  return (
    <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-12 md:gap-16">
      <div className={`md:col-span-5 ${flip ? 'md:order-2 md:col-start-8' : ''}`}>{media}</div>
      <div className={`md:col-span-6 ${flip ? 'md:order-1 md:col-start-1' : 'md:col-start-7'}`}>
        <Reveal>
          <Rule label={kicker} accent={accent} />
          <h2 className="mt-7 font-display font-bold italic leading-[1.03]" style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)' }}>
            {title}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-6 space-y-5 text-[16px] font-light leading-[1.9] md:text-[17px]" style={{ color: `${ink}BF` }}>
            {children}
          </div>
        </Reveal>
      </div>
    </div>
  );
}

export default function About() {
  const parchment = groundTokens('parchment');
  const bone = groundTokens('bone');
  const cobalt = groundTokens('cobalt');
  const studio = groundTokens('studio');
  const ink = groundTokens('ink');
  const rose = groundTokens('rose');
  const garden = groundTokens('garden');

  return (
    <main className="min-h-screen">
      {/* ═══ HERO — bougainvillea, at full strength ═══════════════════════════ */}
      <PhotoBleed
        image={P('IMG_20241107_161928')}
        ground="garden"
        focus="center 25%"
        from="bottom"
        minH="94vh"
        className="-mt-20 pt-28"
      >
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-24">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.35em]" style={{ color: '#FFD9A0' }}>
              Poet · Performer · The poet who codes
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1
              className="mt-6 font-display font-bold italic leading-[0.9]"
              style={{ fontSize: 'clamp(3rem, 11vw, 7.5rem)', color: '#FBF8F3', textShadow: '0 2px 40px rgba(0,0,0,0.4)' }}
            >
              Nandawula
              <br />
              Regine
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-7 max-w-xl text-[16px] font-light leading-relaxed md:text-lg" style={{ color: 'rgba(251,248,243,0.85)' }}>
              A woman who writes in roses and builds in code — from KuGompo City (formerly East London), out to
              the world, and always back to where she comes from.
            </p>
          </Reveal>
        </div>
      </PhotoBleed>

      {/* ═══ TWO TONGUES ═════════════════════════════════════════════════════ */}
      <Ground ground="parchment" className="px-6 py-24 md:py-28" edge="slant">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em]" style={{ color: parchment.accent }}>
              In her own words, more or less
            </p>
            <p className="mt-8 font-display italic leading-[1.35]" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.6rem)' }}>
              She learned to speak in two tongues — the language of longing, and the language of systems. One she
              was born into. The other she taught herself, at a modest desk, until the screen answered back.
            </p>
          </Reveal>
        </div>
      </Ground>

      {/* ═══ THE POET ════════════════════════════════════════════════════════ */}
      <Ground ground="bone" className="px-6 py-24 md:py-28">
        <Chapter
          kicker="The Poet"
          title="It began with a notebook."
          accent={bone.accent}
          ink={bone.ink}
          media={
            <StackedPair
              back={P('IMG_20250926_163119')}
              front={FAMILY.book.ids[0] ?? P('IMG_20250714_151943')}
              alt="Nanda in a sunlit forest clearing, and her collection Inside Her Roses"
              accent={bone.accent}
            />
          }
        >
          <p>
            Before the apps and the stages, there was a girl in KuGompo City who wrote things down. In 2021 she
            gathered the truest of them into a debut collection — <em>Inside Her Roses</em> — poems on womanhood,
            longing, healing, and the quiet ferocity of becoming.
          </p>
          <p>
            The book gave her a name to introduce herself by. It is still the centre of everything: the rose she
            keeps returning to, the softness she refuses to apologise for.
          </p>
          <Link
            href="/poetry/collection"
            className="inline-block border-b-2 pb-1 font-medium transition-opacity hover:opacity-70"
            style={{ borderColor: bone.accent, color: bone.ink }}
          >
            Read the collection →
          </Link>
        </Chapter>
      </Ground>

      {/* ═══ THE STAGE ═══════════════════════════════════════════════════════ */}
      <Ground ground="cobalt" className="px-6 py-24 md:py-28" edge="slant-reverse">
        <Chapter
          kicker="The Stage"
          title="Then the poem stood up and spoke."
          accent={cobalt.accent}
          ink={cobalt.ink}
          flip
          media={
            <OffsetFigure
              image={FAMILY.festival.ids[0]}
              alt="Seated on the mosaic plaza in Xhosa regalia, holding the book"
              caption="Nelson Mandela Bay Arts Festival — her book in her lap like a small crown."
              bleed="left"
              ratio="4 / 5"
            />
          }
        >
          <p>
            Poetry, for her, was never only ink. It put on beadwork and found a microphone — spoken-word nights,
            the Mandela Bay Arts Festival, five live performances across the Eastern Cape.
          </p>
          <p>
            On stage the two halves of her meet: the writer and the performer, the tradition and the woman living
            inside it. She doesn&apos;t recite her culture. She wears it, and moves.
          </p>
        </Chapter>

        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {FAMILY.performance.ids.slice(0, 4).map((id, i) => (
            <Reveal key={id} delay={i * 0.06}>
              <div className={i % 2 ? 'md:pt-8' : ''}>
                <OffsetFigure image={id} alt="Live poetry performance" ratio="3 / 4" bleed="none" parallax={false} />
              </div>
            </Reveal>
          ))}
        </div>
      </Ground>

      {/* ═══ ON AIR — new ════════════════════════════════════════════════════ */}
      <Ground ground="studio" className="px-6 py-24 md:py-28">
        <Chapter
          kicker="On Air"
          title="Two stations. One voice, carried."
          accent={studio.accent}
          ink={studio.ink}
          media={
            <OffsetFigure
              image={FAMILY.radio.ids[0]}
              alt="Seated in the TRU FM studio in Xhosa regalia"
              caption="TRU FM — the morning her voice went out over the city."
              bleed="left"
              ratio="4 / 5"
            />
          }
        >
          <p>
            Twice she has been asked into a room full of microphones and left there: <strong>TRU FM</strong> in
            the morning with the beadwork still on, and <strong>Madibaz Radio</strong> at the desk with the
            faders up — <em>Connect. Inform. Engage.</em>
          </p>
          <p>
            There is a particular vertigo the first time a stranger says your name on air. The poems leave the
            house without you. You find out they were never only yours.
          </p>
          <Link
            href="/gallery"
            className="inline-block border-b-2 pb-1 font-medium transition-opacity hover:opacity-70"
            style={{ borderColor: studio.accent, color: studio.ink }}
          >
            See both studios →
          </Link>
        </Chapter>
      </Ground>

      {/* ═══ THE TURN TO CODE ════════════════════════════════════════════════ */}
      <Ground ground="ink" image={FAMILY.screens.ids[0]} veil={0.52} parallax className="px-6 py-24 md:py-28">
        <Chapter
          kicker="The Turn"
          title="She taught herself a second language."
          accent={ink.accent}
          ink={ink.ink}
          flip
          media={
            <OffsetFigure
              image={FAMILY.coding.ids[0]}
              alt="At a desk at night, hood up, code on the screen, a printer beside her"
              caption="No bootcamp. A desk, a printer, and a great many nights."
              bleed="left"
              ratio="4 / 5"
            />
          }
        >
          <p>
            Somewhere between the stages, she opened a laptop and refused to close it until it made sense. No
            bootcamp, no shortcut — a home desk, a rainbow of errors, and a stubbornness inherited from a clan
            whose motto calls its people <em>the pillar and the support-beam</em>.
          </p>
          <p>
            What came out was a company — <span style={{ color: ink.ink }}>Mirembe Muse</span> — and, inside a
            single year, eight production systems: AI tools, apps, real software for the continent, with paying
            clients to prove it. The poet had become an engineer without ever ceasing to be a poet.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <Link
              href="/forge"
              className="inline-block border-b-2 pb-1 font-medium transition-opacity hover:opacity-70"
              style={{ borderColor: ink.accent, color: ink.ink }}
            >
              Walk through the Forge →
            </Link>
            <a
              href="https://mirembemuse.co.za"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-b-2 pb-1 font-medium transition-opacity hover:opacity-70"
              style={{ borderColor: 'rgba(255,255,255,0.35)', color: ink.ink }}
            >
              See the work at Mirembe Muse ↗
            </a>
          </div>
        </Chapter>
      </Ground>

      {/* ═══ WHERE SHE COMES FROM — new ══════════════════════════════════════ */}
      <Ground ground="bone" className="px-6 py-24 md:py-28" edge="slant">
        <Chapter
          kicker="The Soil"
          title="Three nations gave her their names."
          accent={bone.accent}
          ink={bone.ink}
          media={
            <OffsetFigure
              image={FAMILY.heritage.ids[0]}
              alt="Brewing traditional African beer in a clay pot, in Xhosa beadwork"
              caption="The beer takes days and cannot be hurried. Neither could any of this."
              bleed="left"
              ratio="4 / 5"
            />
          }
        >
          <p>
            Ugandan father, Xhosa-Sotho mother, five ancestral clans — Nsenene, Hlubi, Msimanga, Thabizolo,
            Tshawe. Each one handed down a principle rather than an heirloom: lead through people, adapt and
            endure, heal at the root, build foundations that hold, share what you make.
          </p>
          <p>
            She has brewed the beer in the clay pot. She has stood at the top of Sani Pass in a Basotho blanket
            with the whole country underneath her. These are not costumes she visits on a Sunday — they are the
            operating system underneath everything else on this website.
          </p>
          <Link
            href="/roots"
            className="inline-block border-b-2 pb-1 font-medium transition-opacity hover:opacity-70"
            style={{ borderColor: bone.accent, color: bone.ink }}
          >
            Nine generations, traced →
          </Link>
        </Chapter>

        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {FAMILY.lesotho.ids.slice(0, 4).map((id, i) => (
            <Reveal key={id} delay={i * 0.06}>
              <div className={i % 2 ? 'md:pt-10' : ''}>
                <OffsetFigure image={id} alt="The Lesotho highlands" ratio="3 / 4" bleed="none" parallax={false} />
              </div>
            </Reveal>
          ))}
        </div>
      </Ground>

      {/* ═══ BETWEEN THE LINES ═══════════════════════════════════════════════ */}
      <Ground ground="rose" className="px-6 py-24 md:py-28">
        <Chapter
          kicker="Between the Lines"
          title="And beneath all of it, a woman."
          accent={rose.accent}
          ink={rose.ink}
          flip
          media={
            <div className="grid grid-cols-2 gap-4">
              <OffsetFigure image={P('IMG_20250614_171644')} alt="On a sea wall at pastel dusk" ratio="3 / 4" bleed="none" parallax={false} />
              <div className="pt-10">
                <VideoTile id="nandas-videos-of-her/nanda-speaking-in-group" label="in a room of people" ratio="9 / 16" />
              </div>
            </div>
          }
        >
          <p>
            Away from the gowns and the syntax, she is someone who turns her back to the camera to face the sea;
            who tends roses and gardens and the people she loves; who cradles a puppy by a rural hearth and
            laughs at a table crowded with family.
          </p>
          <p>
            Three nations gave her their names and their poetry. She is the one they appointed to remember — and
            she remembers in verse, in colour, in code.
          </p>
        </Chapter>

        <div className="mx-auto max-w-3xl">
          <PullQuote accent={rose.accent} attribution="A reader she has never met">
            What an incredible journey you chronicled here — a fascinating footprint from girlhood into
            womanhood.
          </PullQuote>
          <Reveal>
            <Link
              href="/testimonials"
              className="inline-block border-b-2 pb-1 font-medium transition-opacity hover:opacity-70"
              style={{ borderColor: rose.accent, color: rose.ink }}
            >
              What readers wrote back →
            </Link>
          </Reveal>
        </div>
      </Ground>

      {/* ═══ CLOSE ═══════════════════════════════════════════════════════════ */}
      <Ground ground="midnight" image={FAMILY.editorial.ids[3]} veil={0.5} focus="center 22%" parallax className="px-6 py-28">
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="font-display font-bold italic leading-tight text-white" style={{ fontSize: 'clamp(2rem, 6vw, 3.75rem)' }}>
              Words, culture, code — all of it from the same hand.
            </h2>
            <div className="mt-10 flex flex-col flex-wrap justify-center gap-4 sm:flex-row">
              <Link href="/roots" className="rounded-full px-8 py-4 font-semibold text-white transition-transform hover:scale-105" style={{ background: '#C1292E' }}>
                Where she comes from
              </Link>
              <Link href="/gallery" className="rounded-full border px-8 py-4 font-semibold text-white transition-colors hover:border-[#C9943A] hover:text-[#C9943A]" style={{ borderColor: 'rgba(255,255,255,0.25)' }}>
                The gallery
              </Link>
              <Link href="/contact" className="rounded-full border px-8 py-4 font-semibold text-white transition-colors hover:border-[#C9943A] hover:text-[#C9943A]" style={{ borderColor: 'rgba(255,255,255,0.25)' }}>
                Get in touch
              </Link>
            </div>
          </Reveal>
        </div>
      </Ground>
    </main>
  );
}
