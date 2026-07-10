
import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FileText, Phone, ChevronRight, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '../lib/api';
import { useLiveContent } from '../hooks/useLiveContent';
import type { ServiceContent } from '../types/content';

const PP = 'Poppins, sans-serif';

const ServiceDetail = () => {
  const { slug } = useParams();
  const [detail, setDetail] = useState<ServiceContent | null>(null);
  const [allServices, setAllServices] = useState<ServiceContent[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'not-found' | 'error'>('loading');

  const detailReqRef = useRef(0);
  const fetchDetail = () => {
    const reqId = ++detailReqRef.current;
    const currentSlug = slug;
    api.get<ServiceContent>(`/services/${currentSlug}`)
      .then((data) => {
        if (reqId !== detailReqRef.current) return; // a newer request already resolved/superseded this one
        setDetail(data); setStatus('ready');
      })
      .catch((err) => {
        if (reqId !== detailReqRef.current) return;
        setStatus(err?.status === 404 ? 'not-found' : 'error');
      });
  };
  useEffect(() => {
    setDetail(null);
    setStatus('loading');
    fetchDetail();
  }, [slug]);
  useLiveContent(fetchDetail);

  const fetchAllServices = () => {
    api.get<ServiceContent[]>('/services').then(setAllServices).catch(() => {});
  };
  useEffect(fetchAllServices, []);
  useLiveContent(fetchAllServices);

  const title = detail?.title || slug?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || 'Service';
  const otherServices = allServices.filter((s) => s.slug !== slug);
  const related = otherServices.slice(0, 3).map((s) => ({ name: s.title, slug: s.slug }));

  if (status === 'loading') {
    return <div className="min-h-screen" style={{ fontFamily: PP }} />;
  }

  if (status === 'not-found' || status === 'error') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ fontFamily: PP }}>
        <p className="text-gray-500 mb-4">
          {status === 'not-found' ? 'Service not found.' : 'Unable to load this service right now.'}
        </p>
        <Link to="/services" className="font-semibold" style={{ color: '#a83a00' }}>
          ← Back to Services
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full" style={{ fontFamily: PP }}>

      {/* ── Hero ── */}
      <section
        className="flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: '#a83a00', minHeight: '200px', maxHeight: '300px', height: '38vh' }}>

        <motion.div
          initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center px-8 w-full max-w-7xl mx-auto">

          <p
            className="uppercase tracking-[0.3em] font-semibold mb-2 whitespace-nowrap"
            style={{ fontFamily: PP, fontSize: '0.95rem', color: '#fda102' }}>
            {detail?.subhead || 'Our Services'}
          </p>

          <h1
            className="uppercase leading-none mb-3 whitespace-nowrap"
            style={{
              fontFamily: PP,
              fontSize: 'max(1.1rem, 2vw)',
              fontWeight: 700,
              letterSpacing: '0.05em',
              color: '#ffffff',
            }}>
            {detail?.headline || title}
          </h1>

          <p
            style={{
              fontFamily: PP,
              fontSize: 'clamp(0.88rem, 1.3vw, 1rem)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.82)',
              maxWidth: '680px',
              margin: '0 auto',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              lineHeight: '1.55',
            }}>
            {detail?.intro}
          </p>
        </motion.div>
      </section>

      {/* ── Big Image Banner — true full-width ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="w-full overflow-hidden"
        style={{ height: 'clamp(240px, 38vw, 500px)' }}>
        <img
          src={detail?.img || '/assets/service-labour.png'}
          alt={title}
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 30%' }}
        />
      </motion.div>

      {/* ── Main Content ── */}
      <section className="py-16 bg-[#f8fafb]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col lg:flex-row gap-10">

          {/* ── Body Column ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:w-2/3 space-y-8">

            {/* Body Text */}
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
              <h2
                className="font-bold mb-6"
                style={{ fontFamily: PP, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#111', lineHeight: 1.25 }}>
                About This Service
              </h2>
              {detail?.body?.split('\n\n').map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  className="text-gray-600 leading-relaxed mb-4"
                  style={{ fontFamily: PP, fontSize: 'clamp(0.97rem, 1.3vw, 1.08rem)', fontWeight: 400, lineHeight: 1.8, textAlign: 'justify' }}>
                  {para}
                </motion.p>
              ))}
            </div>

            {/* Key Deliverables — pointer format */}
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
              <h2
                className="font-bold mb-2"
                style={{ fontFamily: PP, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#111' }}>
                What You Get
              </h2>
              <p className="text-gray-400 mb-8 text-sm" style={{ fontFamily: PP }}>
                Everything included in this service — delivered end-to-end.
              </p>

              <div className="space-y-4">
                {(detail?.deliverables || []).map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.38, delay: i * 0.07 }}
                    className="flex items-start gap-5 group">

                    {/* Number badge */}
                    <div
                      className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm mt-0.5 transition-all group-hover:scale-110"
                      style={{ backgroundColor: 'rgba(168,58,0,0.08)', color: '#a83a00', fontFamily: PP }}>
                      {String(i + 1).padStart(2, '0')}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-4 border-b border-gray-100 last:border-0">
                      <h4
                        className="font-semibold mb-1"
                        style={{ fontFamily: PP, fontSize: '1.05rem', color: '#111' }}>
                        {item.title}
                      </h4>
                      <p
                        className="text-gray-500 leading-relaxed"
                        style={{ fontFamily: PP, fontSize: '0.92rem', lineHeight: 1.7 }}>
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Related Services */}
            {related.length > 0 && (
              <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
                <h2
                  className="font-bold mb-6"
                  style={{ fontFamily: PP, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#111' }}>
                  Related Services
                </h2>
                <div className="flex flex-wrap gap-3">
                  {related.map((r, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.07 }}>
                      <Link
                        to={`/services/${r.slug}`}
                        className="inline-flex items-center gap-2 font-medium px-5 py-3 rounded-full transition-all border hover:shadow-md"
                        style={{
                          fontFamily: PP,
                          fontSize: '0.92rem',
                          color: '#a83a00',
                          backgroundColor: 'rgba(168,58,0,0.06)',
                          borderColor: 'rgba(168,58,0,0.2)',
                        }}>
                        <ArrowRight size={14} /> {r.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* ── Sidebar ── */}
          <div className="lg:w-1/3">
            <div className="sticky top-28 space-y-6">

              {/* CTA Card */}
              <motion.div
                initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-2xl overflow-hidden shadow-lg border border-gray-100">

                <div className="p-2" style={{ backgroundColor: '#a83a00' }}>
                  <p className="text-center text-xs font-semibold uppercase tracking-widest" style={{ color: '#fda102', fontFamily: PP }}>
                    Get Expert Advice
                  </p>
                </div>

                <div className="bg-white p-8">
                  <h3
                    className="font-bold mb-3"
                    style={{ fontFamily: PP, fontSize: '1.35rem', color: '#111', lineHeight: 1.3 }}>
                    Ready to secure your compliance?
                  </h3>
                  <p
                    className="text-gray-500 mb-7 leading-relaxed"
                    style={{ fontFamily: PP, fontSize: '0.93rem', lineHeight: 1.7 }}>
                    Speak directly with our legal experts to discuss how this service applies to your specific industry and workforce size.
                  </p>
                  <div className="space-y-3">
                    <Link
                      to="/contact"
                      className="w-full text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-md transition-opacity hover:opacity-90"
                      style={{ backgroundColor: '#a83a00', fontFamily: PP, fontSize: '0.95rem' }}>
                      <FileText size={16} /> Request Proposal
                    </Link>
                    <a
                      href="tel:+919876543210"
                      className="w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 border-2 transition-all hover:bg-[#a83a00] hover:text-white"
                      style={{ fontFamily: PP, fontSize: '0.95rem', color: '#a83a00', borderColor: '#a83a00', backgroundColor: 'transparent' }}>
                      <Phone size={16} /> Call Now
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Other Services */}
              <motion.div
                initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white p-7 rounded-2xl border border-gray-100 shadow-sm">
                <h4
                  className="font-bold mb-5 uppercase tracking-widest text-xs"
                  style={{ fontFamily: PP, color: '#a83a00' }}>
                  Other Services
                </h4>
                <ul className="space-y-0.5">
                  {otherServices.map((s) => (
                    <li key={s._id}>
                      <Link
                        to={`/services/${s.slug}`}
                        className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0 group transition-colors hover:text-[#a83a00]"
                        style={{ fontFamily: PP, color: '#333', fontSize: '0.9rem', fontWeight: 500 }}>
                        <ChevronRight size={14} className="text-gray-300 group-hover:text-[#a83a00] transition-colors shrink-0" />
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* ── Latest Insights ── */}
      <section className="py-20 bg-[#f8fafb]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="font-bold tracking-[0.18em] uppercase text-xs mb-2"
                style={{ fontFamily: PP, color: '#a83a00' }}>Latest Insights</p>
              <h2 className="text-3xl md:text-4xl font-bold"
                style={{ fontFamily: PP, color: '#111' }}>Stay informed with expert guidance</h2>
            </div>
            <Link to="/resources"
              className="hidden md:flex items-center gap-2 font-semibold text-sm transition-colors border-b pb-0.5 hover:opacity-70"
              style={{ fontFamily: PP, color: '#111', borderColor: '#111' }}>
              View All <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {[
              { category: 'New Labour Codes', title: 'Understanding the New Wage Code', desc: 'A comprehensive guide to how the new definitions of wages impact your salary structure and PF contributions.', img: '/assets/service-payroll.png', date: 'Oct 15, 2024' },
              { category: 'Compliance', title: 'Navigating State-Specific Leave Policies', desc: 'Analyzing the variations in sick, casual, and earned leaves across different Indian states.', img: '/assets/service-hr.png', date: 'Oct 02, 2024' },
              { category: 'Labour Audit', title: 'Preparing for Labour Inspections', desc: 'Key documents and statutory registers you must have updated before an unexpected factory inspection.', img: '/assets/service-audits.png', date: 'Sep 28, 2024' },
            ].map((post, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col group">
                <div className="relative overflow-hidden h-48">
                  <img src={post.img} alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 text-white text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider"
                    style={{ backgroundColor: '#a83a00' }}>
                    {post.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-[11px] font-semibold mb-2 uppercase tracking-wider"
                    style={{ color: '#a83a00', fontFamily: PP }}>{post.date}</p>
                  <h3 className="text-base font-bold mb-3 line-clamp-2"
                    style={{ fontFamily: PP, color: '#111' }}>{post.title}</h3>
                  <p className="text-gray-500 text-sm mb-5 flex-grow leading-relaxed"
                    style={{ fontFamily: PP }}>{post.desc}</p>
                  <Link to="/resources"
                    className="font-bold text-sm flex items-center gap-1.5 transition-colors mt-auto hover:opacity-70"
                    style={{ color: '#a83a00', fontFamily: PP }}>
                    Read Article <ChevronRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
