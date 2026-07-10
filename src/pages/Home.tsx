import { useState, useRef, useEffect } from 'react';
import heroVideoDefault from '@assets/7552418-hd_1080_1920_25fps_1783420764090.mp4';
import heroImageDefault from '@assets/pexels-vlada-karpovich-7433855_1783420874088.jpg';
import customerReviewIcon from '@assets/customer-review_1783487769231.png';
import maruLogoDefault from '@assets/image_1783488818937.png';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowRight, ChevronRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ALL_CLIENTS } from '../components/ClientLogos';
import lottie from 'lottie-web';
import animStatutory from '../assets/animations/anim-statutory.json';
import animLabourActs from '../assets/animations/anim-labour-acts.json';
import animEstablishment from '../assets/animations/anim-establishment.json';
import animPayrollPlanning from '../assets/animations/anim-payroll-planning.json';
import animPayrollRecords from '../assets/animations/anim-payroll-records.json';
import animHr from '../assets/animations/anim-hr.json';
import { api } from '../lib/api';
import { useLiveContent } from '../hooks/useLiveContent';
import type { HomeContent, ServiceContent } from '../types/content';

/* ── Lottie player wrapper (uses lottie-web directly, no duplicate-React risk) ── */
function LottieAnim({ animationData, className }: { animationData: unknown; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!containerRef.current) return;
    const anim = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      animationData: animationData as any,
    });
    return () => anim.destroy();
  }, [animationData]);
  return <div ref={containerRef} className={className} />;
}

/* ── Animated count-up stat ───────────────────────────────── */
function StatCounter({ target, decimals = 0, suffix = '' }: { target: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!isInView) return;
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;
      setDisplay(current.toFixed(decimals));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, target, decimals]);

  return <span ref={ref}>{display}{suffix}</span>;
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.1 } }),
};

const defaultPhrases = [
  'Labour Compliance',
  'Payroll Solutions',
  'HR Outsourcing',
  'Statutory Filings',
  'Legal Expertise',
];

const defaultTestimonials = [
  { text: "Labour Law transformed our chaotic compliance process into a streamlined, risk-free system. Their expertise in the New Wage Code is unmatched.", author: "Rajesh Sharma", role: "HR Director, TechNova" },
  { text: "Their proactive approach to statutory audits saved us from significant penalties. They don't just consult — they partner with you for the long haul.", author: "Meera Reddy", role: "CEO, Manufacturing Corp" },
  { text: "The contract staffing solutions provided by LC allowed us to scale rapidly during peak season without any compliance headaches.", author: "Vikram Singh", role: "VP Operations, Retail Giant" },
  { text: "Maru Consultancy's compliance framework saved us lakhs in potential penalties. Their team anticipates regulatory changes before they even happen.", author: "Priya Kapoor", role: "CFO, Apex Industries" },
  { text: "We have expanded to 6 states and Maru handled every state-specific compliance requirement seamlessly. Truly a pan-India expert partner.", author: "Arun Nair", role: "MD, Sunrise Textiles" },
  { text: "The statutory filing support is impeccable — PF, ESIC, PT all managed without a single deadline miss in over three years.", author: "Sneha Joshi", role: "Head HR, BuildRight Infra" },
  { text: "Outstanding legal representation before the labour tribunal. The case was resolved in our favour and the whole process was stress-free.", author: "Deepak Mehta", role: "Director, Meridian Logistics" },
  { text: "Their HR policy advisory helped us modernise our standing orders in line with the new codes. Employees and management are both happy.", author: "Kavitha Rao", role: "CHRO, NovaMed Healthcare" },
];

const defaultWhyUs = [
  { title: "Pan-India Presence", desc: "Deep expertise across state-specific regulations and all central labour legislations from Kashmir to Kanyakumari." },
  { title: "Proactive Risk Mitigation", desc: "We identify vulnerabilities before they become liabilities — our audits are proactive, not reactive." },
  { title: "Technology-Driven Approach", desc: "Proprietary compliance tracking tools give you real-time dashboards and automated deadline reminders." },
];

