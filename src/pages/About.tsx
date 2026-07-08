import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroVideo from '@assets/7552418-hd_1080_1920_25fps_1783420764090.mp4';
import ctaVideo from '@assets/7691594-hd_1920_1080_25fps_1783493752065.mp4';
import heroImage from '@assets/pexels-vlada-karpovich-7433855_1783420874088.jpg';

const PP = 'Poppins, sans-serif';

/* ── inline keyframes injected once ── */
const STYLES = `
@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
@keyframes fadeUp  { from { opacity:0; transform:translateY(32px) } to { opacity:1; transform:translateY(0) } }
`;

const MARQUEE_ITEMS = [
  'Labour Law Compliance', '✦', 'Payroll Processing', '✦',
  'HR Advisory', '✦', 'Statutory Filings', '✦',
  'Compliance Audits', '✦', 'Factory Act', '✦',
  'New Labour Codes', '✦', 'Workforce Management', '✦',
];

const About = () => {
  const styleInjected = useRef(false);
  useEffect(() => {
    if (styleInjected.current) return;
    const el = document.createElement('style');
    el.textContent = STYLES;
    document.head.appendChild(el);
    styleInjected.current = true;
  }, []);

  return (
    <div className="w-full overflow-x-hidden">

      {/* ══════════════════════════════════════════════════════
          1. HERO — Hard two-panel split
         ══════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden"
        style={{ height: '100vh', minHeight: '640px', display: 'grid', gridTemplateColumns: '48% 52%' }}>

        {/* ── LEFT PANEL: solid brand colour ── */}
        <div className="relative flex flex-col justify-between z-10 px-10 lg:px-14 pt-16 pb-10"
          style={{ backgroundColor: '#a83a00', height: '100%' }}>

          {/* Subtle dot texture */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1.5px, transparent 1.5px)', backgroundSize: '28px 28px' }} />

          {/* Top badge */}
          <motion.div className="relative"
            initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}>
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
              style={{ backgroundColor: 'rgba(253,161,2,0.18)', color: '#fda102', border: '1px solid rgba(253,161,2,0.35)', fontFamily: PP }}>
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              Est. 2003 · Mumbai, India
            </span>
          </motion.div>

          {/* Main headline */}
          <div className="relative flex-1 flex flex-col justify-center py-10">
            <motion.p className="font-bold text-xs uppercase tracking-[0.28em] mb-5"
              style={{ fontFamily: PP, color: 'rgba(255,255,255,0.5)' }}
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}>
              About Maru Consultancy Services
            </motion.p>

            <motion.h1
              className="font-bold text-white leading-[1.08] mb-7"
              style={{ fontFamily: PP, fontSize: 'clamp(2.4rem, 4.5vw, 4.4rem)' }}
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.18 }}>
              India&apos;s Most<br />
              Trusted<br />
              <em className="not-italic" style={{ color: '#fda102' }}>Labour Law</em><br />
              Partner.
            </motion.h1>

            <motion.p className="text-sm leading-[1.85] mb-8 max-w-[340px]"
              style={{ fontFamily: PP, color: 'rgba(255,255,255,0.7)' }}
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.26 }}>
              Two decades of expertise in labour law compliance, HR governance,
              statutory filings, and workforce management across 15+ Indian states.
            </motion.p>

            <motion.div className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.34 }}>
              <Link to="/contact"
                className="inline-flex items-center gap-2 rounded-full px-7 py-3 font-semibold text-sm transition-all hover:scale-[1.04] hover:brightness-105"
                style={{ backgroundColor: '#fda102', color: '#fff', fontFamily: PP }}>
                Work With Us <ArrowRight size={14} />
              </Link>
              <Link to="/services"
                className="inline-flex items-center gap-2 rounded-full px-7 py-3 font-semibold text-sm border transition-all hover:bg-white/10"
                style={{ borderColor: 'rgba(255,255,255,0.35)', color: '#fff', fontFamily: PP }}>
                Our Services
              </Link>
            </motion.div>
          </div>

          {/* Bottom stats strip */}
          <motion.div
            className="relative grid grid-cols-3 gap-px overflow-hidden rounded-2xl"
            style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.44 }}>
            {[['500+','Corporate Clients'], ['21+','Years'], ['15+','States']].map(([n, l], i) => (
              <div key={i} className="flex flex-col items-center justify-center py-5 px-2"
                style={{ backgroundColor: i === 1 ? 'rgba(253,161,2,0.20)' : 'rgba(0,0,0,0.15)' }}>
                <p className="font-bold text-2xl text-white" style={{ fontFamily: PP }}>{n}</p>
                <p className="text-[10px] uppercase tracking-widest mt-0.5"
                  style={{ fontFamily: PP, color: 'rgba(255,255,255,0.55)' }}>{l}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT PANEL: image bg + video on top ── */}
        <div className="relative overflow-hidden"
          style={{ height: '100%', backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          {/* Video overlays the image once loaded */}
          <video src={heroVideo} autoPlay loop muted playsInline
            className="absolute inset-0 w-full h-full object-cover" />

          {/* Light left-edge bleed — blends panels */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to right, rgba(168,58,0,0.65) 0%, rgba(0,0,0,0.15) 45%, transparent 100%)' }} />

          {/* Floating white card — bottom-left of video */}
          <motion.div
            className="absolute bottom-10 left-6 lg:left-10 right-6 lg:right-auto rounded-2xl p-5 shadow-2xl"
            style={{ backgroundColor: '#ffffff', maxWidth: '300px' }}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}>
            <p className="font-bold text-xs uppercase tracking-widest mb-3"
              style={{ fontFamily: PP, color: '#a83a00' }}>Why Clients Choose Us</p>
            <div className="space-y-2">
              {[
                'Pan-India compliance expertise',
                'Dedicated consultant per client',
                'Tech-enabled real-time tracking',
              ].map((pt) => (
                <div key={pt} className="flex items-center gap-2.5">
                  <CheckCircle size={13} style={{ color: '#fda102', flexShrink: 0 }} />
                  <span className="text-xs" style={{ fontFamily: PP, color: '#333' }}>{pt}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Floating amber badge — top-right */}
          <motion.div
            className="absolute top-10 right-8 rounded-2xl px-5 py-4 shadow-xl text-center"
            style={{ backgroundColor: '#fda102' }}
            initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.65 }}>
            <p className="font-bold text-white text-2xl leading-none" style={{ fontFamily: PP }}>98%</p>
            <p className="text-white/80 text-[10px] uppercase tracking-wider mt-1" style={{ fontFamily: PP }}>Client Retention</p>
          </motion.div>
        </div>

        {/* Bottom amber line */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] z-20"
          style={{ backgroundColor: '#fda102' }} />
      </section>

      {/* ══════════════════════════════════════════════════════
          2. MARQUEE STRIP
         ══════════════════════════════════════════════════════ */}
      <div className="overflow-hidden py-4" style={{ backgroundColor: '#111111' }}>
        <div style={{ display: 'flex', width: 'max-content', animation: 'marquee 28s linear infinite' }}>
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="font-semibold text-sm mx-6 whitespace-nowrap"
              style={{ fontFamily: PP, color: item === '✦' ? '#fda102' : 'rgba(255,255,255,0.7)' }}>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          3. BENTO IMAGE GRID — Our Story
         ══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          {/* Section label */}
          <div className="flex items-center gap-4 mb-10">
            <div className="w-8 h-0.5" style={{ backgroundColor: '#fda102' }} />
            <p className="font-bold text-xs uppercase tracking-[0.25em]" style={{ fontFamily: PP, color: '#a83a00' }}>Our Story</p>
          </div>

          <div className="grid grid-cols-12 grid-rows-2 gap-4" style={{ height: '580px' }}>

            {/* Large left cell */}
            <motion.div className="col-span-12 lg:col-span-5 row-span-2 rounded-3xl overflow-hidden relative group"
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.65 }}>
              <img src="/assets/hero-office.png" alt="Our office"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(168,58,0,0.85) 0%, transparent 55%)' }} />
              <div className="absolute bottom-0 left-0 p-8">
                <p className="font-bold text-4xl text-white mb-1" style={{ fontFamily: PP }}>Est.</p>
                <p className="font-bold text-white" style={{ fontFamily: PP, fontSize: '6rem', lineHeight: 1, color: '#fda102' }}>2003</p>
              </div>
            </motion.div>

            {/* Top-right: stat card */}
            <motion.div className="col-span-12 lg:col-span-4 row-span-1 rounded-3xl flex flex-col justify-center px-8 py-7"
              style={{ backgroundColor: '#a83a00' }}
              initial={{ opacity: 0, y: -24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }}>
              <p className="font-bold text-xs uppercase tracking-[0.2em] mb-3" style={{ fontFamily: PP, color: '#fda102' }}>By the Numbers</p>
              <div className="grid grid-cols-3 gap-4">
                {[['500+','Clients'],['21+','Years'],['15+','States']].map(([n,l]) => (
                  <div key={l}>
                    <p className="font-bold text-2xl text-white" style={{ fontFamily: PP }}>{n}</p>
                    <p className="text-xs text-white/60 uppercase tracking-wide" style={{ fontFamily: PP }}>{l}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Top-right image */}
            <motion.div className="col-span-12 lg:col-span-3 row-span-1 rounded-3xl overflow-hidden relative group"
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.15 }}>
              <img src="/assets/service-hr.png" alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </motion.div>

            {/* Bottom-right: story text */}
            <motion.div className="col-span-12 lg:col-span-7 row-span-1 rounded-3xl p-8 flex flex-col justify-between"
              style={{ backgroundColor: '#f9f5f2' }}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.2 }}>
              <h2 className="font-bold leading-[1.2] mb-4"
                style={{ fontFamily: PP, fontSize: 'clamp(1.3rem, 2.2vw, 1.8rem)', color: '#111' }}>
                Founded on a vision of<br /><span style={{ color: '#a83a00' }}>simplified compliance.</span>
              </h2>
              <p className="text-sm leading-relaxed mb-4" style={{ fontFamily: PP, color: '#666', lineHeight: 1.8 }}>
                What started as a boutique advisory in Mumbai has grown into a pan-India powerhouse trusted by some of India&apos;s most respected corporations. We manage compliance for 500+ organisations — from dynamic startups to Fortune 500 conglomerates.
              </p>
              <Link to="/contact" className="inline-flex items-center gap-2 font-semibold text-sm hover:gap-3 transition-all w-fit"
                style={{ fontFamily: PP, color: '#a83a00' }}>
                Our full story <ArrowRight size={15} />
              </Link>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          4. BIG PULL QUOTE
         ══════════════════════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden" style={{ backgroundColor: '#111111' }}>
        <div className="absolute inset-0 pointer-events-none select-none flex items-center justify-center overflow-hidden">
          <p className="font-bold text-white opacity-[0.03]"
            style={{ fontFamily: PP, fontSize: 'clamp(8rem, 22vw, 22rem)', whiteSpace: 'nowrap', lineHeight: 1 }}>
            MARU
          </p>
        </div>
        <div className="relative max-w-5xl mx-auto px-8 lg:px-16 text-center">
          <div className="text-5xl mb-6" style={{ color: '#fda102', lineHeight: 1 }}>"</div>
          <motion.p className="font-bold text-white leading-[1.2] mb-8"
            style={{ fontFamily: PP, fontSize: 'clamp(1.5rem, 3.5vw, 3rem)' }}
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}>
            Compliance is not a checkbox.<br />
            It's the foundation on which<br />
            <span style={{ color: '#fda102' }}>every great business is built.</span>
          </motion.p>
          <motion.p className="font-semibold text-sm uppercase tracking-widest"
            style={{ fontFamily: PP, color: 'rgba(255,255,255,0.4)' }}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
            — Deepak Maru, Founder & Managing Partner
          </motion.p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          5. CORE VALUES — Poster image cards with overlays
         ══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <div className="w-8 h-0.5" style={{ backgroundColor: '#fda102' }} />
                <p className="font-bold text-xs uppercase tracking-[0.25em]" style={{ fontFamily: PP, color: '#a83a00' }}>What Drives Us</p>
              </div>
              <h2 className="font-bold" style={{ fontFamily: PP, fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)', color: '#111' }}>
                Our Core Values
              </h2>
            </div>
          </div>

          {/* 4 image-backed poster cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { num: '01', title: 'Absolute\nIntegrity', desc: 'No shortcuts. Every engagement is guided by the letter and spirit of the law.', img: '/assets/service-legal.png', accent: '#fda102' },
              { num: '02', title: 'Unmatched\nExcellence', desc: 'Precision in every detail, backed by continuous learning and mastery of new regulations.', img: '/assets/service-labour.png', accent: '#fda102' },
              { num: '03', title: 'Client\nPartnership', desc: 'A genuine extension of your team, invested in your growth and long-term success.', img: '/assets/service-staffing.png', accent: '#fda102' },
              { num: '04', title: 'Continuous\nInnovation', desc: 'Tech-powered compliance tools that make real-time tracking effortless and accurate.', img: '/assets/service-audits.png', accent: '#fda102' },
            ].map((v, i) => (
              <motion.div key={i}
                className="relative rounded-2xl overflow-hidden group cursor-default"
                style={{ height: '380px' }}
                initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.1 }}>
                {/* Background photo */}
                <img src={v.img} alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                {/* Permanent gradient overlay */}
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.15) 100%)' }} />
                {/* Hover tint */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                  style={{ backgroundColor: '#a83a00' }} />
                {/* Content */}
                <div className="absolute inset-0 p-7 flex flex-col justify-between">
                  <p className="font-bold text-5xl opacity-30 text-white" style={{ fontFamily: PP }}>{v.num}</p>
                  <div>
                    <div className="w-8 h-0.5 mb-4" style={{ backgroundColor: v.accent }} />
                    <h4 className="font-bold text-white text-xl leading-tight mb-3 whitespace-pre-line" style={{ fontFamily: PP }}>{v.title}</h4>
                    <p className="text-xs leading-relaxed text-white/70 translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400" style={{ fontFamily: PP }}>{v.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          6. OUR JOURNEY — Horizontal 30-year animated timeline
         ══════════════════════════════════════════════════════ */}
      <section id="journey" className="py-24 relative overflow-hidden" style={{ backgroundColor: '#a83a00' }}>
        {/* Subtle dot texture, consistent with hero */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1.5px, transparent 1.5px)', backgroundSize: '28px 28px' }} />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-0.5" style={{ backgroundColor: '#fda102' }} />
            <p className="font-bold text-xs uppercase tracking-[0.25em]" style={{ fontFamily: PP, color: '#fda102' }}>Our Journey</p>
          </div>
          <h2 className="font-bold text-white leading-[1.15] mb-16 max-w-xl"
            style={{ fontFamily: PP, fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)' }}>
            Three decades of building India&apos;s compliance backbone.
          </h2>

          {/* ── Horizontal timeline ── */}
          <div className="relative">
            {/* Track (background) */}
            <div className="absolute left-0 right-0 hidden sm:block"
              style={{ top: '28px', height: '2px', backgroundColor: 'rgba(255,255,255,0.18)' }} />
            {/* Animated fill line — draws left to right */}
            <motion.div className="absolute left-0 hidden sm:block"
              style={{ top: '28px', height: '2px', backgroundColor: '#fda102', transformOrigin: 'left' }}
              initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
              viewport={{ once: true }} transition={{ duration: 1.6, ease: 'easeInOut' }} />

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-10 sm:gap-6">
              {[
                { year: '2003', event: 'Founded', lines: ['Established as a boutique advisory', 'firm in Mumbai with a core focus on', 'Factory Act compliance & filings.'] },
                { year: '2009', event: 'Pan-India', lines: ['Expanded operations to Delhi NCR', 'and Bangalore — becoming a true', 'pan-India firm serving 100+ clients.'] },
                { year: '2016', event: 'Tech-Enabled', lines: ['Launched proprietary compliance', 'tracking software with real-time', 'dashboards and automated alerts.'] },
                { year: '2023', event: 'New Codes Authority', lines: ["Two decades on, India's go-to", 'authority on the New Labour Codes,', 'serving 500+ organisations nationwide.'] },
              ].map((m, i) => (
                <motion.div key={i} className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 + i * 0.25 }}>

                  {/* Circle node */}
                  <motion.div
                    className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center shrink-0 font-bold"
                    style={{ backgroundColor: '#a83a00', border: '2px solid #fda102', color: '#fda102', fontFamily: PP, fontSize: '0.85rem' }}
                    initial={{ scale: 0 }} whileInView={{ scale: 1 }}
                    viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.2 + i * 0.25, type: 'spring', stiffness: 260, damping: 18 }}>
                    {m.year}
                  </motion.div>

                  {/* Connector to text */}
                  <div className="w-px h-6" style={{ backgroundColor: 'rgba(255,255,255,0.25)' }} />

                  {/* Event label */}
                  <p className="font-bold text-xs uppercase tracking-widest mb-3"
                    style={{ fontFamily: PP, color: '#fda102' }}>{m.event}</p>

                  {/* 3-line justified content */}
                  <p className="text-sm max-w-[220px]"
                    style={{ fontFamily: PP, color: 'rgba(255,255,255,0.85)', lineHeight: 1.8, textAlign: 'justify', textAlignLast: 'center' }}>
                    {m.lines.join(' ')}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          7. WHY CHOOSE MARU — Checklist + big image
         ══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          {/* Centered top logo */}
          <motion.div className="flex justify-center mb-3"
            initial={{ opacity: 0, y: -16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <img src="/assets/maru-logo-full.png" alt="Maru Consultancy Services"
              className="w-auto object-contain" style={{ height: '110px' }} />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left: image with floating cards */}
            <motion.div className="relative"
              initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.65 }}>
              <div className="rounded-3xl overflow-hidden" style={{ height: '520px' }}>
                <img src={heroImage} alt="" className="w-full h-full object-cover" />
              </div>
              {/* Floating amber badge */}
              <div className="absolute -bottom-6 -right-4 rounded-2xl p-6 shadow-2xl"
                style={{ backgroundColor: '#fda102' }}>
                <p className="font-bold text-white text-3xl" style={{ fontFamily: PP }}>98%</p>
                <p className="font-semibold text-white/80 text-xs uppercase tracking-wider" style={{ fontFamily: PP }}>Client Retention</p>
              </div>
              {/* Floating dark badge */}
              <div className="absolute -top-5 -left-4 rounded-2xl px-6 py-4 shadow-xl"
                style={{ backgroundColor: '#111111' }}>
                <p className="font-bold text-xl" style={{ fontFamily: PP, color: '#fda102' }}>500+</p>
                <p className="text-xs text-white/60 uppercase tracking-wide" style={{ fontFamily: PP }}>Clients Served</p>
              </div>
            </motion.div>

            {/* Right: checklist */}
            <motion.div
              initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.1 }}>
              <h2 className="font-bold leading-[1.15] mb-8"
                style={{ fontFamily: PP, fontSize: 'clamp(1.6rem, 2.8vw, 2.6rem)', color: '#111' }}>
                What sets us apart<br />from the <span style={{ color: '#a83a00' }}>rest.</span>
              </h2>

              <div className="space-y-6">
                {[
                  { point: 'Pan-India presence across 15+ states', sub: 'State-specific expertise from Kashmir to Kanyakumari, covering all major industrial hubs.' },
                  { point: 'Experts in New Labour Codes', sub: "One of India's earliest and most trusted authorities on the consolidated labour code framework." },
                  { point: 'Proactive risk identification', sub: 'We audit for vulnerabilities before they become penalties — not after. Reactive compliance is a liability.' },
                  { point: 'Dedicated consultant per client', sub: 'Every client gets a named consultant who knows their business, their sector, and their risk profile.' },
                  { point: 'Tech-enabled tracking & reporting', sub: 'Real-time dashboards and automated reminders so nothing ever slips through the cracks.' },
                ].map((item, i) => (
                  <motion.div key={i} className="flex gap-4 items-start"
                    initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: '#fda102' }}>
                      <CheckCircle size={16} color="#fff" />
                    </div>
                    <div>
                      <p className="font-semibold text-base" style={{ fontFamily: PP, color: '#111' }}>{item.point}</p>
                      <p className="text-sm leading-relaxed mt-1" style={{ fontFamily: PP, color: '#777' }}>{item.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          8. TEAM — 4 white cards on brand-colour band
         ══════════════════════════════════════════════════════ */}
      <section className="py-16 overflow-hidden" style={{ backgroundColor: '#a83a00' }}>
        <div className="w-full px-6 lg:px-10">

          {/* Section header */}
          <motion.div className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="font-bold text-white leading-[1.15] mb-4"
              style={{ fontFamily: PP, fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)' }}>
              Meet the Experts Behind Your Success
            </h2>
            <p className="px-4 sm:px-12 lg:px-32"
              style={{ fontFamily: PP, color: '#fda102', fontSize: 'clamp(1rem, 1.6vw, 1.25rem)', lineHeight: 1.6 }}>
              Our experienced team of labour law, payroll, HR, and compliance professionals is committed to delivering practical solutions that help your business stay compliant and grow with confidence.
            </p>
          </motion.div>

          {/* 4-card grid — single row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { name: 'Deepak Maru',  qualification: 'B.Com (Hons), LL.B', role: 'Advocate\nFounder & Managing Partner', img: '/assets/service-legal.png' },
              { name: 'Sanjeev Maru', qualification: 'B.Com, LL.B',        role: 'Co-founder & Managing Partner',       img: '/assets/service-staffing.png' },
              { name: 'Pankhil Maru', qualification: 'B.E (I.T), MBA (HR)', role: 'Managing Partner',                    img: '/assets/service-hr.png' },
              { name: 'Nishit Maru',  qualification: 'BLS, LL.B, CS',       role: 'Managing Partner',                    img: '/assets/service-audits.png' },
            ].map((m, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="rounded-2xl overflow-hidden flex flex-col group cursor-default"
                style={{ backgroundColor: '#ffffff' }}>

                {/* Photo */}
                <div className="relative overflow-hidden" style={{ height: '360px' }}>
                  <img src={m.img} alt={m.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-400"
                    style={{ backgroundColor: '#a83a00' }} />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col items-center text-center px-6 py-7">
                  <h4 className="font-bold text-lg mb-1" style={{ fontFamily: PP, color: '#111' }}>{m.name}</h4>
                  <p className="text-xs mb-2" style={{ fontFamily: PP, color: '#999' }}>{m.qualification}</p>
                  <p className="font-semibold text-xs uppercase tracking-wide whitespace-pre-line leading-relaxed"
                    style={{ fontFamily: PP, color: '#a83a00' }}>{m.role}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          9. VIDEO CTA — Video background, bold overlay
         ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: '440px' }}>
        <video src={ctaVideo} autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0"
          style={{ backgroundColor: 'rgba(0,0,0,0.45)' }} />

        <div className="relative max-w-5xl mx-auto px-8 py-24 text-center">
          <motion.p className="font-bold uppercase tracking-[0.3em] mb-5"
            style={{ fontFamily: PP, color: '#fda102', fontSize: 'clamp(1rem, 1.8vw, 1.35rem)' }}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.4 }}>
            Ready to Get Compliant?
          </motion.p>
          <motion.h2 className="font-bold text-white leading-[1.1] mb-8"
            style={{ fontFamily: PP, fontSize: 'clamp(2rem, 5vw, 4rem)' }}
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.08 }}>
            Let's build your compliance<br /><span style={{ color: '#fda102' }}>framework together</span>
          </motion.h2>
          <motion.div className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.18 }}>
            <Link to="/contact"
              className="inline-flex items-center gap-2 rounded-full px-10 py-4 font-semibold text-sm transition-all hover:scale-[1.04] shadow-xl"
              style={{ backgroundColor: '#fda102', color: '#fff', fontFamily: PP }}>
              Schedule a Consultation <ArrowRight size={16} />
            </Link>
            <Link to="/careers"
              className="inline-flex items-center gap-2 rounded-full px-10 py-4 font-semibold text-sm border transition-all hover:scale-[1.04]"
              style={{ borderColor: 'rgba(255,255,255,0.5)', color: '#fff', fontFamily: PP }}>
              Join Our Team
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default About;
