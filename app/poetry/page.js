'use client';
import { useState, useRef } from 'react';

export default function Poetry() {
  const [activeVideo, setActiveVideo] = useState(null);
  const [expandedReview, setExpandedReview] = useState(null);
  const scrollRef = useRef(null);

  // Platform links
  const platforms = [
    { name: 'Wattpad', url: 'https://www.wattpad.com/user/NandaRegine', icon: '📖' },
    { name: 'AllPoetry', url: 'https://allpoetry.com/Nanda_Regine', icon: '✍️' },
    { name: 'WritersCafe', url: 'https://www.writerscafe.org/NandaRegine', icon: '☕' },
    { name: 'Instagram', url: 'https://instagram.com/nanda.regine', icon: '📸' },
    { name: 'PoemHunter', url: 'https://www.poemhunter.com/nanda-regine/', icon: '🎯' },
    { name: 'Poetry.com', url: 'https://www.poetry.com/NandaRegine', icon: '🌟' },
  ];

  // Store logos/names where book is available
  const bookStores = [
    { name: 'Amazon' },
    { name: 'Apple Books' },
    { name: 'Nook' },
    { name: 'Kobo' },
    { name: 'Thalia' },
    { name: 'Indigo' },
    { name: 'Mondadori' },
    { name: 'bol.de' },
  ];

  // Reviews data (10 reviews)
  const reviews = [
    { id: 1, image: '/assets/reviews/review-1.jpg' },
    { id: 2, image: '/assets/reviews/review-2.jpg' },
    { id: 3, image: '/assets/reviews/review-3.jpg' },
    { id: 4, image: '/assets/reviews/review-4.jpg' },
    { id: 5, image: '/assets/reviews/review-5.jpg' },
    { id: 6, image: '/assets/reviews/review-6.jpg' },
    { id: 7, image: '/assets/reviews/review-7.jpg' },
    { id: 8, image: '/assets/reviews/review-8.jpg' },
    { id: 9, image: '/assets/reviews/review-9.jpg' },
    { id: 10, image: '/assets/reviews/review-10.jpg' },
  ];

  // Performance Videos (4)
  const performanceVideos = [
    {
      id: 'nmb-perform',
      title: 'NMB Performance',
      cover: '/assets/performance/nmb-perform-vid-cover.jpg',
      embedUrl: 'https://drive.google.com/file/d/1hQatcwjUYIqDcYynf_oyA8VO-i0PWDRR/preview'
    },
    {
      id: 'poetry-night',
      title: 'Poetry Night',
      cover: '/assets/performance/poetry-night-perform-vid-cover.jpg',
      embedUrl: 'https://drive.google.com/file/d/1rM5ZRctQttTxGopEWDTkzsxN--876BBY/preview'
    },
    {
      id: 'performance-3',
      title: 'Spoken Word',
      cover: '/assets/performance/performance-vid-3-cover.jpg',
      embedUrl: 'https://drive.google.com/file/d/10HvShdmM0GLekvcNFLj3IY-JHtISS9-r/preview'
    },
    {
      id: 'cinema-garden',
      title: 'Garden Cinema',
      cover: '/assets/performance/cinema-vid-garden-cover.jpg',
      embedUrl: 'https://drive.google.com/file/d/1ibbHOAYpYjLP5GSwj6Nof281V_9t9JZd/preview'
    },
  ];

  // Radio Interview Videos (2)
  const radioVideos = [
    {
      id: 'madiba-radio',
      title: 'Madiba FM Interview',
      station: 'Madiba FM',
      cover: '/assets/radio/madiba-radio-vid-cover.jpg',
      embedUrl: 'https://drive.google.com/file/d/13jEDG0UZKJuA3NbmMfgi0JRzzDtTIMRU/preview'
    },
    {
      id: 'tru-fm',
      title: 'TRU FM Interview',
      station: 'TRU FM',
      cover: '/assets/radio/tru-fm-vid-cover.jpg',
      embedUrl: 'https://drive.google.com/file/d/1GgGPYiSbFLOHettVbr8GEh9qP_PU2Yn2/preview'
    },
  ];

  // Scroll functions for reviews
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="page-transition min-h-screen bg-navy overflow-hidden">
      
      {/* ===== HERO: MAGAZINE COVER STYLE ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-[#0D1B3C] to-navy" />
        
        {/* Decorative shapes */}
        <div className="absolute top-20 right-10 w-[400px] h-[400px] bg-gradient-to-bl from-cherry/20 via-cherry/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-[300px] h-[300px] bg-gradient-to-tr from-beige/10 to-transparent rounded-full blur-3xl" />
        
        {/* Floating decorative text */}
        <div className="absolute top-32 left-8 lg:left-20 hidden lg:block">
          <span className="font-display text-[120px] xl:text-[180px] font-bold text-white/[0.03] leading-none">
            POET
          </span>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Left: Editorial Text */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              {/* Magazine label */}
              <div className="inline-flex items-center gap-3 mb-8">
                <div className="w-12 h-px bg-cherry" />
                <span className="text-cherry text-sm font-medium tracking-[0.3em] uppercase">
                  Featured Artist
                </span>
              </div>

              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-beige leading-[0.9] mb-6">
                Poetry &
                <span className="block text-cherry">Performance</span>
              </h1>

              <p className="font-display text-xl lg:text-2xl text-beige/70 leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
                Words that move. Performances that inspire. 
                Stories that <span className="text-cherry italic">heal</span>.
              </p>

              {/* Quick stats */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-8 mb-10">
                <div className="text-center lg:text-left">
                  <div className="font-display text-4xl font-bold text-cherry">1</div>
                  <div className="text-beige/60 text-sm">Published Book</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="font-display text-4xl font-bold text-cherry">2</div>
                  <div className="text-beige/60 text-sm">Radio Features</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="font-display text-4xl font-bold text-cherry">1</div>
                  <div className="text-beige/60 text-sm">TV Appearance</div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a 
                  href="https://books2read.com/Nrkk-insideherroses"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-cherry text-white rounded-full font-medium hover:bg-cherry-dark transition-all hover:scale-105 inline-flex items-center justify-center gap-2"
                >
                  <span>Get the Book</span>
                  <span>→</span>
                </a>
                <a 
                  href="#performances"
                  className="px-8 py-4 border-2 border-beige/40 text-beige rounded-full font-medium hover:bg-beige hover:text-navy transition-all inline-flex items-center justify-center"
                >
                  Watch Performances
                </a>
              </div>
            </div>

            {/* Right: Cohesive Asymmetric Photo Cluster */}
            <div className="relative flex justify-center order-1 lg:order-2">
              <div className="relative w-[320px] h-[420px] sm:w-[380px] sm:h-[480px] lg:w-[480px] lg:h-[560px]">
                
                {/* Main large image - asymmetric blob, anchors the cluster */}
                <div 
                  className="absolute right-0 top-0 w-[65%] h-[70%] overflow-hidden shadow-2xl z-20"
                  style={{ 
                    borderRadius: '30% 70% 50% 50% / 50% 40% 60% 50%',
                  }}
                >
                  <img 
                    src="/assets/poetry-book/book-picture.jpeg"
                    alt="Inside Her Roses Book Cover"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent" />
                </div>

                {/* Second image - overlaps main, bottom left */}
                <div 
                  className="absolute left-0 bottom-[15%] w-[55%] h-[50%] overflow-hidden shadow-xl z-30"
                  style={{ 
                    borderRadius: '60% 40% 50% 50% / 40% 60% 40% 60%',
                  }}
                >
                  <img 
                    src="/assets/poetry-book/book-picture-2.jpeg"
                    alt="Nanda in garden with book"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-cherry/10 to-transparent" />
                </div>

                {/* Third image - small accent, top left */}
                <div 
                  className="absolute left-[5%] top-[10%] w-[35%] h-[30%] overflow-hidden shadow-lg z-10"
                  style={{ 
                    borderRadius: '50% 50% 40% 60% / 60% 40% 60% 40%',
                  }}
                >
                  <img 
                    src="/assets/poetry-book/book-picture-3.jpeg"
                    alt="Book launch moment"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Fourth image - small circle, bottom right accent */}
                <div 
                  className="absolute right-[5%] bottom-0 w-[30%] h-[25%] overflow-hidden shadow-lg z-40 border-4 border-navy"
                  style={{ 
                    borderRadius: '40% 60% 60% 40% / 60% 40% 60% 40%',
                  }}
                >
                  <img 
                    src="/assets/performance/nmb-perform-1.jpg"
                    alt="NMB Performance"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Decorative background blob */}
                <div 
                  className="absolute -right-8 -top-8 w-[70%] h-[75%] bg-gradient-to-br from-cherry/20 via-cherry/5 to-transparent -z-10"
                  style={{ borderRadius: '40% 60% 60% 40% / 50% 50% 50% 50%' }}
                />
                
                {/* Small decorative accent */}
                <div 
                  className="absolute left-[20%] bottom-[5%] w-16 h-16 bg-cherry/30 -z-10"
                  style={{ borderRadius: '60% 40% 50% 50% / 50% 60% 40% 50%' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-px h-12 bg-gradient-to-b from-beige/40 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ===== BOOK FEATURE SECTION ===== */}
      <section className="relative py-24 px-6 bg-beige overflow-hidden">
        {/* Decorative corner blob */}
        <div 
          className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-bl from-cherry/10 to-transparent"
          style={{ borderRadius: '0 0 0 100%' }}
        />

        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="flex items-center gap-4 mb-12">
            <span className="text-cherry text-sm font-medium tracking-[0.2em] uppercase">The Book</span>
            <div className="flex-1 h-px bg-navy/10" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Book info */}
            <div>
              <h2 className="font-display text-5xl lg:text-6xl font-bold text-navy mb-6">
                Inside Her <span className="text-cherry">Roses</span>
              </h2>
              
              <p className="text-xl text-navy/70 leading-relaxed mb-6">
                A journey through love, identity, healing, and Black womanhood. 
                This collection blooms with raw honesty, capturing moments of 
                vulnerability and strength that resonate with the soul.
              </p>

              {/* Main purchase button */}
              <a 
                href="https://books2read.com/Nrkk-insideherroses"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-navy text-beige rounded-full font-medium hover:bg-navy-light transition-all hover:scale-105 mb-8"
              >
                <span>Find Your Store</span>
                <span>→</span>
              </a>

              {/* Store availability - small logos */}
              <div>
                <p className="text-navy/50 text-sm mb-3">Available at:</p>
                <div className="flex flex-wrap gap-2">
                  {bookStores.map((store) => (
                    <div 
                      key={store.name}
                      className="px-3 py-1.5 bg-white/60 rounded-full text-xs font-medium text-navy/70 hover:bg-white hover:text-navy transition-colors cursor-default"
                      title={store.name}
                    >
                      {store.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Achievements cards */}
            <div className="space-y-4">
              <div 
                className="bg-white p-6 shadow-lg hover:-translate-y-1 transition-transform"
                style={{ borderRadius: '30px 10px 30px 10px' }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-cherry/10 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-2xl">🎬</span>
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-navy mb-1">TV Feature</h3>
                    <p className="text-navy/60">Featured poet on "Gqeberha: The Empire" — South African television series (2023)</p>
                  </div>
                </div>
              </div>

              <div 
                className="bg-white p-6 shadow-lg hover:-translate-y-1 transition-transform"
                style={{ borderRadius: '10px 30px 10px 30px' }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-cherry/10 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-2xl">📻</span>
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-navy mb-1">Radio Interviews</h3>
                    <p className="text-navy/60">In-depth conversations on Madiba FM and TRU FM about poetry, creativity, and entrepreneurship</p>
                  </div>
                </div>
              </div>

              <div 
                className="bg-white p-6 shadow-lg hover:-translate-y-1 transition-transform"
                style={{ borderRadius: '30px 10px 30px 10px' }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-cherry/10 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-2xl">🎤</span>
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-navy mb-1">Live Performances</h3>
                    <p className="text-navy/60">Open mic events, poetry workshops, and spoken word performances across Port Elizabeth</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== VIDEO PERFORMANCES (4 videos) ===== */}
      <section id="performances" className="relative py-24 px-6 bg-navy overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cherry to-transparent" />
        
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-cherry" />
              <span className="text-cherry text-sm font-medium tracking-[0.3em] uppercase">Watch</span>
              <div className="w-12 h-px bg-cherry" />
            </div>
            <h2 className="font-display text-5xl lg:text-6xl font-bold text-beige mb-4">
              Live <span className="text-cherry">Performances</span>
            </h2>
            <p className="text-beige/60 text-lg max-w-2xl mx-auto">
              Experience the energy of spoken word and creative expression.
            </p>
          </div>

          {/* Video grid - 4 videos */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {performanceVideos.map((video, index) => (
              <div 
                key={video.id}
                className="group cursor-pointer"
                onClick={() => setActiveVideo(video)}
              >
                <div 
                  className="relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  style={{ 
                    borderRadius: index % 2 === 0 ? '30px 10px 30px 10px' : '10px 30px 10px 30px',
                    height: '320px'
                  }}
                >
                  <img 
                    src={video.cover}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/40 to-transparent" />
                  
                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 bg-cherry/90 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-cherry transition-all shadow-xl">
                      <span className="text-white text-xl ml-1">▶</span>
                    </div>
                  </div>
                  
                  {/* Label */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-cherry text-xs font-medium tracking-wider uppercase">Performance</span>
                    <h3 className="font-display text-lg font-bold text-white mt-1">{video.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RADIO INTERVIEWS SECTION ===== */}
      <section className="relative py-24 px-6 bg-gradient-to-b from-beige to-beige-light overflow-hidden">
        {/* Decorative blob */}
        <div 
          className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cherry/10 to-transparent blur-3xl"
        />

        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-cherry" />
              <span className="text-cherry text-sm font-medium tracking-[0.3em] uppercase">On Air</span>
              <div className="w-12 h-px bg-cherry" />
            </div>
            <h2 className="font-display text-5xl lg:text-6xl font-bold text-navy mb-4">
              Radio <span className="text-cherry">Interviews</span>
            </h2>
            <p className="text-navy/60 text-lg max-w-2xl mx-auto">
              In-depth conversations about poetry, creativity, and the journey of a published author.
            </p>
          </div>

          {/* Radio content grid */}
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Radio photos in cool shapes */}
            <div className="lg:col-span-4 relative h-[400px] hidden lg:block">
              {/* Photo 1 - larger, organic shape */}
              <div 
                className="absolute top-0 left-0 w-[80%] h-[60%] overflow-hidden shadow-xl"
                style={{ borderRadius: '50% 50% 30% 70% / 60% 40% 60% 40%' }}
              >
                <img 
                  src="/assets/radio/madiba-radio-1.jpg"
                  alt="Madiba FM Radio Interview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent" />
              </div>
              
              {/* Photo 2 - smaller, offset */}
              <div 
                className="absolute bottom-0 right-0 w-[65%] h-[50%] overflow-hidden shadow-xl border-4 border-beige"
                style={{ borderRadius: '40% 60% 50% 50% / 50% 50% 50% 50%' }}
              >
                <img 
                  src="/assets/radio/madiba-radio-2.jpg"
                  alt="Radio Interview Moment"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Decorative element */}
              <div 
                className="absolute top-[40%] left-[60%] w-20 h-20 bg-cherry/20 -z-10"
                style={{ borderRadius: '60% 40% 50% 50% / 50% 60% 40% 50%' }}
              />
            </div>

            {/* Right: Video cards */}
            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-6">
              {radioVideos.map((video, index) => (
                <div 
                  key={video.id}
                  className="group cursor-pointer"
                  onClick={() => setActiveVideo(video)}
                >
                  <div 
                    className="relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-navy"
                    style={{ 
                      borderRadius: index === 0 ? '40px 12px 40px 12px' : '12px 40px 12px 40px',
                      height: '280px'
                    }}
                  >
                    <img 
                      src={video.cover}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/50 to-transparent" />
                    
                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-cherry/90 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-cherry transition-all shadow-xl">
                        <span className="text-white text-2xl ml-1">▶</span>
                      </div>
                    </div>
                    
                    {/* Station badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 text-navy text-xs font-bold rounded-full">
                        📻 {video.station}
                      </span>
                    </div>
                    
                    {/* Label */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="text-cherry text-xs font-medium tracking-wider uppercase">Interview</span>
                      <h3 className="font-display text-xl font-bold text-white mt-1">{video.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile radio photos */}
          <div className="lg:hidden mt-12 grid grid-cols-2 gap-4">
            <div 
              className="overflow-hidden shadow-lg h-48"
              style={{ borderRadius: '30px 10px 30px 10px' }}
            >
              <img 
                src="/assets/radio/madiba-radio-1.jpg"
                alt="Madiba FM Radio Interview"
                className="w-full h-full object-cover"
              />
            </div>
            <div 
              className="overflow-hidden shadow-lg h-48"
              style={{ borderRadius: '10px 30px 10px 30px' }}
            >
              <img 
                src="/assets/radio/madiba-radio-2.jpg"
                alt="Radio Interview Moment"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {activeVideo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/95 backdrop-blur-sm"
          onClick={() => setActiveVideo(null)}
        >
          <div 
            className="relative w-full max-w-4xl bg-navy rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            >
              ✕
            </button>
            
            {/* Video embed */}
            <div className="aspect-video">
              <iframe
                src={activeVideo.embedUrl}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
            
            {/* Video info */}
            <div className="p-6">
              <span className="text-cherry text-sm font-medium tracking-wider uppercase">
                {activeVideo.station ? 'Radio Interview' : 'Performance'}
              </span>
              <h3 className="font-display text-2xl font-bold text-beige mt-1">{activeVideo.title}</h3>
            </div>
          </div>
        </div>
      )}

      {/* ===== HORIZONTAL SCROLL REVIEWS - EXPANDABLE ===== */}
      <section className="relative py-24 bg-navy overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-cherry text-sm font-medium tracking-[0.2em] uppercase">Reader Reviews</span>
                <div className="w-12 h-px bg-beige/20" />
              </div>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-beige">
                What Readers <span className="text-cherry">Say</span>
              </h2>
              <p className="text-beige/60 mt-2 text-sm">Tap on a review to expand</p>
            </div>
            
            {/* Scroll buttons */}
            <div className="flex gap-3">
              <button 
                onClick={() => scroll('left')}
                className="w-12 h-12 rounded-full border border-beige/30 text-beige hover:bg-beige hover:text-navy transition-all flex items-center justify-center"
                aria-label="Scroll left"
              >
                ←
              </button>
              <button 
                onClick={() => scroll('right')}
                className="w-12 h-12 rounded-full bg-cherry text-white hover:bg-cherry-dark transition-all flex items-center justify-center"
                aria-label="Scroll right"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable reviews container */}
        <div 
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-6 pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Left spacer */}
          <div className="shrink-0 w-0 lg:w-[calc((100vw-1280px)/2)]" />
          
          {reviews.map((review, index) => (
            <div 
              key={review.id}
              className="shrink-0 snap-center cursor-pointer"
              onClick={() => setExpandedReview(review)}
            >
              <div 
                className="relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white"
                style={{ 
                  borderRadius: index % 2 === 0 ? '20px 8px 20px 8px' : '8px 20px 8px 20px',
                  width: '200px',
                  height: '200px'
                }}
              >
                <img 
                  src={review.image}
                  alt={`Reader review ${review.id}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Expand hint overlay */}
                <div className="absolute inset-0 bg-navy/0 hover:bg-navy/30 transition-colors flex items-center justify-center">
                  <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity shadow-lg">
                    <span className="text-navy text-lg">↗</span>
                  </div>
                </div>
                
                {/* Review number */}
                <div className="absolute top-3 left-3 w-7 h-7 bg-cherry text-white rounded-full flex items-center justify-center text-xs font-bold shadow">
                  {review.id}
                </div>
              </div>
            </div>
          ))}
          
          {/* Right spacer */}
          <div className="shrink-0 w-6 lg:w-[calc((100vw-1280px)/2)]" />
        </div>

        {/* Scroll hint */}
        <div className="text-center mt-6 text-beige/40 text-sm">
          <span>← Swipe to explore all reviews →</span>
        </div>
      </section>

      {/* Expanded Review Modal */}
      {expandedReview && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/90 backdrop-blur-sm"
          onClick={() => setExpandedReview(null)}
        >
          <div 
            className="relative max-w-2xl max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
              onClick={() => setExpandedReview(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-navy/80 hover:bg-navy rounded-full flex items-center justify-center text-white transition-colors shadow-lg"
            >
              ✕
            </button>
            
            {/* Expanded image */}
            <img 
              src={expandedReview.image}
              alt={`Reader review ${expandedReview.id}`}
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* ===== FIND MY WORK - PLATFORM LINKS ===== */}
      <section className="relative py-24 px-6 bg-beige overflow-hidden">
        {/* Background text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <span className="font-display text-[200px] font-bold text-navy/[0.02] whitespace-nowrap">
            FIND ME
          </span>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-cherry" />
            <span className="text-cherry text-sm font-medium tracking-[0.3em] uppercase">Read More</span>
            <div className="w-12 h-px bg-cherry" />
          </div>
          
          <h2 className="font-display text-5xl lg:text-6xl font-bold text-navy mb-6">
            Find My <span className="text-cherry">Words</span>
          </h2>
          
          <p className="text-navy/60 text-lg mb-12 max-w-2xl mx-auto">
            My poetry lives across multiple platforms. Follow along for new pieces, 
            reflections, and creative musings.
          </p>

          {/* Platform grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
            {platforms.map((platform, index) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-6 lg:p-8 bg-white/60 backdrop-blur border border-navy/10 hover:border-cherry/50 hover:bg-white transition-all duration-300 hover:-translate-y-1"
                style={{ 
                  borderRadius: index % 2 === 0 ? '30px 10px 30px 10px' : '10px 30px 10px 30px'
                }}
              >
                <div className="text-4xl mb-3">{platform.icon}</div>
                <h3 className="font-display text-xl font-bold text-navy group-hover:text-cherry transition-colors">
                  {platform.name}
                </h3>
                <div className="mt-2 text-navy/40 text-sm group-hover:text-navy/60 transition-colors">
                  Visit →
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CLOSING QUOTE ===== */}
      <section className="relative py-24 px-6 bg-navy overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-cherry/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-beige/5 rounded-full blur-3xl" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="font-display text-6xl text-cherry/30 mb-4">"</div>
          <blockquote className="font-display text-3xl lg:text-4xl font-bold text-beige leading-relaxed mb-8">
            Words are code for the soul.<br/>
            <span className="text-cherry">Poetry is the algorithm of feeling.</span>
          </blockquote>
          <div className="text-beige/60">— Nanda Regine</div>
        </div>
      </section>

      {/* ===== WHAT'S NEXT ===== */}
      <section className="relative py-20 px-6 bg-beige">
        <div className="max-w-4xl mx-auto">
          <div 
            className="p-8 lg:p-12 bg-navy relative overflow-hidden"
            style={{ borderRadius: '40px 12px 40px 12px' }}
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-cherry/20 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <span className="text-cherry text-sm font-medium tracking-[0.2em] uppercase">Coming Soon</span>
              <h3 className="font-display text-4xl lg:text-5xl font-bold text-beige mt-4 mb-6">
                PoetryTube
              </h3>
              <p className="text-beige/70 text-lg leading-relaxed mb-6 max-w-2xl">
                An interactive poetry and spoken word platform that merges traditional 
                writing with digital innovation. Because poetry deserves its own space 
                in the digital world.
              </p>
              <div className="inline-flex items-center gap-2 text-cherry font-medium">
                <span>Stay tuned</span>
                <span className="w-2 h-2 bg-cherry rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hide scrollbar CSS */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}