const defaultOneStopCards = [
  { anim: animStatutory, title: 'Statutory Registrations', desc: 'ESI, EPF, Professional Tax' },
  { anim: animLabourActs, title: 'Core Labour Law Acts', desc: 'Contract Labour, Gratuity, Bonus' },
  { anim: animEstablishment, title: 'Establishment & Factory', desc: 'MLWF, Shops & Factories Act' },
  { anim: animPayrollPlanning, title: 'Payroll Processing', desc: 'Planning, salary structuring' },
  { anim: animPayrollRecords, title: 'Payroll Reports & Records', desc: 'MIS, salary register, FNF' },
  { anim: animHr, title: 'HR Related Matters', desc: 'Advisory day-to-day support' },
];
const oneStopAnims = [animStatutory, animLabourActs, animEstablishment, animPayrollPlanning, animPayrollRecords, animHr];

const defaultStats = [
  { target: 500, decimals: 0, suffix: '+', label: 'Clients Served' },
  { target: 4.9, decimals: 1, suffix: '★', label: 'Average Rating' },
  { target: 15, decimals: 0, suffix: '+', label: 'Years of Expertise' },
  { target: 98, decimals: 0, suffix: '%', label: 'Retention Rate' },
];

const Home = () => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [content, setContent] = useState<HomeContent | null>(null);
  const [previewServices, setPreviewServices] = useState<ServiceContent[]>([]);

  const fetchHome = () => {
    Promise.all([
      api.get<HomeContent>('/home'),
      api.get<ServiceContent[]>('/services'),
    ]).then(([home, services]) => {
      setContent(home);
      if (home.featuredServiceSlugs?.length) {
        const map = new Map(services.map(s => [s.slug, s]));
        const ordered = home.featuredServiceSlugs
          .map(slug => map.get(slug))
          .filter(Boolean) as ServiceContent[];
        setPreviewServices(ordered.slice(0, 8));
      } else {
        setPreviewServices(services.slice(0, 8));
      }
    }).catch(() => {});
  };
  useEffect(fetchHome, []);
  useLiveContent(fetchHome);

  const phrases = content?.heroPhrases?.length ? content.heroPhrases : defaultPhrases;

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [phrases.length]);

  const testimonials = content?.testimonials?.length ? content.testimonials : defaultTestimonials;
  const whyUs = content?.whyUsItems?.length ? content.whyUsItems : defaultWhyUs;
  const oneStopCards = (content?.oneStopCards?.length ? content.oneStopCards : defaultOneStopCards).map((c, i) => ({
    ...c,
    anim: oneStopAnims[i % oneStopAnims.length],
  }));
  const stats = content?.stats?.length ? content.stats : defaultStats;
  const heroVideo = content?.heroVideoUrl || heroVideoDefault;
  const heroImage1 = content?.heroImage1Url || heroImageDefault;
  const heroImage2 = content?.heroImage2Url || heroImageDefault;
  const maruLogo = content?.whyUsLogoUrl || maruLogoDefault;

  return (
    <div className="w-full">

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white py-16 lg:py-0 lg:min-h-[700px] lg:flex lg:items-center">
        {/* Subtle dot pattern background */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, #e2e8f0 1px, transparent 1px)', backgroundSize: '28px 28px', opacity: 0.55 }} />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-6 w-full">
          {/*
            Fixed grid — text col never squishes the collage col.
            Text: 50% | Collage: 50%
          */}
          <div className="flex flex-col lg:grid lg:gap-8 items-center"
            style={{ gridTemplateColumns: '50fr 50fr' }}>

            {/* ── Left: Text Content ── */}
            <motion.div
              className="w-full flex flex-col"
              initial="hidden" animate="show"
              variants={{ show: { transition: { staggerChildren: 0.13 } } }}>

              <motion.h1 variants={fadeUp}
                className="font-semibold mb-6"
                style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(2.4rem, 4.2vw, 3.6rem)', lineHeight: 1.1 }}>
                <span className="text-navy-900 block" style={{ marginBottom: '0.2em' }}>{content?.heroLine1 || 'We bring'}</span>

                {/* Sliding amber phrase — absolutely positioned so its width never
                    affects the grid column or button row layout.
                    inset(0 -9999px 0 0) clips only top/bottom (slide animation)
                    while extending the clipping region far to the right so even
                    the longest phrase ("Labour Compliance") is never cut off. */}
                <span style={{ position: 'relative', display: 'block', height: '1.1em', overflow: 'visible', clipPath: 'inset(0 -9999px 0 0)', marginBottom: '0.2em' }}>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={phraseIndex}
                      initial={{ y: '100%', opacity: 0 }}
                      animate={{ y: '0%', opacity: 1 }}
                      exit={{ y: '-100%', opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                      className="font-semibold"
                      style={{ position: 'absolute', left: 0, top: 0, color: '#fda102', whiteSpace: 'nowrap', fontSize: 'inherit', lineHeight: 1.1 }}>
                      {phrases[phraseIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>

                <span className="text-navy-900 block">{content?.heroLine2 || 'to your growth'}</span>
              </motion.h1>

              <motion.p variants={fadeUp}
                className="text-base leading-relaxed mb-8 max-w-md"
                style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400, color: '#444444', textAlign: 'justify' }}>
                {content?.heroDescription || 'Unlock the potential of your business with our comprehensive HR and compliance solutions. From recruitment to payroll management to compliance, we provide tailored services that ensure your business runs smoothly, efficiently, and in full compliance with all regulations.'}
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-nowrap gap-4 items-center">
                {/* Button 1: Book a Consultation */}
                <Link to="/contact"
                  className="inline-flex items-center gap-2 text-white rounded-full transition-all shadow-lg hover:scale-[1.02] whitespace-nowrap"
                  style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '1rem', letterSpacing: '0.02em', padding: '0.85rem 1.75rem', backgroundColor: '#a83a00', border: '2px solid #fda102' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#fda102'; (e.currentTarget as HTMLElement).style.color = '#111111'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#a83a00'; (e.currentTarget as HTMLElement).style.color = '#ffffff'; }}>
                  {content?.ctaPrimaryText || 'Book a Consultation'} <ArrowRight size={16} />
                </Link>

                {/* Button 2: Compliance Solutions → /services */}
                <Link to="/services"
                  className="inline-flex items-center gap-2 rounded-full transition-all shadow-lg hover:scale-[1.02] whitespace-nowrap"
                  style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '1rem', letterSpacing: '0.02em', padding: '0.85rem 1.75rem', backgroundColor: '#ffffff', color: '#111111', border: '2px solid #fda102' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#fda102'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#ffffff'; }}>
                  {content?.ctaSecondaryText || 'Compliance Solutions'}
                </Link>
              </motion.div>
            </motion.div>

            {/* ── Right: Collage — photo-frame mosaic ──────────────
                Layout (matches reference image):
                ┌───────────────┬──────────────────────────┐
                │               │  Card B (small portrait) │
                │  Card A       ├──────────────────────────┤
                │  (BIG tall    │  Card C (big landscape/  │
                │   portrait)   │   portrait)              │
                └───────────────┴──────────────────────────┘
                Two flex-columns side by side; left is one full-height card,
                right has two stacked cards.
            ──────────────────────────────────────────────── */}
            <motion.div
              className="w-full mt-10 lg:mt-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}>

              <div className="flex gap-3" style={{ height: '620px', paddingLeft: '2%' }}>

                {/* ── Left column: one big tall portrait — VIDEO ── */}
                <div className="flex flex-col" style={{ width: '58%' }}>
                  <motion.div
                    initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.55, delay: 0.3 }}
                    className="rounded-2xl overflow-hidden shadow-sm"
                    style={{ flex: 1 }}>
                    <video
                      src={heroVideo}
                      autoPlay
                      loop
                      muted
                      playsInline
                      aria-hidden="true"
                      className="w-full h-full object-cover"
                      style={{ display: 'block' }}
                    />
                  </motion.div>
                </div>

                {/* ── Right column: small card on top + big card on bottom ── */}
                <div className="flex flex-col gap-3" style={{ width: '42%' }}>

                  {/* Card B — smaller portrait/square on top — IMAGE */}
                  <motion.div
                    initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.4 }}
                    className="rounded-2xl overflow-hidden shadow-sm"
                    style={{ flex: '0 0 42%' }}>
                    <img src={heroImage1} alt="" aria-hidden="true" className="w-full h-full object-cover" />
                  </motion.div>

                  {/* Card C — big card on bottom — IMAGE */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.5 }}
                    className="rounded-2xl overflow-hidden shadow-sm"
                    style={{ flex: 1 }}>
                    <img src={heroImage2} alt="" aria-hidden="true" className="w-full h-full object-cover" />
                  </motion.div>

                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── One Stop Consultancy Partner ─────────────────── */}
      <section className="py-16 overflow-hidden" style={{ backgroundColor: '#a83a00' }}>
        <div className="w-full px-6 lg:px-10">

          {/* Section header */}
          <motion.div className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <p className="font-bold text-sm uppercase tracking-widest mb-3"
              style={{ fontFamily: 'Poppins, sans-serif', color: 'rgba(255,255,255,0.7)' }}>
              {content?.oneStopLabel || 'Your Complete HR & Compliance Partner'}
            </p>
            <h2 className="font-bold text-white leading-[1.15]"
              style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)' }}>
              {content?.oneStopTitle || 'One Stop Consultancy Partner'}
            </h2>
          </motion.div>

          {/* 6-card horizontal grid — always single row */}
          <div className="grid grid-cols-6 gap-4">
            {oneStopCards.map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="flex flex-col items-center text-center rounded-2xl p-10 lg:p-12"
                style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb' }}>

                {/* Lottie animation — larger */}
                <LottieAnim
                  animationData={item.anim}
                  className="w-36 h-36 lg:w-40 lg:h-40 mb-6 shrink-0"
                />

                {/* Title — single line */}
                <h3 className="font-semibold text-gray-900 whitespace-nowrap mb-2"
                  style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1rem', lineHeight: 1.3 }}>
                  {item.title}
                </h3>

                {/* Desc — single line */}
                <p className="whitespace-nowrap"
                  style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.83rem', fontWeight: 400, color: '#6b7280', lineHeight: 1.5 }}>
                  {item.desc}
                </p>

              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Why Labour Law ────────────────────────────────── */}
      <section className="py-16" style={{ backgroundColor: '#f9f5f2' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-stretch">

            {/* ── Left: collage (same as hero) ── */}
            <motion.div
              className="w-full lg:w-[48%] shrink-0 flex flex-col"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}>
              <div className="flex gap-3 h-full">

                {/* Left column: tall video */}
                <div className="flex flex-col" style={{ width: '58%' }}>
                  <div className="rounded-2xl overflow-hidden shadow-md" style={{ flex: 1 }}>
                    <video
                      src={heroVideo}
                      autoPlay loop muted playsInline aria-hidden="true"
                      className="w-full h-full object-cover"
                      style={{ display: 'block' }}
                    />
                  </div>
                </div>

                {/* Right column: two stacked images */}
                <div className="flex flex-col gap-3" style={{ width: '42%' }}>
                  <div className="rounded-2xl overflow-hidden shadow-md" style={{ flex: '0 0 42%' }}>
                    <img src={heroImage1} alt="" aria-hidden="true" className="w-full h-full object-cover" />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-md" style={{ flex: 1 }}>
                    <img src={heroImage2} alt="" aria-hidden="true" className="w-full h-full object-cover" />
                  </div>
                </div>

              </div>
            </motion.div>

            {/* ── Right: white card with text + numbered list ── */}
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}>
              <div className="bg-white rounded-2xl pt-5 pb-8 px-8 lg:pt-6 lg:pb-12 lg:px-12 shadow-xl">

                <img src={maruLogo} alt="Maru Consultancy Services" className="h-20 w-auto object-contain mb-5 mx-auto block" />
                <h2 className="font-bold leading-[1.2] mb-5"
                  style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(1.4rem, 2.4vw, 2rem)', color: '#111111' }}>
                  {content?.whyUsHeading || "Expertise that protects your business & empowers your workforce."}
                </h2>
                <p className="leading-relaxed text-sm mb-8"
                  style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400, color: '#555555' }}>
                  {content?.whyUsBody || "We don't just file paperwork — we architect robust compliance frameworks. With India's labour law landscape shifting under the New Codes, you need a partner who anticipates regulatory changes before they impact your bottom line."}
                </p>

                {/* Numbered rows */}
                <div className="divide-y divide-gray-100">
                  {whyUs.map((item, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
                      className="flex gap-5 py-5 first:pt-0 last:pb-0">
                      <span className="font-bold shrink-0 text-xl leading-none mt-0.5"
                        style={{ fontFamily: 'Poppins, sans-serif', color: '#fda102' }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h4 className="font-semibold mb-1 text-sm"
                          style={{ fontFamily: 'Poppins, sans-serif', color: '#111111' }}>{item.title}</h4>
                        <p className="text-xs leading-relaxed"
                          style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400, color: '#666666' }}>{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Services Preview ──────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          {/* Header */}
          <div className="text-center mb-12 mx-auto">
            <p className="font-bold text-base uppercase tracking-wider mb-3"
              style={{ fontFamily: 'Poppins, sans-serif', color: '#a83a00' }}>{content?.servicesPreviewLabel || 'Our Expertise'}</p>
            <h2 className="font-bold text-navy-900 mb-3 whitespace-nowrap"
              style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)' }}>
              {content?.servicesPreviewTitle || 'Comprehensive Compliance Solutions'}
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed"
              style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400 }}>
              {content?.servicesPreviewDescription || 'Strategic guidance across the entire spectrum of Indian labour laws and human resource management.'}
            </p>
          </div>

          {/* 8-card grid — 4 columns × 2 rows */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {previewServices.map((service, i) => (
              <motion.div key={service._id}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: (i % 4) * 0.08 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group overflow-hidden flex flex-col">

                {/* Image */}
                <div className="h-40 overflow-hidden relative shrink-0">
                  <img src={service.img} alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* Body */}
                <div className="p-5 flex-grow flex flex-col">
                  <h3 className="font-semibold text-navy-900 mb-2 leading-snug text-[0.9rem]"
                    style={{ fontFamily: 'Poppins, sans-serif' }}>{service.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed flex-grow mb-4"
                    style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400 }}>{service.desc}</p>
                  <Link to={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold mt-auto group-hover:gap-2 transition-all"
                    style={{ fontFamily: 'Poppins, sans-serif', color: '#a83a00' }}>
                    Explore Details <ChevronRight size={13} />
                  </Link>
                </div>

              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-10">
            <Link to="/services"
              className="inline-flex items-center gap-2 text-white px-8 py-3.5 rounded-full font-semibold text-sm transition-all hover:opacity-90 hover:scale-[1.02] shadow-md"
              style={{ fontFamily: 'Poppins, sans-serif', backgroundColor: '#a83a00' }}>
              View All Services <ArrowRight size={15} />
            </Link>
          </div>

        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────── */}
      <section className="py-10 relative overflow-hidden" style={{ backgroundColor: '#a83a00' }}>

        {/* Decorative ambient glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-20 blur-3xl"
            style={{ backgroundColor: '#7a2900' }} />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-20 blur-3xl"
            style={{ backgroundColor: '#fda102' }} />
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        </div>

        <div className="relative z-10">

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55 }}
            className="text-center mb-4 px-6">
            <img src={customerReviewIcon} alt="" aria-hidden="true"
              className="mx-auto mb-4"
              style={{ width: '56px', height: '56px', filter: 'brightness(0) saturate(100%) invert(68%) sepia(86%) saturate(607%) hue-rotate(1deg) brightness(101%) contrast(106%)' }} />
            <h2 className="font-bold text-white mb-0"
              style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(1.9rem, 3.2vw, 2.8rem)' }}>
              {content?.testimonialsHeading || 'Trusted by Industry Leaders'}
            </h2>
          </motion.div>

          {/* ── Stats bar — count-up on scroll-into-view ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            className="flex justify-center gap-8 md:gap-16 mb-8 px-6 flex-wrap">
            {stats.map(({ target, decimals, suffix, label }) => (
              <div key={label} className="text-center">
                <p className="font-bold text-3xl mb-1"
                  style={{ fontFamily: 'Poppins, sans-serif', color: '#fda102', WebkitTextFillColor: '#fda102', background: 'none' }}>
                  <StatCounter target={target} decimals={decimals} suffix={suffix} />
                </p>
                <p className="text-xs uppercase tracking-widest"
                  style={{ fontFamily: 'Poppins, sans-serif', color: '#ffffff' }}>{label}</p>
              </div>
            ))}
          </motion.div>

          {/* ── Scrolling card strip ── */}
          <div className="overflow-hidden relative">

            <div className="animate-marquee-testimonials pb-2">
              {[...testimonials, ...testimonials].map((test, i) => (
                <div key={i}
                  className="shrink-0 mx-4 rounded-2xl flex flex-col relative overflow-hidden bg-white"
                  style={{
                    width: '360px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                  }}>
                  {/* Solid amber top accent bar */}
                  <div className="h-[4px] w-full"
                    style={{ backgroundColor: '#fda102' }} />

                  <div className="p-7 flex flex-col flex-grow">
                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={14} fill="#fda102" color="#fda102" />
                      ))}
                    </div>

                    {/* Quote text */}
                    <p className="text-sm leading-relaxed mb-7 flex-grow"
                      style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400, color: '#333333' }}>
                      {test.text}
                    </p>

                    {/* Divider */}
                    <div className="h-px mb-5" style={{ backgroundColor: '#f0f0f0' }} />

                    {/* Author row */}
                    <div className="flex items-center gap-3.5">
                      {/* Avatar with amber ring */}
                      <div className="p-[2.5px] rounded-full shrink-0"
                        style={{ background: 'linear-gradient(135deg, #fda102, #a83a00)' }}>
                        <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                          style={{ backgroundColor: '#fff7ed', color: '#a83a00', fontFamily: 'Poppins, sans-serif' }}>
                          {test.author.charAt(0)}
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold text-sm leading-none mb-1"
                          style={{ fontFamily: 'Poppins, sans-serif', color: '#111111' }}>{test.author}</p>
                        <p className="text-xs"
                          style={{ fontFamily: 'Poppins, sans-serif', color: '#888888' }}>{test.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Scrolling Client Logos — two rows, opposite directions ── */}
      <section className="py-14 bg-white border-y border-gray-100 overflow-hidden">
        {/* Section label */}
        <p className="text-center font-semibold uppercase tracking-[0.25em] mb-10"
          style={{ fontFamily: 'Poppins, sans-serif', fontSize: '11px', color: '#a83a00' }}>
          Serving 500+ Corporations Across India
        </p>

        {/* Row 1 — scrolls LEFT */}
        <div className="overflow-hidden relative mb-8">
          <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          <div className="animate-marquee">
            {[...ALL_CLIENTS, ...ALL_CLIENTS].map(({ name, Logo }, i) => (
              <div key={i} title={name}
                className="flex items-center justify-center mx-12 shrink-0 h-20 cursor-default opacity-75 hover:opacity-100 transition-opacity duration-300">
                <Logo />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls RIGHT (reversed list for visual variety) */}
        <div className="overflow-hidden relative">
          <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          <div className="animate-marquee-reverse">
            {[...[...ALL_CLIENTS].reverse(), ...[...ALL_CLIENTS].reverse()].map(({ name, Logo }, i) => (
              <div key={i} title={name}
                className="flex items-center justify-center mx-12 shrink-0 h-20 cursor-default opacity-75 hover:opacity-100 transition-opacity duration-300">
                <Logo />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recent Insights ───────────────────────────────── */}
      <section className="py-20 bg-[#f8fafb]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="font-bold tracking-[0.18em] uppercase text-xs mb-2"
                style={{ fontFamily: 'Poppins, sans-serif', color: '#a83a00' }}>Latest Insights</p>
              <h2 className="text-3xl md:text-4xl font-bold text-navy-900"
                style={{ fontFamily: 'Poppins, sans-serif' }}>Stay informed with expert guidance</h2>
            </div>
            <Link to="/resources"
              className="hidden md:flex items-center gap-2 text-navy-900 font-semibold text-sm hover:text-teal-600 transition-colors border-b border-navy-900 hover:border-teal-600 pb-0.5">
              View All <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {(content?.latestInsights?.length ? content.latestInsights : [
              { category: 'New Labour Codes', title: 'Understanding the New Wage Code', desc: 'A comprehensive guide to how the new definitions of wages impact your salary structure and PF contributions.', img: '/assets/service-payroll.png', date: 'Oct 15, 2024', articleUrl: '/resources' },
              { category: 'Compliance', title: 'Navigating State-Specific Leave Policies', desc: 'Analyzing the variations in sick, casual, and earned leaves across different Indian states.', img: '/assets/service-hr.png', date: 'Oct 02, 2024', articleUrl: '/resources' },
              { category: 'Labour Audit', title: 'Preparing for Labour Inspections', desc: 'Key documents and statutory registers you must have updated before an unexpected factory inspection.', img: '/assets/service-audits.png', date: 'Sep 28, 2024', articleUrl: '/resources' },
            ]).map((post, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col group">
                <div className="relative overflow-hidden h-48">
                  <img src={post.img} alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 bg-teal-500 text-white text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider">
                    {post.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-[11px] text-teal-500 font-semibold mb-2 uppercase tracking-wider">{post.date}</p>
                  <h3 className="text-base font-display font-bold text-navy-900 mb-3 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-500 text-sm mb-5 flex-grow leading-relaxed">{post.desc}</p>
                  <Link to={post.articleUrl || '/resources'}
                    className="text-teal-600 font-bold text-sm flex items-center gap-1.5 hover:text-navy-900 transition-colors mt-auto">
                    Read Article <ChevronRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────── */}
      <section className="py-0 overflow-hidden" style={{ backgroundColor: '#a83a00' }}>
        <div className="w-full flex flex-col md:flex-row items-stretch">

          {/* Left — text content */}
          <motion.div
            initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55 }}
            className="md:w-1/2 flex flex-col justify-center px-10 py-16 lg:px-16 lg:py-20">
            <h2
              className="font-bold text-white mb-5 leading-tight"
              style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}>
              Ready to secure your compliance?
            </h2>
            <p
              className="text-base leading-relaxed mb-8"
              style={{ fontFamily: 'Poppins, sans-serif', color: 'rgba(255,255,255,0.85)' }}>
              Schedule a detailed consultation with our legal experts to audit your current HR practices and identify risks before they become liabilities.
            </p>
            <div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full font-bold text-white text-base shadow-lg transition-all duration-200"
                style={{ fontFamily: 'Poppins, sans-serif', backgroundColor: '#fda102' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = '#e8920a';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.25)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = '#fda102';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '';
                }}>
                Schedule Consultation <ArrowRight size={17} />
              </Link>
            </div>
          </motion.div>

          {/* Right — image, flush to edge */}
          <motion.div
            initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }}
            className="flex-1 min-h-[320px] md:min-h-0 relative">
            <img
              src="/assets/cta-gavel.png"
              alt="Labour law compliance gavel"
              className="w-full h-full object-cover object-center"
              style={{ display: 'block', minHeight: '320px', maxHeight: '480px' }}
            />
          </motion.div>

        </div>
      </section>
    </div>
  );
};

export default Home;
