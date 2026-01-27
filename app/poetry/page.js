'use client';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Poetry() {
  const [activeVideo, setActiveVideo] = useState(null);
  const [expandedReview, setExpandedReview] = useState(null);
  const scrollRef = useRef(null);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

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

        {/* Animated decorative shapes */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 right-10 w-[400px] h-[400px] bg-gradient-to-bl from-cherry/20 via-cherry/5 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], x: [-20, 20, -20] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-20 left-10 w-[300px] h-[300px] bg-gradient-to-tr from-beige/10 to-transparent rounded-full blur-3xl"
        />

        {/* Floating decorative elements */}
        <motion.div
          animate={{ y: [-15, 15, -15], rotate: [0, 180, 360] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-40 left-[15%] w-20 h-20 border border-cherry/20 rounded-full"
        />
        <motion.div
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute bottom-40 right-[20%] w-4 h-4 bg-gold/40 rounded-full"
        />

        {/* Floating decorative text */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-32 left-8 lg:left-20 hidden lg:block"
        >
          <span className="font-display text-[120px] xl:text-[180px] font-bold text-white/[0.03] leading-none">
            POET
          </span>
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

            {/* Left: Editorial Text */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="text-center lg:text-left order-2 lg:order-1"
            >
              {/* Magazine label */}
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-3 mb-8">
                <div className="w-12 h-px bg-cherry" />
                <span className="text-cherry text-sm font-medium tracking-[0.3em] uppercase">
                  Featured Artist
                </span>
              </motion.div>

              <motion.h1 variants={fadeInUp} className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-beige leading-[0.9] mb-6">
                Poetry &
                <span className="block text-cherry">Performance</span>
              </motion.h1>

              <motion.p variants={fadeInUp} className="font-display text-xl lg:text-2xl text-beige/70 leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
                Words that move. Performances that inspire.
                Stories that <span className="text-cherry italic">heal</span>.
              </motion.p>

              {/* Quick stats */}
              <motion.div variants={fadeInUp} className="flex flex-wrap justify-center lg:justify-start gap-8 mb-10">
                {[
                  { value: '1', label: 'Published Book' },
                  { value: '2', label: 'Radio Features' },
                  { value: '1', label: 'TV Appearance' }
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className="text-center lg:text-left"
                  >
                    <div className="font-display text-4xl font-bold text-cherry">{stat.value}</div>
                    <div className="text-beige/60 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA */}
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <motion.a
                  href="https://books2read.com/Nrkk-insideherroses"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-cherry text-white rounded-full font-medium hover:bg-cherry-dark transition-all inline-flex items-center justify-center gap-2"
                >
                  <span>Get the Book</span>
                  <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
                </motion.a>
                <motion.a
                  href="#performances"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-beige/40 text-beige rounded-full font-medium hover:bg-beige hover:text-navy transition-all inline-flex items-center justify-center"
                >
                  Watch Performances
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Right: Cohesive Asymmetric Photo Cluster */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative flex justify-center order-1 lg:order-2"
            >
              <div className="relative w-[320px] h-[420px] sm:w-[380px] sm:h-[480px] lg:w-[480px] lg:h-[560px]">

                {/* Main large image - asymmetric blob, anchors the cluster */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.02 }}
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
                </motion.div>

                {/* Second image - overlaps main, bottom left */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ scale: 1.03 }}
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
                </motion.div>

                {/* Third image - small accent, top left */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 }}
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 4, repeat: Infinity }}
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
                </motion.div>

                {/* Fourth image - small circle, bottom right accent */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
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
                </motion.div>

                {/* Decorative background blob */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                  transition={{ duration: 10, repeat: Infinity }}
                  className="absolute -right-8 -top-8 w-[70%] h-[75%] bg-gradient-to-br from-cherry/20 via-cherry/5 to-transparent -z-10"
                  style={{ borderRadius: '40% 60% 60% 40% / 50% 50% 50% 50%' }}
                />

                {/* Small decorative accent */}
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute left-[20%] bottom-[5%] w-16 h-16 bg-cherry/30 -z-10"
                  style={{ borderRadius: '60% 40% 50% 50% / 50% 60% 40% 50%' }}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-px h-12 bg-gradient-to-b from-beige/40 to-transparent"
          />
        </motion.div>
      </section>

      {/* ===== BOOK FEATURE SECTION ===== */}
      <section className="relative py-24 px-6 bg-beige overflow-hidden">
        {/* Decorative corner blob */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-bl from-cherry/10 to-transparent"
          style={{ borderRadius: '0 0 0 100%' }}
        />

        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-12"
          >
            <span className="text-cherry text-sm font-medium tracking-[0.2em] uppercase">The Book</span>
            <div className="flex-1 h-px bg-navy/10" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Book info */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeInUp} className="font-display text-5xl lg:text-6xl font-bold text-navy mb-6">
                Inside Her <span className="text-cherry">Roses</span>
              </motion.h2>

              <motion.p variants={fadeInUp} className="text-xl text-navy/70 leading-relaxed mb-6">
                A journey through love, identity, healing, and Black womanhood.
                This collection blooms with raw honesty, capturing moments of
                vulnerability and strength that resonate with the soul.
              </motion.p>

              {/* Main purchase button */}
              <motion.a
                variants={fadeInUp}
                href="https://books2read.com/Nrkk-insideherroses"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-navy text-beige rounded-full font-medium hover:bg-navy-light transition-all mb-8"
              >
                <span>Find Your Store</span>
                <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
              </motion.a>

              {/* Store availability - small logos */}
              <motion.div variants={fadeInUp}>
                <p className="text-navy/50 text-sm mb-3">Available at:</p>
                <div className="flex flex-wrap gap-2">
                  {bookStores.map((store, i) => (
                    <motion.div
                      key={store.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ scale: 1.1, backgroundColor: 'white' }}
                      className="px-3 py-1.5 bg-white/60 rounded-full text-xs font-medium text-navy/70 hover:text-navy transition-colors cursor-default"
                      title={store.name}
                    >
                      {store.name}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Achievements cards */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-4"
            >
              {[
                { icon: '🎬', title: 'TV Feature', desc: 'Featured poet on "Gqeberha: The Empire" — South African television series (2023)' },
                { icon: '📻', title: 'Radio Interviews', desc: 'In-depth conversations on Madiba FM and TRU FM about poetry, creativity, and entrepreneurship' },
                { icon: '🎤', title: 'Live Performances', desc: 'Open mic events, poetry workshops, and spoken word performances across Port Elizabeth' }
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  variants={fadeInUp}
                  whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                  className="bg-white p-6 shadow-lg transition-all"
                  style={{ borderRadius: i % 2 === 0 ? '30px 10px 30px 10px' : '10px 30px 10px 30px' }}
                >
                  <div className="flex items-start gap-4">
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                      className="w-14 h-14 bg-cherry/10 rounded-full flex items-center justify-center shrink-0"
                    >
                      <span className="text-2xl">{item.icon}</span>
                    </motion.div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-navy mb-1">{item.title}</h3>
                      <p className="text-navy/60">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== VIDEO PERFORMANCES (4 videos) ===== */}
      <section id="performances" className="relative py-24 px-6 bg-navy overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cherry to-transparent" />

        {/* Floating decorations */}
        <motion.div
          animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-20 left-[10%] w-24 h-24 border border-cherry/10 rounded-full"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-20 right-[15%] w-8 h-8 bg-gold/20 rounded-full blur-sm"
        />

        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
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
          </motion.div>

          {/* Video grid - 4 videos */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {performanceVideos.map((video, index) => (
              <motion.div
                key={video.id}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
                onClick={() => setActiveVideo(video)}
              >
                <div
                  className="relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
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
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className="w-14 h-14 bg-cherry/90 rounded-full flex items-center justify-center group-hover:bg-cherry transition-all shadow-xl"
                    >
                      <span className="text-white text-xl ml-1">▶</span>
                    </motion.div>
                  </div>

                  {/* Label */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-cherry text-xs font-medium tracking-wider uppercase">Performance</span>
                    <h3 className="font-display text-lg font-bold text-white mt-1">{video.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== RADIO INTERVIEWS SECTION ===== */}
      <section className="relative py-24 px-6 bg-gradient-to-b from-beige to-beige-light overflow-hidden">
        {/* Decorative blob */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cherry/10 to-transparent blur-3xl"
        />

        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
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
          </motion.div>

          {/* Radio content grid */}
          <div className="grid lg:grid-cols-12 gap-8 items-center">

            {/* Left: Radio photos in cool shapes */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-4 relative h-[400px] hidden lg:block"
            >
              {/* Photo 1 - larger, organic shape */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="absolute top-0 left-0 w-[80%] h-[60%] overflow-hidden shadow-xl"
                style={{ borderRadius: '50% 50% 30% 70% / 60% 40% 60% 40%' }}
              >
                <img
                  src="/assets/radio/madiba-radio-1.jpg"
                  alt="Madiba FM Radio Interview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent" />
              </motion.div>

              {/* Photo 2 - smaller, offset */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="absolute bottom-0 right-0 w-[65%] h-[50%] overflow-hidden shadow-xl border-4 border-beige"
                style={{ borderRadius: '40% 60% 50% 50% / 50% 50% 50% 50%' }}
              >
                <img
                  src="/assets/radio/madiba-radio-2.jpg"
                  alt="Radio Interview Moment"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Decorative element */}
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-[40%] left-[60%] w-20 h-20 bg-cherry/20 -z-10"
                style={{ borderRadius: '60% 40% 50% 50% / 50% 60% 40% 50%' }}
              />
            </motion.div>

            {/* Right: Video cards */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="lg:col-span-8 grid sm:grid-cols-2 gap-6"
            >
              {radioVideos.map((video, index) => (
                <motion.div
                  key={video.id}
                  variants={fadeInUp}
                  whileHover={{ y: -10 }}
                  className="group cursor-pointer"
                  onClick={() => setActiveVideo(video)}
                >
                  <div
                    className="relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 bg-navy"
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
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        className="w-16 h-16 bg-cherry/90 rounded-full flex items-center justify-center group-hover:bg-cherry transition-all shadow-xl"
                      >
                        <span className="text-white text-2xl ml-1">▶</span>
                      </motion.div>
                    </div>

                    {/* Station badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      className="absolute top-4 left-4"
                    >
                      <span className="px-3 py-1 bg-white/90 text-navy text-xs font-bold rounded-full">
                        📻 {video.station}
                      </span>
                    </motion.div>

                    {/* Label */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="text-cherry text-xs font-medium tracking-wider uppercase">Interview</span>
                      <h3 className="font-display text-xl font-bold text-white mt-1">{video.title}</h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Mobile radio photos */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:hidden mt-12 grid grid-cols-2 gap-4"
          >
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
          </motion.div>
        </div>
      </section>

      {/* Video Modal */}
      {activeVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/95 backdrop-blur-sm"
          onClick={() => setActiveVideo(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full max-w-4xl bg-navy rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            >
              ✕
            </motion.button>

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
          </motion.div>
        </motion.div>
      )}

      {/* ===== HORIZONTAL SCROLL REVIEWS - EXPANDABLE ===== */}
      <section className="relative py-24 bg-navy overflow-hidden">
        {/* Floating elements */}
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 right-[10%] w-16 h-16 border border-beige/10 rounded-full"
        />

        <div className="max-w-7xl mx-auto px-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
          >
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
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scroll('left')}
                className="w-12 h-12 rounded-full border border-beige/30 text-beige hover:bg-beige hover:text-navy transition-all flex items-center justify-center"
                aria-label="Scroll left"
              >
                ←
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scroll('right')}
                className="w-12 h-12 rounded-full bg-cherry text-white hover:bg-cherry-dark transition-all flex items-center justify-center"
                aria-label="Scroll right"
              >
                →
              </motion.button>
            </div>
          </motion.div>
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
            <motion.div
              key={review.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="shrink-0 snap-center cursor-pointer"
              onClick={() => setExpandedReview(review)}
            >
              <div
                className="relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-white"
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
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <span className="text-navy text-lg">↗</span>
                  </motion.div>
                </div>

                {/* Review number */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="absolute top-3 left-3 w-7 h-7 bg-cherry text-white rounded-full flex items-center justify-center text-xs font-bold shadow"
                >
                  {review.id}
                </motion.div>
              </div>
            </motion.div>
          ))}

          {/* Right spacer */}
          <div className="shrink-0 w-6 lg:w-[calc((100vw-1280px)/2)]" />
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-6 text-beige/40 text-sm"
        >
          <span>← Swipe to explore all reviews →</span>
        </motion.div>
      </section>

      {/* Expanded Review Modal */}
      {expandedReview && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/90 backdrop-blur-sm"
          onClick={() => setExpandedReview(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative max-w-2xl max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              onClick={() => setExpandedReview(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-navy/80 hover:bg-navy rounded-full flex items-center justify-center text-white transition-colors shadow-lg"
            >
              ✕
            </motion.button>

            {/* Expanded image */}
            <img
              src={expandedReview.image}
              alt={`Reader review ${expandedReview.id}`}
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
          </motion.div>
        </motion.div>
      )}

      {/* ===== FIND MY WORK - PLATFORM LINKS ===== */}
      <section className="relative py-24 px-6 bg-beige overflow-hidden">
        {/* Background text */}
        <motion.div
          animate={{ x: [-20, 20, -20] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        >
          <span className="font-display text-[200px] font-bold text-navy/[0.02] whitespace-nowrap">
            FIND ME
          </span>
        </motion.div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
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
          </motion.div>

          {/* Platform grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6"
          >
            {platforms.map((platform, index) => (
              <motion.a
                key={platform.name}
                variants={fadeInUp}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative p-6 lg:p-8 bg-white/60 backdrop-blur border border-navy/10 hover:border-cherry/50 hover:bg-white transition-all duration-300"
                style={{
                  borderRadius: index % 2 === 0 ? '30px 10px 30px 10px' : '10px 30px 10px 30px'
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl mb-3"
                >
                  {platform.icon}
                </motion.div>
                <h3 className="font-display text-xl font-bold text-navy group-hover:text-cherry transition-colors">
                  {platform.name}
                </h3>
                <div className="mt-2 text-navy/40 text-sm group-hover:text-navy/60 transition-colors">
                  Visit →
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== CLOSING QUOTE ===== */}
      <section className="relative py-24 px-6 bg-navy overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 left-0 w-64 h-64 bg-cherry/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-0 right-0 w-48 h-48 bg-beige/5 rounded-full blur-3xl"
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="font-display text-6xl text-cherry/30 mb-4"
          >
            "
          </motion.div>
          <blockquote className="font-display text-3xl lg:text-4xl font-bold text-beige leading-relaxed mb-8">
            Words are code for the soul.<br/>
            <span className="text-cherry">Poetry is the algorithm of feeling.</span>
          </blockquote>
          <div className="text-beige/60">— Nanda Regine</div>
        </motion.div>
      </section>

      {/* ===== WHAT'S NEXT ===== */}
      <section className="relative py-20 px-6 bg-beige">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="p-8 lg:p-12 bg-navy relative overflow-hidden"
            style={{ borderRadius: '40px 12px 40px 12px' }}
          >
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.3, 0.2] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute top-0 right-0 w-48 h-48 bg-cherry/20 rounded-full blur-3xl"
            />

            <div className="relative z-10">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-cherry text-sm font-medium tracking-[0.2em] uppercase"
              >
                Coming Soon
              </motion.span>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-display text-4xl lg:text-5xl font-bold text-beige mt-4 mb-6"
              >
                PoetryTube
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-beige/70 text-lg leading-relaxed mb-6 max-w-2xl"
              >
                An interactive poetry and spoken word platform that merges traditional
                writing with digital innovation. Because poetry deserves its own space
                in the digital world.
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 text-cherry font-medium"
              >
                <span>Stay tuned</span>
                <motion.span
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-2 h-2 bg-cherry rounded-full"
                />
              </motion.div>
            </div>
          </motion.div>
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
