import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'

/* ─────────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}
const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
}
const stagger = (delay = 0.1) => ({
  show: { transition: { staggerChildren: delay } },
})

/* ─────────────────────────────────────────────
   HOOK: trigger animation when element enters viewport
───────────────────────────────────────────── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: threshold })
  return [ref, inView]
}

/* ─────────────────────────────────────────────
   NAV COMPONENT
───────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const links = [
    { label: 'Products', href: '#products' },
    { label: 'Kashmir', href: '#story' },
    { label: 'Why Walnut', href: '#why' },
    { label: 'Brew\'d', href: '#brewd' },
  ]

  const scrollTo = (href) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-paper/92 backdrop-blur-xl shadow-[0_1px_0_0_#E2DDD5] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="font-display text-[22px] font-semibold tracking-[-0.3px] text-ink">
          pro<em className="text-gold not-italic">Teen</em>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {links.map((l) => (
            <li key={l.label}>
              <button
                onClick={() => scrollTo(l.href)}
                className="font-body text-[12px] tracking-wide text-ink/50 hover:text-ink transition-colors duration-200"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          onClick={() => scrollTo('#products')}
          className="hidden md:block font-body text-[11px] font-semibold tracking-[0.14em] uppercase bg-ink text-paper px-6 py-2.5 rounded-sm hover:bg-gold transition-colors duration-250"
        >
          Launching Soon
        </button>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-1"
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-px bg-ink transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-px bg-ink transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-ink transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-paper border-t border-stone"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {links.map((l) => (
                <button
                  key={l.label}
                  onClick={() => scrollTo(l.href)}
                  className="text-left font-body text-[13px] text-ink/60 hover:text-ink transition-colors"
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo('#products')}
                className="mt-2 font-body text-[11px] font-semibold tracking-[0.14em] uppercase bg-ink text-paper px-6 py-3 rounded-sm w-full"
              >
                Launching Soon
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

/* ─────────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────────── */
function Hero() {
  return (
    <section className="min-h-screen bg-paper pt-24 flex flex-col">
      {/* Main hero grid */}
      <div className="flex-1 max-w-[1280px] mx-auto w-full px-6 md:px-12 grid md:grid-cols-2 gap-12 md:gap-20 items-center py-16 md:py-0">

        {/* Left — copy */}
        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          animate="show"
          className="order-2 md:order-1"
        >
          <motion.div variants={fadeUp} className="sec-label mb-6">
            Wular Valley · Kashmir · India
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-display text-[clamp(52px,7vw,96px)] font-semibold leading-[0.95] tracking-[-2px] text-ink mb-5"
          >
            pro<em className="text-gold">Teen</em>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="font-display text-[clamp(18px,2.2vw,26px)] italic font-normal text-ink/60 mb-6 leading-snug"
          >
            Fuel Your Brain.<br />Nourish Your Heart.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex items-center gap-3 mb-10 text-[11px] font-semibold tracking-[0.18em] uppercase text-ink/40"
          >
            <span>Protein</span>
            <span className="w-1 h-1 rounded-full bg-dust" />
            <span>Omega-3</span>
            <span className="w-1 h-1 rounded-full bg-dust" />
            <span>Functional Nutrition</span>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 items-center">
            <button
              onClick={() => document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' })}
              className="font-body text-[12px] font-semibold tracking-[0.16em] uppercase bg-ink text-paper px-8 py-4 rounded-sm hover:bg-gold transition-colors duration-300"
            >
              Launching Soon
            </button>
            <button
              onClick={() => document.querySelector('#story')?.scrollIntoView({ behavior: 'smooth' })}
              className="font-body text-[12px] tracking-wide text-ink/50 hover:text-ink transition-colors px-4 py-4 underline underline-offset-4"
            >
              Our Kashmir Story
            </button>
          </motion.div>

          {/* Hero stats */}
          <motion.div
            variants={fadeUp}
            className="mt-14 grid grid-cols-3 gap-0 border border-stone rounded-sm overflow-hidden"
          >
            {[
              { n: '5.4g', l: 'Omega-3 per bar' },
              { n: '9.1g', l: 'Plant protein' },
              { n: '2',    l: 'Ingredients only' },
            ].map((s, i) => (
              <div
                key={i}
                className={`p-4 text-center ${i < 2 ? 'border-r border-stone' : ''}`}
              >
                <div className="font-display text-[28px] font-semibold text-ink leading-none mb-1">
                  {s.n}
                </div>
                <div className="font-body text-[9px] uppercase tracking-[0.16em] text-ink/40">
                  {s.l}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — product image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 md:order-2 flex items-center justify-center relative"
        >
          {/* Ambient glow blob */}
          <div className="absolute inset-0 bg-gradient-radial from-sage/10 via-gold/5 to-transparent rounded-full blur-3xl" />
          <motion.img
            src="/proteen-green.png"
            alt="proTeen — Kashmir Walnut Bar"
            className="relative z-10 w-full max-w-[420px] md:max-w-none object-contain drop-shadow-[0_40px_80px_rgba(26,24,20,0.18)]"
            style={{ maxHeight: '72vh' }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>

      {/* Bottom stats strip */}
      <div className="border-t border-stone bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-stone">
            {[
              { n: '3.4×', l: 'WHO Recommendation' },
              { n: '0g',   l: 'Added Sugar' },
              { n: 'GI',   l: 'Kashmir Origin' },
              { n: '100+', l: 'Year old orchards' },
              { n: '0',    l: 'Middlemen' },
            ].map((s, i) => (
              <div key={i} className="py-5 px-4 text-center">
                <div className="font-display text-[22px] font-semibold text-ink leading-none mb-1">
                  {s.n}
                </div>
                <div className="font-body text-[8px] uppercase tracking-[0.16em] text-ink/40">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   PRODUCT CARD COMPONENT
───────────────────────────────────────────── */
function ProductCard({ img, tag, tagColor, name, nameItalic, desc, protein, omega3, price, delay = 0 }) {
  const [ref, inView] = useReveal()

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      variants={fadeUp}
      transition={{ delay }}
      whileHover={{ y: -6, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
      className="group bg-paper border border-stone rounded-sm overflow-hidden cursor-pointer flex flex-col"
    >
      {/* Image area */}
      <div className="relative overflow-hidden bg-cream aspect-[3/4] flex items-center justify-center p-8">
        {/* Out of stock badge */}
        <span className="absolute top-4 left-4 z-10 font-body text-[8px] font-semibold tracking-[0.16em] uppercase px-3 py-1.5 rounded-full border border-ink/20 bg-paper/90 backdrop-blur-sm text-ink/50">
          Out of Stock
        </span>

        {/* Tag */}
        {tag && (
          <span
            className={`absolute top-4 right-4 z-10 font-body text-[8px] font-semibold tracking-[0.14em] uppercase px-3 py-1.5 rounded-full border ${tagColor}`}
          >
            {tag}
          </span>
        )}

        {/* Product image */}
        <motion.img
          src={img}
          alt={name}
          className="w-full h-full object-contain object-center transition-transform duration-700 group-hover:scale-105"
          style={{ maxHeight: '320px' }}
        />

        {/* Nutrition pills */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
          <div className="bg-paper/94 backdrop-blur-sm border border-stone/80 rounded-full px-3.5 py-1.5 text-center">
            <div className="font-display text-[15px] font-semibold text-sage leading-none">{protein}</div>
            <div className="font-body text-[7px] uppercase tracking-[0.12em] text-ink/50 mt-0.5">Protein</div>
          </div>
          <div className="bg-paper/94 backdrop-blur-sm border border-stone/80 rounded-full px-3.5 py-1.5 text-center">
            <div className="font-display text-[15px] font-semibold text-gold leading-none">{omega3}</div>
            <div className="font-body text-[7px] uppercase tracking-[0.12em] text-ink/50 mt-0.5">Omega-3</div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1">
        <div className="font-body text-[9px] font-semibold tracking-[0.18em] uppercase text-ink/40 mb-2">
          proTeen
        </div>
        <div className="font-display text-[22px] font-semibold leading-tight tracking-[-0.3px] text-ink mb-3">
          {name}
          {nameItalic && <em className="text-gold"> {nameItalic}</em>}
        </div>
        <p className="font-body text-[13px] leading-relaxed text-ink/55 font-light mb-6 flex-1">
          {desc}
        </p>

        <div className="border-t border-stone pt-4 flex items-center justify-between">
          <div className="font-display text-[20px] font-medium text-ink tracking-[-0.3px]">
            {price} <span className="font-body text-[11px] text-ink/40 font-light">/ 4-pack</span>
          </div>
          <button
            disabled
            className="font-body text-[10px] font-semibold tracking-[0.12em] uppercase px-4 py-2.5 rounded-sm border border-stone text-ink/40 cursor-not-allowed"
          >
            Notify Me
          </button>
        </div>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   PRODUCTS SECTION
───────────────────────────────────────────── */
function Products() {
  const [ref, inView] = useReveal()

  const products = [
    {
      img:       '/proteen-green.png',
      tag:       'Original',
      tagColor:  'border-sage/30 text-sage bg-sage/7',
      name:      'proTeen',
      nameItalic:'Walnut + Jaggery',
      desc:      'Kashmir Kagzi walnut — the only nut classified as an excellent source of plant Omega-3. Two ingredients. No isolates. Every bar supports brain function and heart health through whole-food nutrition.',
      protein:   '9.1g',
      omega3:    '5.4g',
      price:     '₹149',
      delay:     0.05,
    },
    {
      img:       '/proteen-brown.png',
      tag:       '🌙 Night Mode',
      tagColor:  'border-ink/20 text-ink/60 bg-ink/5',
      name:      'proTeen',
      nameItalic:'Dark Cocoa',
      desc:      'Theobromine from dark cocoa delivers sustained cognitive focus — without the caffeine crash. Kashmir walnut provides the Omega-3 brain fuel. Engineered for UPSC aspirants and late-night thinkers.',
      protein:   '8g',
      omega3:    '2.9g',
      price:     '₹159',
      delay:     0.15,
    },
    {
      img:       '/brewd.jpeg',
      tag:       'Brew\'d',
      tagColor:  'border-warm/40 text-warm bg-warm/8',
      name:      'Brew\'d',
      nameItalic:'Stroopwafel',
      desc:      'Place on your hot coffee cup. Let the Kashmir walnut and dark cocoa filling soften. Then bite. A ritual of indulgence and nourishment — rich in plant Omega-3 and whole-food protein.',
      protein:   '4.5g',
      omega3:    '2.7g',
      price:     '₹299',
      delay:     0.25,
    },
  ]

  return (
    <section id="products" className="py-24 md:py-32 bg-cream px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto">

        {/* Header */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          variants={stagger(0.1)}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-4"
        >
          <div>
            <motion.div variants={fadeUp} className="sec-label mb-4">The Range</motion.div>
            <motion.h2 variants={fadeUp} className="font-display text-[clamp(28px,3.5vw,48px)] font-semibold leading-[1.1] tracking-[-1px] text-ink">
              Three products.<br /><em className="text-gold">One valley.</em>
            </motion.h2>
          </div>
          <motion.p variants={fadeIn} className="font-body text-[13px] text-ink/50 font-light leading-relaxed max-w-[220px] text-right hidden md:block">
            All products are currently out of stock. Join the waitlist to be first.
          </motion.p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((p) => (
            <ProductCard key={p.name + p.nameItalic} {...p} />
          ))}
        </div>

        {/* Waitlist note */}
        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
          className="text-center mt-10 font-body text-[12px] text-ink/40 tracking-wide"
        >
          All products are currently out of stock — launching soon.
        </motion.p>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   STORY / KASHMIR SECTION
───────────────────────────────────────────── */
function Story() {
  const [refL, inViewL] = useReveal()
  const [refR, inViewR] = useReveal()

  return (
    <section id="story" className="py-24 md:py-36 bg-paper px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-2 gap-16 md:gap-28 items-center">

          {/* Left — copy */}
          <motion.div
            ref={refL}
            initial="hidden"
            animate={inViewL ? 'show' : 'hidden'}
            variants={stagger(0.1)}
          >
            <motion.div variants={fadeUp} className="sec-label mb-5">The Origin</motion.div>
            <motion.h2 variants={fadeUp} className="font-display text-[clamp(28px,3.5vw,48px)] font-semibold leading-[1.1] tracking-[-1px] text-ink mb-6">
              Born in the<br /><em className="text-gold">Wular Valley</em>
            </motion.h2>

            <motion.p variants={fadeUp} className="font-body text-[15px] leading-[1.82] text-ink/55 font-light mb-5">
              Surrounding Wular Lake — Asia's largest freshwater lake — <strong className="font-medium text-ink">Kagzi walnut trees have grown for over a century.</strong> No chemical fertilisers. No factory farming. Just glacial soil, high altitude, and patient farmers.
            </motion.p>

            {/* Pull quote */}
            <motion.div
              variants={fadeUp}
              className="my-7 pl-5 border-l-2 border-gold bg-gold/4 py-4 pr-4"
            >
              <p className="font-display italic text-[17px] leading-snug text-ink">
                "Walnuts resemble the human brain — and science confirms what ancient wisdom observed."
              </p>
            </motion.div>

            <motion.p variants={fadeUp} className="font-body text-[15px] leading-[1.82] text-ink/55 font-light mb-5">
              Rich in <strong className="font-medium text-ink">Omega-3 ALA</strong> — the only nut classified as an excellent source of plant-based Omega-3 by the FDA — Kashmir walnuts have been linked to improved cognition, cardiovascular health, and reduced inflammation.
            </motion.p>

            <motion.p variants={fadeUp} className="font-body text-[13px] text-ink/40 leading-relaxed">
              Referenced: Harvard School of Public Health · NIH National Library of Medicine · FDA qualified health claim for walnuts
            </motion.p>

            {/* Tags */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mt-8">
              {['Kagzi Variety', 'Direct Farm', 'No Middlemen', 'QR Traced', 'Organically Grown', 'GI Origin'].map((t) => (
                <span key={t} className="font-body text-[10px] px-3 py-1.5 rounded-full border border-stone text-ink/50">
                  {t}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Kashmir visual */}
          <motion.div
            ref={refR}
            initial="hidden"
            animate={inViewR ? 'show' : 'hidden'}
            variants={fadeUp}
            className="relative"
          >
            {/* Mountain illustration card */}
            <div className="rounded-sm overflow-hidden border border-stone shadow-[0_20px_60px_rgba(26,24,20,0.07)]">
              {/* Walnut Farm Image */}
              <div className="bg-[#EAE6DC] overflow-hidden">
                <img
                  src="/walnut_farm.png"
                  alt="Walnut Farm"
                  className="w-full h-auto"
                />
              </div>

              {/* Data grid below map */}
              <div className="grid grid-cols-2 bg-paper border-t border-stone">
                {[
                  { v: '100+', l: 'Year old orchards', em: false },
                  { v: '₹329', l: 'Farmer cost advantage/kg', em: true },
                  { v: '0',    l: 'Middlemen', em: false },
                  { v: 'GI',   l: 'Kashmir origin certified', em: true },
                ].map((d, i) => (
                  <div
                    key={i}
                    className={`p-5 text-center ${i % 2 === 0 ? 'border-r border-stone' : ''} ${i < 2 ? 'border-b border-stone' : ''}`}
                  >
                    <div className={`font-display text-[26px] font-medium leading-none mb-1.5 ${d.em ? 'text-gold' : 'text-ink'}`}>
                      {d.v}
                    </div>
                    <div className="font-body text-[8px] uppercase tracking-[0.16em] text-ink/40">{d.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   QR CODE SECTION
───────────────────────────────────────────── */
function QRSection() {
  const [ref, inView] = useReveal()

  return (
    <section className="py-20 md:py-28 bg-cream border-y border-stone px-6 md:px-12">
      <div className="max-w-[1000px] mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          variants={stagger(0.1)}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          {/* QR */}
          <motion.div variants={fadeIn} className="flex justify-center md:justify-start">
            <div className="relative">
              <div className="w-[180px] h-[180px] md:w-[220px] md:h-[220px] bg-paper border border-stone rounded-sm p-4 flex items-center justify-center shadow-[0_8px_32px_rgba(26,24,20,0.08)]">
                <img
                  src="/6ec081fee71297389ee0bef465f1ca46.png"
                  alt="Scan to discover Kashmir"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gold text-paper font-body text-[9px] uppercase tracking-[0.16em] px-4 py-1.5 rounded-full whitespace-nowrap">
                Scan me
              </div>
            </div>
          </motion.div>

          {/* Copy */}
          <div>
            <motion.div variants={fadeUp} className="sec-label mb-5">Farm to Bar</motion.div>
            <motion.h2 variants={fadeUp} className="font-display text-[clamp(26px,3vw,40px)] font-semibold leading-[1.1] tracking-[-0.8px] text-ink mb-5">
              Scan.<br /><em className="text-gold">Discover Kashmir.</em>
            </motion.h2>
            <motion.p variants={fadeUp} className="font-body text-[15px] leading-[1.8] text-ink/55 font-light mb-4">
              Every proTeen bar carries a QR code that connects you to a 3-minute storytelling film — the orchards, the farmers, the harvest season.
            </motion.p>
            <motion.p variants={fadeUp} className="font-body text-[15px] leading-[1.8] text-ink/55 font-light">
              <strong className="font-medium text-ink">Trace the journey</strong> from Kashmir's Wular valley to your nutrition bar. Know your farmer. Know your food.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   WHY WALNUT SECTION
───────────────────────────────────────────── */
function WhyWalnut() {
  const [ref, inView] = useReveal()

  const pillars = [
    {
      num: '01',
      title: 'Brain Health',
      icon: '🧠',
      body: 'Omega-3 ALA from Kashmir walnut supports neuronal structure and cognitive function. Backed by Harvard School of Public Health research and NIH-referenced studies on nut consumption and cognition.',
    },
    {
      num: '02',
      title: 'Heart Health',
      icon: '❤️',
      body: 'The FDA grants walnuts a qualified health claim for heart disease risk reduction. Regular walnut consumption is associated with improved cholesterol profiles and cardiovascular resilience.',
    },
    {
      num: '03',
      title: 'Clean Energy',
      icon: '⚡',
      body: 'Whole food matrix — no isolates, no extraction, no processing. Healthy PUFA from walnut provides slow-release, sustained energy. Two ingredients. Nothing else.',
    },
  ]

  return (
    <section id="why" className="py-24 md:py-36 bg-ink px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto">

        {/* Header */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          variants={stagger(0.1)}
          className="mb-16"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3 text-[10px] font-semibold tracking-widest2 uppercase text-warm mb-4">
            <span className="w-6 h-px bg-warm flex-shrink-0" />
            Why Walnut
          </motion.div>
          <motion.h2 variants={fadeUp} className="font-display text-[clamp(28px,3.5vw,48px)] font-semibold leading-[1.1] tracking-[-1px] text-paper">
            No isolates.<br /><em className="text-gold">Just Kashmir.</em>
          </motion.h2>
        </motion.div>

        {/* Pillars grid */}
        <div className="grid md:grid-cols-3 gap-px bg-white/5 border border-white/5 rounded-sm overflow-hidden">
          {pillars.map((p, i) => (
            <motion.div
              key={p.num}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              transition={{ delay: i * 0.1 }}
              className="bg-ink p-10 hover:bg-white/[0.04] transition-colors duration-300"
            >
              <div className="font-display italic text-[12px] text-warm tracking-wide mb-5">{p.num} —</div>
              <div className="text-3xl mb-4">{p.icon}</div>
              <div className="font-display text-[20px] font-semibold text-paper mb-4 leading-tight">
                {p.title}
              </div>
              <p className="font-body text-[13px] leading-[1.75] text-paper/40 font-light">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Research note */}
        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
          className="text-center mt-10 font-body text-[11px] text-paper/25 tracking-wide"
        >
          Informed by: Harvard T.H. Chan School of Public Health · NIH National Library of Medicine · FDA Qualified Health Claim for Walnuts (2004)
        </motion.p>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   BREW'D SECTION — dark premium
───────────────────────────────────────────── */
function BrewdSection() {
  const [refL, inViewL] = useReveal()
  const [refR, inViewR] = useReveal()

  return (
    <section id="brewd" className="py-24 md:py-36 bg-[#100E0A] px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">

          {/* Image */}
          <motion.div
            ref={refR}
            initial="hidden"
            animate={inViewR ? 'show' : 'hidden'}
            variants={fadeIn}
            className="order-2 md:order-1 flex items-center justify-center relative"
          >
            <div className="absolute inset-0 bg-gradient-radial from-amber-900/20 via-transparent to-transparent rounded-full blur-3xl" />
            <motion.img
              src="/brewd.png"
              alt="Brew'd Stroopwafel — Kashmir Walnut Fills"
              className="relative z-10 w-full max-w-[440px] object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.5)]"
              style={{ maxHeight: '70vh' }}
              whileHover={{ scale: 1.03, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
            />
          </motion.div>

          {/* Copy */}
          <motion.div
            ref={refL}
            initial="hidden"
            animate={inViewL ? 'show' : 'hidden'}
            variants={stagger(0.1)}
            className="order-1 md:order-2"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3 text-[10px] font-semibold tracking-widest2 uppercase text-warm mb-6">
              <span className="w-6 h-px bg-warm flex-shrink-0" />
              Brew'd · Stroopwafel
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-display text-[clamp(32px,4vw,58px)] font-semibold leading-[1.05] tracking-[-1.5px] text-[#F6F2EA] mb-6">
              Walnut<br /><em className="text-gold">Fills.</em>
            </motion.h2>
            <motion.p variants={fadeUp} className="font-body text-[15px] leading-[1.82] text-[#F6F2EA]/45 font-light mb-5">
              Place on your hot coffee cup. Let the Kashmir walnut and dark cocoa filling soften and melt. Then bite through the crispy waffle into warm, indulgent filling.
            </motion.p>
            <motion.p variants={fadeUp} className="font-body text-[15px] leading-[1.82] text-[#F6F2EA]/45 font-light mb-8">
              A ritual of indulgence and nourishment — <strong className="font-medium text-[#F6F2EA]/70">rich in plant Omega-3</strong> from Kashmir walnut and sustained focus from dark cocoa's theobromine. Zero added sugar.
            </motion.p>

            {/* Mini macros */}
            <motion.div variants={fadeUp} className="grid grid-cols-3 gap-px bg-white/6 border border-white/6 rounded-sm overflow-hidden mb-8">
              {[
                { v: '2.7g', l: 'Omega-3' },
                { v: '4.5g', l: 'Protein' },
                { v: '0g',   l: 'Added sugar' },
              ].map((m, i) => (
                <div key={i} className="bg-[#100E0A] py-4 text-center">
                  <div className="font-display text-[22px] font-medium text-gold leading-none mb-1">{m.v}</div>
                  <div className="font-body text-[8px] uppercase tracking-[0.16em] text-[#F6F2EA]/30">{m.l}</div>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center gap-4">
              <button
                disabled
                className="font-body text-[11px] font-semibold tracking-[0.14em] uppercase px-6 py-3.5 rounded-sm border border-white/15 text-[#F6F2EA]/40 cursor-not-allowed"
              >
                Out of Stock
              </button>
              <div className="font-display text-[20px] font-medium text-[#F6F2EA]/70">
                ₹299 <span className="font-body text-[11px] text-[#F6F2EA]/30 font-light">/ 4 pieces</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-paper border-t border-stone">
      {/* Top strip */}
      <div className="border-b border-stone py-10 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto text-center">
          <p className="font-display italic text-[18px] text-ink/50">
            "Made with Kashmiri walnuts — for your brain &amp; heart."
          </p>
        </div>
      </div>

      {/* Main footer */}
      <div className="py-8 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Logo */}
          <div className="font-display text-[20px] font-semibold text-ink">
            pro<em className="text-gold not-italic">Teen</em>
          </div>

          {/* Links */}
          <ul className="flex items-center gap-6 list-none">
            {['Instagram', 'FSSAI Info', 'Contact', 'Privacy'].map((l) => (
              <li key={l}>
                <a
                  href="#"
                  className="font-body text-[10px] uppercase tracking-[0.12em] text-ink/40 hover:text-gold transition-colors duration-200"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>

          {/* Copy */}
          <p className="font-body text-[11px] text-ink/30 tracking-wide">
            © {year} proTeen · Kashmir Walnut
          </p>
        </div>
      </div>
    </footer>
  )
}

/* ─────────────────────────────────────────────
   ROOT APP
───────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Products />
        <Story />
        <QRSection />
        <WhyWalnut />
        <BrewdSection />
      </main>
      <Footer />
    </>
  )
}
