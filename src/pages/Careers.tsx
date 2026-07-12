import { useState, useEffect } from 'react';
import { MapPin, Briefcase, Clock, ArrowRight, ChevronRight, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';
import { useLiveContent } from '../hooks/useLiveContent';
import type { JobContent, CareersPageContent } from '../types/content';

const PP = 'Poppins, sans-serif';

const HERO_DEFAULTS: CareersPageContent = {
  heroEyebrow: 'Join Our Team',
  heroHeading: 'Build a Career That Matters',
  heroSubtext: "Channel your passion for labour and industrial law into a meaningful career at India's premier compliance advisory firm.",
  heroBgType: 'video',
  heroVideoUrl: '',
  heroImageUrl: '',
};

const Careers = () => {
  const [activeTab, setActiveTab] = useState<'internal' | 'client'>('internal');
  const [jobs, setJobs] = useState<JobContent[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [hero, setHero] = useState<CareersPageContent>(HERO_DEFAULTS);

  const fetchJobs = () => {
    api.get<JobContent[]>('/careers')
      .then((data) => { setJobs(data); setStatus('ready'); })
      .catch(() => setStatus('error'));
  };
  useEffect(fetchJobs, []);
  useLiveContent(fetchJobs);

  const fetchHero = () => {
    api.get<CareersPageContent>('/careers-page').then(setHero).catch(() => {});
  };
  useEffect(fetchHero, []);
  useLiveContent(fetchHero);

  const internalJobs = jobs.filter(j => j.category === 'internal');
  const clientJobs = jobs.filter(j => j.category === 'client');
  const displayed = activeTab === 'internal' ? internalJobs : clientJobs;

  return (
    <div className="w-full" style={{ fontFamily: PP }}>

      {/* ── Hero — Video/Image Background ── */}
      <section className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: '420px', height: '56vh', maxHeight: '580px' }}>

        {/* Background */}
        {hero.heroBgType === 'image' && hero.heroImageUrl ? (
          <img
            src={hero.heroImageUrl}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{ zIndex: 0 }}
          />
        ) : (
          <video
            key={hero.heroVideoUrl || 'default'}
            autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ zIndex: 0 }}>
            <source src={hero.heroVideoUrl || '/assets/careers-hero.mp4'} type="video/mp4" />
          </video>
        )}

        {/* Dark overlay for readability */}
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.52)', zIndex: 1 }} />

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative text-center px-8 w-full max-w-4xl mx-auto"
          style={{ zIndex: 2 }}>

          <p className="uppercase tracking-[0.3em] font-semibold mb-3"
            style={{ fontFamily: PP, fontSize: '1.05rem', color: '#fda102' }}>
            {hero.heroEyebrow}
          </p>
          <h1 className="font-bold mb-5 leading-none whitespace-nowrap"
            style={{ fontFamily: PP, fontSize: 'clamp(1.8rem, 4.2vw, 3.8rem)', color: '#fff' }}>
            {hero.heroHeading}
          </h1>
          <p style={{
            fontFamily: PP,
            fontSize: 'clamp(1.05rem, 1.5vw, 1.25rem)',
            color: 'rgba(255,255,255,0.82)',
            maxWidth: '640px',
            margin: '0 auto',
            lineHeight: 1.7,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {hero.heroSubtext}
          </p>
        </motion.div>
      </section>

      {/* ── Job Listings ── */}
      <section className="py-20" style={{ backgroundColor: '#f8fafb' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          <div className="mb-10">
            <p className="font-bold tracking-[0.2em] uppercase text-xs mb-3"
              style={{ fontFamily: PP, color: 'var(--primary)' }}>Open Positions</p>
            <h2 className="font-bold"
              style={{ fontFamily: PP, fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#111' }}>
              Current Openings
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 p-1 rounded-xl mb-10 w-fit"
            style={{ backgroundColor: 'var(--p-a08)' }}>
            {[
              { key: 'internal', label: `At Maru Consultancy (${internalJobs.length})` },
              { key: 'client', label: `Client Postings (${clientJobs.length})` },
            ].map(tab => (
              <button key={tab.key}
                onClick={() => setActiveTab(tab.key as 'internal' | 'client')}
                className="px-5 py-2.5 rounded-lg font-semibold text-sm transition-all"
                style={{
                  fontFamily: PP,
                  backgroundColor: activeTab === tab.key ? 'var(--primary)' : 'transparent',
                  color: activeTab === tab.key ? '#fff' : 'var(--primary)',
                }}>
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'client' && (
            <div className="mb-8 p-4 rounded-xl border flex items-start gap-3"
              style={{ backgroundColor: 'rgba(253,161,2,0.08)', borderColor: 'rgba(253,161,2,0.3)' }}>
              <span style={{ color: '#fda102', fontSize: '1.1rem' }}>ℹ</span>
              <p style={{ fontFamily: PP, fontSize: '0.88rem', color: '#555' }}>
                These are exclusive HR & compliance roles sourced directly from our corporate client network across India. Applications are managed through Maru Consultancy Services.
              </p>
            </div>
          )}

          {status === 'loading' && (
            <p className="text-center text-gray-400 py-12" style={{ fontFamily: PP }}>Loading openings…</p>
          )}
          {status === 'error' && (
            <p className="text-center text-gray-400 py-12" style={{ fontFamily: PP }}>
              Unable to load openings right now. Please try again shortly.
            </p>
          )}
          {status === 'ready' && displayed.length === 0 && (
            <p className="text-center text-gray-400 py-12" style={{ fontFamily: PP }}>No openings in this category right now.</p>
          )}
          <div className="space-y-5">
            {displayed.map((job, i) => (
              <motion.div key={job._id}
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-7 md:p-9">

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                  <div className="flex-1">

                    {/* Category + Department */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                        style={{
                          backgroundColor: job.category === 'internal' ? 'var(--p-a10)' : 'rgba(253,161,2,0.12)',
                          color: job.category === 'internal' ? 'var(--primary)' : '#c07a00',
                          fontFamily: PP,
                        }}>
                        {job.category === 'internal' ? 'In-house' : 'Client Role'}
                      </span>
                      <span className="text-xs text-gray-400 font-medium" style={{ fontFamily: PP }}>
                        {job.department}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold mb-4"
                      style={{ fontFamily: PP, fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', color: '#111' }}>
                      {job.title}
                    </h3>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-5" style={{ fontSize: '0.97rem', color: '#555' }}>
                      <span className="flex items-center gap-1.5 font-medium">
                        <MapPin size={15} style={{ color: 'var(--primary)' }} /> {job.location}
                      </span>
                      <span className="flex items-center gap-1.5 font-medium">
                        <Clock size={15} style={{ color: 'var(--primary)' }} /> {job.type}
                      </span>
                      <span className="flex items-center gap-1.5 font-medium">
                        <Briefcase size={15} style={{ color: 'var(--primary)' }} /> {job.experience} exp
                      </span>
                      <span className="flex items-center gap-1.5 font-semibold" style={{ color: 'var(--primary)' }}>
                        {job.ctc}
                      </span>
                      <span className="flex items-center gap-1.5 text-gray-400 font-normal" style={{ fontSize: '0.88rem' }}>
                        <Calendar size={13} style={{ color: '#aaa' }} /> Posted {job.postedOn}
                      </span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                    <Link to={`/careers/${job.slug}`}
                      className="px-6 py-3 rounded-xl font-semibold text-sm border-2 flex items-center justify-center gap-2 transition-all hover:opacity-80"
                      style={{ fontFamily: PP, color: 'var(--primary)', borderColor: 'var(--primary)', backgroundColor: 'transparent' }}>
                      View JD <ChevronRight size={15} />
                    </Link>
                    <Link to={`/careers/${job.slug}#apply`}
                      className="px-6 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 shadow-sm"
                      style={{ fontFamily: PP, backgroundColor: 'var(--primary)', color: '#fff' }}>
                      Apply Now <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Open Application CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="mt-14 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
            style={{ backgroundColor: 'var(--primary)' }}>
            <div>
              <h3 className="font-bold text-white mb-2"
                style={{ fontFamily: PP, fontSize: '1.4rem' }}>
                Don't see a role that fits?
              </h3>
              <p style={{ fontFamily: PP, fontSize: '0.95rem', color: 'rgba(255,255,255,0.70)' }}>
                Send us your profile. We're always open to exceptional talent in labour law and HR compliance.
              </p>
            </div>
            <Link to="/contact"
              className="shrink-0 inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm transition-all hover:opacity-90 whitespace-nowrap shadow-lg"
              style={{ fontFamily: PP, backgroundColor: '#fda102', color: '#111' }}>
              Send Your Resume <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
