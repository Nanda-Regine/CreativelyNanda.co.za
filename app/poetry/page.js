'use client';

export default function Poetry() {
  return (
    <div className="page-transition min-h-screen bg-gradient-to-br from-cherry-dark via-navy to-navy-dark py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-reveal">
          <h1 className="font-display text-6xl md:text-8xl font-bold text-beige mb-6">
            Poetry & <span className="text-cherry-light">Performances</span>
          </h1>
          <p className="text-xl text-beige/70">
            Words that move. Performances that inspire. Stories that heal.
          </p>
        </div>

        {/* Featured Book */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-white/5 backdrop-blur rounded-3xl p-8 border border-beige/10 text-reveal" style={{ '--index': 1 }}>
            <div className="text-8xl mb-6 text-center">📖</div>
            <h2 className="font-display text-5xl font-bold text-beige mb-4 text-center">
              Inside Her Roses
            </h2>
            <p className="text-beige/80 text-center mb-6 text-lg">
              Poetry Collection • Published Oct 2021
            </p>
            <p className="text-beige/70 leading-relaxed mb-6">
              A journey through love, identity, healing, and Black womanhood. 
              Available worldwide through Amazon, Barnes & Noble, and independent bookstores.
            </p>
            <div className="flex gap-4 justify-center">
              <button className="px-6 py-3 bg-cherry text-white rounded-full font-medium hover:bg-cherry-light transition-all">
                Buy on Amazon
              </button>
              <button className="px-6 py-3 border-2 border-beige text-beige rounded-full font-medium hover:bg-beige hover:text-navy transition-all">
                Barnes & Noble
              </button>
            </div>
          </div>

          <div className="space-y-6 text-reveal" style={{ '--index': 2 }}>
            <div className="p-6 bg-cherry/20 backdrop-blur rounded-2xl border border-cherry/30">
              <h3 className="font-display text-2xl font-bold text-beige mb-3">🎬 TV Feature</h3>
              <p className="text-beige/80">
                Featured poet on South African TV series <span className="font-bold">"Gqeberha: The Empire"</span> (2023)
              </p>
            </div>

            <div className="p-6 bg-white/5 backdrop-blur rounded-2xl border border-beige/10">
              <h3 className="font-display text-2xl font-bold text-beige mb-3">📚 Book Launch</h3>
              <p className="text-beige/80">
                Self-funded and organized book launch combining poetry workshop with dining experience
              </p>
            </div>

            <div className="p-6 bg-cherry/20 backdrop-blur rounded-2xl border border-cherry/30">
              <h3 className="font-display text-2xl font-bold text-beige mb-3">🎤 Community</h3>
              <p className="text-beige/80">
                Organized and hosted multiple poetry open mic events, creating platforms for emerging voices
              </p>
            </div>

            <div className="p-6 bg-white/5 backdrop-blur rounded-2xl border border-beige/10">
              <h3 className="font-display text-2xl font-bold text-beige mb-3">✍️ Workshops</h3>
              <p className="text-beige/80">
                Developed poetry workshop framework providing structured entry point for aspiring writers
              </p>
            </div>
          </div>
        </div>

        {/* Future Project */}
        <div className="p-8 bg-gradient-to-r from-beige/10 to-cherry/10 backdrop-blur rounded-3xl border border-beige/20 text-reveal" style={{ '--index': 3 }}>
          <h3 className="font-display text-4xl font-bold text-beige mb-4">What's Next</h3>
          <p className="text-xl text-beige/80 leading-relaxed mb-4">
            Currently developing <span className="text-cherry font-bold">PoetryTube</span> — 
            an interactive poetry and spoken word platform that merges traditional writing with 
            digital innovation.
          </p>
          <p className="text-lg text-beige/70">
            Because poetry deserves its own space in the digital world. Coming soon.
          </p>
        </div>

        {/* Philosophy */}
        <div className="mt-16 text-center text-reveal" style={{ '--index': 4 }}>
          <blockquote className="font-display text-3xl md:text-4xl font-bold text-beige/90 leading-relaxed italic">
            "Words are code for the soul. <br/>
            Poetry is the algorithm of feeling."
          </blockquote>
        </div>
      </div>
    </div>
  );
}