'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';

const P = (id: string) => `creativelynanda/nanda-portraits/${id}`;
const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}>
      {children}
    </motion.div>
  );
}

// A story chapter: image on one side, prose on the other (alternating).
function Chapter({
  kicker, title, children, img, alt, flip = false, ratio = 'aspect-[4/5]',
}: {
  kicker: string; title: string; children: React.ReactNode; img: string; alt: string; flip?: boolean; ratio?: string;
}) {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${flip ? 'md:[&>*:first-child]:order-2' : ''}`}>
        <FadeUp>
          <div className={`relative ${ratio} overflow-hidden rounded-xl ring-1 ring-[#C9943A]/20 shadow-2xl`}>
            <CldImage src={img} alt={alt} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" />
          </div>
        </FadeUp>
        <FadeUp delay={0.12}>
          <div>
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-[#C9943A] mb-4">{kicker}</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-[1.05]">{title}</h2>
            <div className="space-y-5 font-light text-white/75 leading-[1.9] md:text-lg">{children}</div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <main className="min-h-screen bg-[#0A1128] text-[#F5F0E8]">
      <div className="fixed inset-0 pointer-events-none opacity-[0.13] z-0" style={{ backgroundImage: GRAIN }} />

      {/* ═══ HERO ═══ */}
      <section className="relative -mt-20 h-[100dvh] min-h-[640px] w-full overflow-hidden">
        <CldImage src={P('IMG_20241107_161928')} alt="Nandawula Regine in profile, a bougainvillea bloom in her hair against a blue sky"
          fill priority sizes="100vw" className="object-cover object-[center_25%]" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,17,40,0.95) 0%, rgba(10,17,40,0.45) 40%, rgba(10,17,40,0.1) 68%, rgba(10,17,40,0) 88%)' }} />
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: GRAIN }} />
        <div className="relative z-10 flex h-full max-w-5xl mx-auto flex-col justify-end px-6 pb-24">
          <FadeUp>
            <p className="font-mono text-[11px] tracking-[0.35em] uppercase text-[#C9943A] mb-6">Poet · Performer · The poet who codes</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="font-display font-bold italic leading-[0.95] text-5xl md:text-7xl lg:text-[5rem]">
              Nandawula<br />Regine
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-6 max-w-xl font-light text-white/70 text-lg leading-relaxed">
              A woman who writes in roses and builds in code — from KuGompo City (formerly East London), out
              to the world, and always back to where she comes from.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ═══ TWO TONGUES — opening essay ═══ */}
      <section className="relative px-6 py-24 md:py-28">
        <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: GRAIN }} />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <FadeUp>
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-[#C9943A] mb-8">In her own words, more or less</p>
            <p className="font-display text-3xl md:text-[2.6rem] italic leading-[1.35] text-white/90">
              She learned to speak in two tongues — the language of longing, and the language of systems.
              One she was born into. The other she taught herself, at a modest desk, until the screen
              answered back.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ═══ THE POET ═══ */}
      <Chapter kicker="The Poet" title="It began with a notebook." img={P('IMG_20250926_163119')}
        alt="Nanda in a sunlit forest clearing">
        <p>
          Before the apps and the stages, there was a girl in KuGompo City who wrote things down. In 2021 she
          gathered the truest of them into a debut collection — <em>Inside Her Roses</em> — poems on womanhood,
          longing, healing, and the quiet ferocity of becoming.
        </p>
        <p>
          The book gave her a name to introduce herself by. It is still the centre of everything: the rose she
          keeps returning to, the softness she refuses to apologise for.
        </p>
        <Link href="/poetry/collection" className="inline-block border-b-2 border-[#E4572E] pb-1 font-medium text-white transition-colors hover:text-[#E4572E]">
          Read the collection →
        </Link>
      </Chapter>

      {/* ═══ THE STAGE ═══ */}
      <Chapter kicker="The Stage" title="Then the poem stood up and spoke." img={P('IMG_20250301_145301')}
        alt="Nanda mid-dance in Xhosa beadwork at the arts festival" flip>
        <p>
          Poetry, for her, was never only ink. It put on beadwork and found a microphone — spoken-word nights,
          the Mandela Bay Arts Festival, interviews carried out over Tru FM and Madiba Radio across the Eastern
          Cape.
        </p>
        <p>
          On stage the two halves of her meet: the writer and the performer, the tradition and the woman living
          inside it. She doesn&apos;t recite her culture. She wears it, and moves.
        </p>
      </Chapter>

      {/* ═══ THE TURN TO CODE ═══ */}
      <Chapter kicker="The Turn" title="She taught herself a second language." img={P('IMG_20260102_163300')}
        alt="A laptop open by a garden swing, long shadows">
        <p>
          Somewhere between the stages, she opened a laptop and refused to close it until it made sense. No
          bootcamp, no shortcut — a home desk, a rainbow of errors, and a stubbornness inherited from a clan
          whose motto calls its people <em>the pillar and the support-beam</em>.
        </p>
        <p>
          What came out was a company — <span className="text-white">Mirembe Muse</span> — and, inside a single
          year, eight production systems: AI tools, apps, real software for the continent, with paying clients
          to prove it. The poet had become an engineer without ever ceasing to be a poet.
        </p>
        <a href="https://mirembemuse.co.za" target="_blank" rel="noopener noreferrer"
          className="inline-block border-b-2 border-[#C9943A] pb-1 font-medium text-white transition-colors hover:text-[#C9943A]">
          See the work at Mirembe Muse ↗
        </a>
      </Chapter>

      {/* ═══ THE WOMAN ═══ */}
      <Chapter kicker="Between the Lines" title="And beneath all of it, a woman." img={P('IMG_20250614_171644')}
        alt="Nanda on a sea wall at pastel dusk" flip>
        <p>
          Away from the gowns and the syntax, she is someone who turns her back to the camera to face the sea;
          who tends roses and gardens and the people she loves; who cradles a puppy by a rural hearth and laughs
          at a table crowded with family.
        </p>
        <p>
          Three nations gave her their names and their poetry. She is the one they appointed to remember — and
          she remembers in verse, in colour, in code.
        </p>
      </Chapter>

      {/* ═══ CLOSE ═══ */}
      <section className="relative px-6 py-28" style={{ background: 'radial-gradient(120% 90% at 50% 0%, #241021 0%, #14102A 55%, #0A1128 100%)' }}>
        <div className="absolute inset-0 pointer-events-none opacity-25" style={{ backgroundImage: GRAIN }} />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <FadeUp>
            <h2 className="font-display text-4xl md:text-6xl font-bold italic leading-tight mb-8">
              Words, culture, code — all of it from the same hand.
            </h2>
            <div className="flex flex-col flex-wrap justify-center gap-4 sm:flex-row">
              <Link href="/roots" className="rounded-full bg-[#C1292E] px-8 py-4 font-semibold text-white transition-all hover:scale-105">
                Where she comes from
              </Link>
              <Link href="/gallery" className="rounded-full border border-white/25 px-8 py-4 font-semibold text-white transition-all hover:border-[#C9943A] hover:text-[#C9943A]">
                The gallery
              </Link>
              <Link href="/contact" className="rounded-full border border-white/25 px-8 py-4 font-semibold text-white transition-all hover:border-[#C9943A] hover:text-[#C9943A]">
                Get in touch
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
