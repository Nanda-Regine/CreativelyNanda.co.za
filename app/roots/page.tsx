'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';
import AmbientVideo from '@/components/media/AmbientVideo';
import { cldVideo, cldVideoPoster } from '@/lib/cloudinary';
import TexturedSection, { TEXTURES } from '@/components/ui/TexturedSection';

const CU = (id: string) => `creativelynanda/nanda-culture/${id}`;
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

export default function Roots() {
  return (
    <main className="min-h-screen bg-[#0A1128] text-[#F5F0E8]">

      {/* ═══ OPENER — heritage hero ══════════════════════════════════════════════ */}
      <section className="relative -mt-20 h-[100dvh] min-h-[640px] w-full overflow-hidden">
        <CldImage src={CU('IMG-20260620-WA0042')} alt="Nanda in a black Xhosa beaded ceremonial skirt on a mosaic mandala, wide sky"
          fill priority sizes="100vw" className="object-cover object-[center_28%]" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,17,40,0.95) 0%, rgba(10,17,40,0.5) 38%, rgba(10,17,40,0.15) 65%, rgba(10,17,40,0) 85%)' }} />
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: GRAIN }} />
        <div className="relative z-10 flex h-full max-w-5xl mx-auto flex-col justify-end px-6 pb-24">
          <FadeUp>
            <p className="font-mono text-[11px] tracking-[0.35em] uppercase text-[#C9943A] mb-6">Three nations · Nine generations · One voice</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="font-display text-white font-bold italic leading-[0.92] text-6xl md:text-8xl">Roots</h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-7 max-w-2xl font-light text-white/70 text-lg leading-relaxed">
              In Buganda you are never only yourself. To introduce yourself, you must name your father, his
              father, your clan, its totem, its motto — identity spoken aloud as genealogy. This is that
              introduction, made in full.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ═══ I. THE GRASSHOPPER — Nseenene (Buganda) ═════════════════════════════ */}
      <section className="relative px-6 py-24 md:py-28">
        <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: GRAIN }} />
        <div className="relative z-10 mx-auto max-w-5xl">
          <FadeUp>
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-[#C9943A] mb-3">House I · Buganda, Uganda</p>
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-2">Ennyonyi ya Nseenene</h2>
            <p className="font-display text-xl md:text-2xl italic text-white/60 mb-8">The clan of the grasshopper</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-start">
              <div className="space-y-5 text-white/75 leading-[1.85] md:text-lg font-light">
                <p>
                  The Nseenene take the grasshopper as their totem — not only a sign but a season. Twice a
                  year, when the rains come, the swarms rise over Buganda and are gathered: a delicacy, a
                  harvest, a small green promise of abundance. To this clan you do not eat your own totem.
                  You honour it.
                </p>
                <p>
                  The clan remembers its beginning as a migration. <span className="text-white">Kiroboozi</span>,
                  a herdsman on the slopes of Mugamba Hill, had three children who drove their cattle down
                  through Bwera into Ggomba: Buyonga, Kalibbala — and their sister,
                  <span className="text-[#E4572E]"> Nnandawula</span>. A woman remembered by name in a line
                  that counts itself through fathers. Her name did not end. It was carried, and carried, and
                  given again — until it arrived here, spelled the way I spell it.
                </p>
                <p>
                  Through Buyonga's daughter <span className="text-white">Wannyana</span>, mother of
                  <span className="text-white"> Kabaka Kimera</span>, the third king of Buganda, the clan is
                  woven into the founding of a throne — which is why our praise still calls on
                  <em> Nakimera</em>, of Kimera. And the name I carry, <span className="text-white">Kagwa</span>,
                  is the name of <span className="text-white">Sir Apolo Kagwa</span> — Katikkiro of Buganda for
                  thirty-six years, regent to a child-king, and the first man to write our history down so it
                  could not be lost. The colossus of Buganda.
                </p>
              </div>
              <div className="rounded-2xl border border-[#C9943A]/25 bg-white/[0.03] p-7">
                <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#C9943A] mb-4">Omubala · the clan motto</p>
                <p className="font-display text-2xl md:text-3xl italic leading-snug text-white mb-2">
                  “Ggwe mpagi, ggwe luwaga;<br />Nakimera muka Ssuuna.”
                </p>
                <p className="text-white/55 text-sm leading-relaxed mb-6">
                  “You are the pillar, you are the support-beam.” The ones who hold the house up.
                </p>
                <div className="h-px w-full bg-[#C9943A]/20 mb-5" />
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between"><dt className="text-white/45">Totem</dt><dd className="text-white/80">Nseenene · the grasshopper</dd></div>
                  <div className="flex justify-between"><dt className="text-white/45">Clan head</dt><dd className="text-white/80">Mugalula</dd></div>
                  <div className="flex justify-between"><dt className="text-white/45">Seats</dt><dd className="text-white/80">Kisozi · Lweza, Busujju</dd></div>
                </dl>
                <p className="mt-6 text-white/50 text-[13px] leading-relaxed italic">
                  And in our own telling: I come from the line of Kabombola, who reigns from Kyakasuku; from
                  Segoma in Kayenje. Names the internet does not keep — only the family does.
                </p>
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3">
              {[
                { id: CU('IMG_20260719_181316'), alt: 'In African print by a reflecting pond, windswept palms' },
                { id: CU('IMG_20260719_181344'), alt: 'Honey braids and silver beads in golden light' },
                { id: P('IMG-20260620-WA0043'), alt: 'A regal beaded gown beneath a gold orb' },
              ].map((im) => (
                <div key={im.id} className="relative aspect-[3/4] overflow-hidden rounded-lg ring-1 ring-[#C9943A]/20">
                  <CldImage src={im.id} alt={im.alt} fill sizes="(max-width:640px) 50vw, 33vw" className="object-cover" />
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══ II. THE ROYAL HOUSE — amaTshawe (Xhosa) — umqombothi video ═════════ */}
      <section className="relative min-h-[100dvh] w-full overflow-hidden">
        <AmbientVideo src={cldVideo('nanda-culture/nanda-making-african-beer')}
          poster={cldVideoPoster('nanda-culture/nanda-making-african-beer', 2)}
          objectPosition="center" alt="Nanda brewing umqombothi in Xhosa beaded regalia" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,17,40,0.72) 0%, rgba(10,17,40,0.86) 55%, rgba(10,17,40,0.95) 100%)' }} />
        <div className="absolute inset-0 pointer-events-none opacity-25" style={{ backgroundImage: GRAIN }} />
        <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-5xl flex-col justify-center px-6 py-24">
          <FadeUp>
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-[#C9943A] mb-3">House II · amaXhosa, South Africa</p>
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-2">AmaTshawe</h2>
            <p className="font-display text-xl md:text-2xl italic text-white/70 mb-8">The founding royal house</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="max-w-2xl space-y-5 text-white/80 leading-[1.85] md:text-lg font-light">
              <p>
                Every Xhosa king traces back to one ancestor: <span className="text-white">Tshawe</span>. And
                the way he came to the throne is the part I love. He was not the eldest, not the Great House
                heir — he was the junior son. When their father died, his brothers Cirha and Jwarha held the
                senior claims. Tshawe took warriors, met them in the field, and <em>won</em> the kingship —
                then held it for his line forever. The oldest royal house in South Africa begins with a
                younger child who refused to be minor.
              </p>
              <p>
                This house keeps its memory two ways. The <span className="text-white">isiduko</span> — the
                clan name — passes from father to child and matters more than any surname; to know a person's
                isiduko is to know their ancestors and be able to praise them. And the
                <span className="text-white"> imbongi</span>, the praise-poet, walks beside the chief and
                recites the deeds of the house out loud. History, kept as performed poetry.
              </p>
              <p className="text-white/90">
                I was born into a nation that appoints a poet to remember the family — and then I became one.
              </p>
            </div>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="mt-10 grid max-w-2xl grid-cols-3 gap-4">
              {[
                { id: P('IMG_20250301_144326'), alt: 'Seated in Xhosa beadwork on a mosaic plaza, holding the book' },
                { id: P('IMG_20250301_145301'), alt: 'Mid-dance in beadwork at the arts festival' },
                { id: P('IMG_20250301_153220'), alt: 'A warm duo in regalia at the festival' },
              ].map((im) => (
                <div key={im.id} className="relative aspect-[3/4] overflow-hidden rounded-lg ring-1 ring-[#C9943A]/25">
                  <CldImage src={im.id} alt={im.alt} fill sizes="(max-width:640px) 33vw, 200px" className="object-cover" />
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══ III. THE SCATTERED KINGDOM — amaHlubi / Msimanga ═══════════════════ */}
      <section className="relative px-6 py-24 md:py-28">
        <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: GRAIN }} />
        <div className="relative z-10 mx-auto max-w-5xl">
          <FadeUp>
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-[#C9943A] mb-3">House III · amaHlubi, South Africa</p>
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-2">KwaMsimanga</h2>
            <p className="font-display text-xl md:text-2xl italic text-white/60 mb-8">The scattered kingdom</p>
          </FadeUp>

          <div className="grid gap-10 md:grid-cols-[1fr_1.1fr] md:items-center">
            <FadeUp>
              <div className="space-y-5 text-white/75 leading-[1.85] md:text-lg font-light">
                <p>
                  The Msimanga are amaHlubi — an Nguni people old enough to count kings back to the 1300s,
                  down to <span className="text-white">Langalibalele</span>. Then, around 1818, the
                  <span className="text-white"> Mfecane</span> — the great scattering. The Hlubi kingdom was
                  shattered; its people fled north, west, into other nations, into refuge. That is why a
                  Msimanga can be found today in South Africa, Botswana, Lesotho, Zimbabwe. The spread of the
                  clan across four countries is a fingerprint of that flight — and my own life across nations
                  is the same story, still moving.
                </p>
                <p>
                  Its praises are real, and they are poetry: the one who <em>descends in a grain-basket while
                  commoners come down on foot</em> — an image of rank folded into a single line, spoken to
                  greet and to honour.
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={0.12}>
              <div className="rounded-2xl border border-[#C9943A]/25 bg-white/[0.03] p-7">
                <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#C9943A] mb-4">Izithakazelo · the clan praises</p>
                <p className="font-display text-xl md:text-2xl italic leading-relaxed text-white">
                  Thabizolo, Nonkosi, Mlotshwa,<br />
                  wena owehla ngesilulu<br />
                  abafokazane behla ngezinyawo,<br />
                  Pembe kaLokothwayo,<br />
                  <span className="text-[#E4572E]">Ngelengele!</span>
                </p>
                <p className="mt-5 text-white/50 text-[13px] leading-relaxed">
                  Praise-names carried, not translated — the way they are meant to be spoken. isiHlubi, the
                  language they belong to, is endangered now; to say them at all is to keep them alive.
                </p>
              </div>
            </FadeUp>
          </div>

          {/* heritage triptych */}
          <FadeUp delay={0.15}>
            <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3">
              {[
                { id: P('IMG_20250616_095223'), alt: 'Between two elders in Xhosa dress, winter light and laughter' },
                { id: CU('IMG-20260620-WA0016'), alt: 'Wrapped in a Basotho blanket and grass hat, mountain beyond' },
                { id: CU('IMG-20260620-WA0014'), alt: 'Brewing umqombothi in a red-and-black Xhosa beaded collar' },
                { id: CU('IMG-20260620-WA0015'), alt: 'Brewing umqombothi together, hands in the grain' },
                { id: P('IMG_20250424_100200'), alt: 'A blanket coat gazing over the highland pass' },
                { id: CU('IMG_20260719_181445'), alt: 'An embrace with an elder in blue Sotho beadwork' },
              ].map((im) => (
                <div key={im.id} className="relative aspect-[3/4] overflow-hidden rounded-lg ring-1 ring-[#C9943A]/20">
                  <CldImage src={im.id} alt={im.alt} fill sizes="(max-width:640px) 50vw, 33vw" className="object-cover" />
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══ CLOSE — the introduction, made whole ══════════════════════════════ */}
      <TexturedSection texture={TEXTURES.regalNavy} tone="rose" className="px-6 py-28">
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <FadeUp>
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-[#C9943A] mb-8">And so, the introduction</p>
            <p className="font-display text-2xl md:text-4xl italic leading-[1.4] text-white/90">
              I am of the grasshopper and the throne of Buganda; of the royal house of Tshawe; of the
              scattered kingdom of the Hlubi. Three nations gave me their names and their poetry.
              I am the one they appointed to remember — and I remember in verse.
            </p>
            <p className="mt-8 font-mono text-[11px] tracking-[0.28em] uppercase text-white/40">
              Nseenene · AmaTshawe · Msimanga · Nine generations documented
            </p>
            <div className="mx-auto my-10 h-px w-16 bg-[#C9943A]/50" />
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/poetry/collection" className="rounded-full bg-[#C1292E] px-8 py-4 font-semibold text-white transition-all hover:scale-105">
                Read the poetry it made
              </Link>
              <Link href="/gallery" className="rounded-full border border-white/25 px-8 py-4 font-semibold text-white transition-all hover:border-[#C9943A] hover:text-[#C9943A]">
                See the life →
              </Link>
            </div>
          </FadeUp>
        </div>
        <p className="relative z-10 mx-auto mt-16 max-w-2xl text-center text-[11px] leading-relaxed text-white/30">
          Clan histories drawn from the Buganda Kingdom, South African History Online, the Ulwazi Programme,
          and family record. Verified histories and praise-poetry; the family's own line and names are held
          as family memory.
        </p>
      </TexturedSection>
    </main>
  );
}
