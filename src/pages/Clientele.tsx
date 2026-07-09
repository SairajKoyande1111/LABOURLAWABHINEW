import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Factory, Landmark, Monitor, ShoppingBag, HeartPulse, Building2, Truck, Layers } from 'lucide-react';
import { ALL_CLIENTS, HdfcLogo, TataLogo, RelianceLogo, InfosysLogo, WiproLogo, MahindraLogo, LandTLogo, ItcLogo, GodrejLogo, BajajLogo } from '../components/ClientLogos';
import { useInView } from 'framer-motion';
import customerReviewIcon from '@assets/customer-review_1783487769231.png';

const PP = 'Poppins, sans-serif';

/* ── Animated count-up ── */
function StatCounter({ target, decimals = 0, suffix = '' }: { target: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [display, setDisplay] = useState('0');
  useEffect(() => {
    if (!isInView) return;
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const eased = 1 - Math.pow(1 - Math.min((now - start) / duration, 1), 3);
      setDisplay((eased * target).toFixed(decimals));
      if (eased < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, target, decimals]);
  return <span ref={ref}>{display}{suffix}</span>;
}

/* ── Industries data ── */
const INDUSTRIES = [
  {
    icon: Factory,
    name: 'Manufacturing',
    count: '120+',
    color: '#a83a00',
    desc: 'Factories Act compliance, CLRA registrations, contract labour management, and welfare officer appointments across automotive, textile, and heavy engineering sectors.',
    tags: ['Factories Act', 'CLRA', 'Welfare', 'Safety'],
  },
  {
    icon: Landmark,
    name: 'Banking & Finance',
    count: '85+',
    color: '#a83a00',
    desc: 'Shops & Establishments compliance, ESI/PF management, POSH policies, and multi-state HR policy frameworks for banks, NBFCs, and insurance companies.',
    tags: ['Shops Act', 'POSH', 'ESI & PF', 'HR Policy'],
  },
  {
    icon: Monitor,
    name: 'Information Technology',
    count: '95+',
    color: '#a83a00',
    desc: 'Flexible workforce compliance, moonlighting policies, POSH training, and gig worker regulations for IT services, SaaS platforms, and tech startups.',
    tags: ['Gig Workforce', 'POSH', 'New Codes', 'Policies'],
  },
  {
    icon: ShoppingBag,
    name: 'Retail & FMCG',
    count: '70+',
    color: '#a83a00',
    desc: 'Multi-state Shops Act registrations, seasonal staffing compliance, minimum wages monitoring, and contract labour management for retail chains and FMCG distributors.',
    tags: ['Shops Act', 'Minimum Wages', 'Contract Labour', 'Staffing'],
  },
  {
    icon: HeartPulse,
    name: 'Healthcare & Pharma',
    count: '55+',
    color: '#a83a00',
    desc: 'Compliance frameworks for hospitals, clinics, and pharma plants covering duty rosters, overtime regulations, factory licences, and drug establishment rules.',
    tags: ['Factory Licence', 'OT Rules', 'ESI', 'Audit'],
  },
  {
    icon: Building2,
    name: 'Hospitality',
    count: '45+',
    color: '#a83a00',
    desc: 'Hotels & restaurant compliance including contract staff management, gratuity fund administration, tip policies, and state-specific Shops Act requirements.',
    tags: ['Gratuity', 'Contract Staff', 'Shops Act', 'Licensing'],
  },
  {
    icon: Truck,
    name: 'Logistics & Infrastructure',
    count: '60+',
    color: '#a83a00',
    desc: 'Pan-India compliance for logistics companies and infrastructure firms — interstate worker regulations, construction worker welfare boards, and labour cess.',
    tags: ['BOCW', 'Labour Cess', 'ESI & PF', 'Pan-India'],
  },
  {
    icon: Layers,
    name: 'Others',
    count: '70+',
    color: '#a83a00',
    desc: 'Diverse sectors including education, NGOs, media, and professional services — all supported with tailored labour law advisory and compliance management.',
    tags: ['Advisory', 'Audits', 'Training', 'Policy'],
  },
];

/* ── Sector-wise clients ── */
const SECTOR_CLIENTS: Record<string, { name: string; Logo: () => JSX.Element }[]> = {
  'Manufacturing & Conglomerates': [
    { name: 'Tata', Logo: TataLogo },
    { name: 'Mahindra', Logo: MahindraLogo },
    { name: 'L&T', Logo: LandTLogo },
    { name: 'Reliance', Logo: RelianceLogo },
    { name: 'ITC', Logo: ItcLogo },
    { name: 'Godrej', Logo: GodrejLogo },
  ],
  'Banking & Finance': [
    { name: 'HDFC Bank', Logo: HdfcLogo },
    { name: 'Bajaj', Logo: BajajLogo },
  ],
  'Information Technology': [
    { name: 'Infosys', Logo: InfosysLogo },
    { name: 'Wipro', Logo: WiproLogo },
  ],
};

/* ── Testimonials ── */
const TESTIMONIALS = [
  { text: "Maru Consultancy transformed our chaotic compliance process into a streamlined, risk-free system. Their expertise in the New Wage Code is unmatched in the industry.", author: "Rajesh Sharma", role: "HR Director, TechNova" },
  { text: "Their proactive approach to statutory audits saved us from significant penalties. They don't just consult — they become an extension of your team.", author: "Meera Reddy", role: "CEO, Manufacturing Corp" },
  { text: "The contract staffing solutions allowed us to scale rapidly during our peak season without any compliance headaches whatsoever.", author: "Vikram Singh", role: "VP Operations, Retail Giant" },
  { text: "Maru Consultancy's compliance framework saved us lakhs in potential penalties. Their team anticipates regulatory changes before they even happen.", author: "Priya Kapoor", role: "CFO, Apex Industries" },
  { text: "We have expanded to 6 states and Maru handled every state-specific compliance requirement seamlessly. Truly a pan-India expert partner.", author: "Arun Nair", role: "MD, Sunrise Textiles" },
  { text: "The statutory filing support is impeccable — PF, ESIC, PT all managed without a single deadline miss in over three years.", author: "Sneha Joshi", role: "Head HR, BuildRight Infra" },
  { text: "Outstanding legal representation before the labour tribunal. The case was resolved in our favour and the whole process was stress-free.", author: "Deepak Mehta", role: "Director, Meridian Logistics" },
  { text: "Their HR policy advisory helped us modernise our standing orders in line with the new codes. Employees and management are both happy.", author: "Kavitha Rao", role: "CHRO, NovaMed Healthcare" },
];

const Clientele = () => {
  const [activeSector, setActiveSector] = useState('Manufacturing & Conglomerates');
  const sectors = Object.keys(SECTOR_CLIENTS);

  return (
    <div className="w-full" style={{ fontFamily: PP }}>

      {/* ── Hero ── */}
      <section className="flex items-center justify-center overflow-hidden relative"
        style={{ backgroundColor: '#a83a00', minHeight: '200px', maxHeight: '300px', height: '38vh' }}>
        <div className="absolute top-[-60px] right-[-60px] w-[320px] h-[320px] rounded-full opacity-10 pointer-events-none"
          style={{ backgroundColor: '#fda102' }} />
        <div className="absolute bottom-[-80px] left-[-40px] w-[240px] h-[240px] rounded-full opacity-8 pointer-events-none"
          style={{ backgroundColor: '#7a2900' }} />
        <motion.div
          initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center px-8 w-full max-w-4xl mx-auto relative z-10">
          <p className="uppercase tracking-[0.3em] font-semibold mb-2"
            style={{ fontFamily: PP, fontSize: '0.9rem', color: '#fda102' }}>
            Trusted Partners
          </p>
          <h1 className="font-bold mb-3"
            style={{ fontFamily: PP, fontSize: 'clamp(1.4rem, 3vw, 2.6rem)', color: '#fff' }}>
            Our Esteemed Clientele
          </h1>
          <p style={{
            fontFamily: PP, fontSize: 'clamp(0.88rem, 1.3vw, 1rem)',
            color: 'rgba(255,255,255,0.82)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7,
          }}>
            Trusted by 500+ corporations across India to navigate complex labour law and stay fully compliant.
          </p>
        </motion.div>
      </section>

      {/* ── Stats bar ── */}
      <section className="bg-white border-b border-gray-100 py-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-wrap justify-center gap-10 md:gap-20">
          {[
            { target: 500, suffix: '+', label: 'Clients Served' },
            { target: 15,  suffix: '+', label: 'Years of Expertise' },
            { target: 8,   suffix: '+', label: 'Industries' },
            { target: 98,  suffix: '%', label: 'Retention Rate' },
          ].map(({ target, suffix, label }) => (
            <div key={label} className="text-center">
              <p className="font-bold text-3xl mb-1"
                style={{ fontFamily: PP, color: '#a83a00' }}>
                <StatCounter target={target} suffix={suffix} />
              </p>
              <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold"
                style={{ fontFamily: PP }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Industries We Serve ── */}
      <section className="py-16" style={{ backgroundColor: '#f8fafb' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="font-bold tracking-[0.25em] uppercase text-xs mb-2"
              style={{ fontFamily: PP, color: '#a83a00' }}>Industry Spread</p>
            <h2 className="font-bold mb-3"
              style={{ fontFamily: PP, fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#111' }}>
              Sectors We Serve
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto"
              style={{ fontFamily: PP, fontSize: '1rem', lineHeight: 1.7 }}>
              Our compliance expertise spans every major sector of the Indian economy — from factory floors to fintech offices.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {INDUSTRIES.map((ind, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.45 }}
                className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-lg hover:border-[rgba(168,58,0,0.2)] transition-all group">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(168,58,0,0.08)' }}>
                    <ind.icon size={22} style={{ color: '#a83a00' }} />
                  </div>
                  <span className="font-bold text-2xl" style={{ fontFamily: PP, color: '#a83a00' }}>
                    {ind.count}
                  </span>
                </div>
                <h3 className="font-bold mb-2" style={{ fontFamily: PP, fontSize: '1.05rem', color: '#111' }}>
                  {ind.name}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5" style={{ fontFamily: PP }}>
                  {ind.desc}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {ind.tags.map(tag => (
                    <span key={tag} className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ fontFamily: PP, backgroundColor: 'rgba(168,58,0,0.07)', color: '#a83a00' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sector-wise Clients ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <p className="font-bold tracking-[0.25em] uppercase text-xs mb-2"
              style={{ fontFamily: PP, color: '#a83a00' }}>Our Portfolio</p>
            <h2 className="font-bold mb-3"
              style={{ fontFamily: PP, fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#111' }}>
              Companies We've Served
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto"
              style={{ fontFamily: PP, fontSize: '1rem', lineHeight: 1.7 }}>
              From nimble startups to Fortune 500 conglomerates — our expertise spans every scale of Indian industry.
            </p>
          </div>

          {/* Sector tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {sectors.map(sector => (
              <button key={sector}
                onClick={() => setActiveSector(sector)}
                className="px-5 py-2.5 rounded-full font-semibold text-sm transition-all border"
                style={{
                  fontFamily: PP,
                  backgroundColor: activeSector === sector ? '#a83a00' : '#fff',
                  color: activeSector === sector ? '#fff' : '#a83a00',
                  borderColor: activeSector === sector ? '#a83a00' : 'rgba(168,58,0,0.25)',
                }}>
                {sector}
              </button>
            ))}
          </div>

          {/* Logos grid */}
          <motion.div
            key={activeSector}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {(SECTOR_CLIENTS[activeSector] || []).map(({ name, Logo }, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.07 }}
                className="bg-[#f8fafb] border border-gray-100 aspect-[3/2] rounded-2xl flex items-center justify-center px-8 shadow-sm hover:shadow-md hover:border-[rgba(168,58,0,0.2)] transition-all"
                title={name}>
                <Logo />
              </motion.div>
            ))}
          </motion.div>

          {/* Scrolling all-client strip */}
          <div className="mt-14 pt-10 border-t border-gray-100">
            <p className="text-center font-semibold uppercase tracking-[0.25em] mb-8 text-xs"
              style={{ fontFamily: PP, color: '#a83a00' }}>
              Serving 500+ Corporations Across India
            </p>
            <div className="overflow-hidden relative">
              <div className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to right, #fff, transparent)' }} />
              <div className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to left, #fff, transparent)' }} />
              <div className="animate-marquee pb-2">
                {[...ALL_CLIENTS, ...ALL_CLIENTS].map(({ name, Logo }, i) => (
                  <div key={i} title={name}
                    className="shrink-0 mx-4 bg-[#f8fafb] border border-gray-100 rounded-xl px-8 flex items-center justify-center hover:border-[rgba(168,58,0,0.2)] transition-all"
                    style={{ width: '180px', height: '80px' }}>
                    <Logo />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials (same marquee as Home) ── */}
      <section className="py-10 relative overflow-hidden" style={{ backgroundColor: '#a83a00' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-20 blur-3xl"
            style={{ backgroundColor: '#7a2900' }} />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-20 blur-3xl"
            style={{ backgroundColor: '#fda102' }} />
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        </div>

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55 }}
            className="text-center mb-4 px-6">
            <img src={customerReviewIcon} alt="" aria-hidden="true"
              className="mx-auto mb-4"
              style={{ width: '56px', height: '56px', filter: 'brightness(0) saturate(100%) invert(68%) sepia(86%) saturate(607%) hue-rotate(1deg) brightness(101%) contrast(106%)' }} />
            <h2 className="font-bold text-white mb-0"
              style={{ fontFamily: PP, fontSize: 'clamp(1.9rem, 3.2vw, 2.8rem)' }}>
              Trusted by Industry Leaders
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            className="flex justify-center gap-8 md:gap-16 mb-8 px-6 flex-wrap">
            {[
              { target: 500, suffix: '+',  label: 'Clients Served' },
              { target: 4.9, decimals: 1, suffix: '★', label: 'Average Rating' },
              { target: 15,  suffix: '+',  label: 'Years of Expertise' },
              { target: 98,  suffix: '%',  label: 'Retention Rate' },
            ].map(({ target, decimals, suffix, label }) => (
              <div key={label} className="text-center">
                <p className="font-bold text-3xl mb-1"
                  style={{ fontFamily: PP, color: '#fda102' }}>
                  <StatCounter target={target} decimals={decimals} suffix={suffix} />
                </p>
                <p className="text-xs uppercase tracking-widest text-white" style={{ fontFamily: PP }}>{label}</p>
              </div>
            ))}
          </motion.div>

          <div className="overflow-hidden relative">
            <div className="animate-marquee-testimonials pb-2">
              {[...TESTIMONIALS, ...TESTIMONIALS].map((test, i) => (
                <div key={i}
                  className="shrink-0 mx-4 rounded-2xl flex flex-col relative overflow-hidden bg-white"
                  style={{ width: '360px', boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}>
                  <div className="h-[4px] w-full" style={{ backgroundColor: '#fda102' }} />
                  <div className="p-7 flex flex-col flex-grow">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={14} fill="#fda102" color="#fda102" />
                      ))}
                    </div>
                    <p className="text-sm leading-relaxed mb-7 flex-grow"
                      style={{ fontFamily: PP, color: '#333' }}>
                      "{test.text}"
                    </p>
                    <div className="h-px mb-5" style={{ backgroundColor: '#f0f0f0' }} />
                    <div className="flex items-center gap-3.5">
                      <div className="p-[2.5px] rounded-full shrink-0"
                        style={{ background: 'linear-gradient(135deg, #fda102, #a83a00)' }}>
                        <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                          style={{ backgroundColor: '#fff7ed', color: '#a83a00', fontFamily: PP }}>
                          {test.author.charAt(0)}
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold text-sm leading-none mb-1"
                          style={{ fontFamily: PP, color: '#111' }}>{test.author}</p>
                        <p className="text-xs" style={{ fontFamily: PP, color: '#888' }}>{test.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <motion.p
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.4 }}
            className="font-bold uppercase tracking-[0.25em] text-xs mb-3"
            style={{ fontFamily: PP, color: '#a83a00' }}>
            Join Our Clientele
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.07 }}
            className="font-bold mb-4"
            style={{ fontFamily: PP, fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#111' }}>
            Join Industry Leaders Who Trust Maru Consultancy
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.14 }}
            className="text-gray-500 mb-8 leading-relaxed"
            style={{ fontFamily: PP, fontSize: '1rem' }}>
            Let's discuss how we can support your compliance and HR requirements across every state you operate in.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.2 }}>
            <Link to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm shadow-lg transition-opacity hover:opacity-90"
              style={{ fontFamily: PP, backgroundColor: '#a83a00', color: '#fff' }}>
              Discuss Your Requirements <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Clientele;
