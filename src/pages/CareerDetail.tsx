import { useParams, Link } from 'react-router-dom';
import { MapPin, Briefcase, Clock, ArrowLeft, CheckCircle, ChevronRight, Upload, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { api } from '../lib/api';
import { useLiveContent } from '../hooks/useLiveContent';
import type { JobContent } from '../types/content';

const PP = 'Poppins, sans-serif';

const CareerDetail = () => {
  const { slug } = useParams();
  const [job, setJob] = useState<JobContent | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [relatedJobs, setRelatedJobs] = useState<JobContent[]>([]);

  const [form, setForm] = useState({ name: '', phone: '', email: '', coverNote: '' });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const jobReqRef = useRef(0);
  const fetchJob = () => {
    const reqId = ++jobReqRef.current;
    api.get<JobContent>(`/careers/${slug}`)
      .then((data) => {
        if (reqId !== jobReqRef.current) return; // superseded by a newer request
        setJob(data);
        setNotFound(false); // clear any transient error from a prior failed poll
      })
      .catch(() => {
        if (reqId !== jobReqRef.current) return;
        setNotFound(true);
      });
  };
  useEffect(() => {
    setJob(null);
    setNotFound(false);
    fetchJob();
  }, [slug]);
  useLiveContent(fetchJob);

  useEffect(() => {
    if (!job) return;
    api.get<JobContent[]>('/careers')
      .then((all) => setRelatedJobs(all.filter((j) => j.slug !== slug && j.category === job.category).slice(0, 3)))
      .catch(() => {});
  }, [job, slug]);

  if (notFound) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ fontFamily: PP }}>
        <p className="text-gray-500 mb-4">Position not found.</p>
        <Link to="/careers" className="font-semibold" style={{ color: 'var(--primary)' }}>
          ← Back to Careers
        </Link>
      </div>
    );
  }

  if (!job) {
    return <div className="min-h-screen" style={{ fontFamily: PP }} />;
  }

  const handleFile = (file: File | null) => {
    if (!file) return;
    const allowed = ['application/pdf', 'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowed.includes(file.type)) setResumeFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email || !resumeFile) return;
    setSubmitting(true);
    setSubmitError('');
    try {
      const fd = new FormData();
      fd.append('name', form.name);
      fd.append('email', form.email);
      fd.append('phone', form.phone);
      fd.append('coverNote', form.coverNote);
      fd.append('resume', resumeFile, resumeFile.name);
      if (job?._id) fd.append('careerId', job._id);
      if (job?.title) fd.append('careerTitle', job.title);
      if (job?.slug) fd.append('careerSlug', job.slug);
      if (job?.category) fd.append('careerCategory', job.category);

      const res = await fetch('/api/applications', {
        method: 'POST',
        credentials: 'include',
        body: fd,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || `Submission failed (${res.status})`);
      }
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full" style={{ fontFamily: PP }}>

      {/* ── Hero ── */}
      <section className="flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: 'var(--primary)', minHeight: '220px', maxHeight: '320px', height: '42vh' }}>

        <div className="absolute top-[-60px] right-[-60px] w-[300px] h-[300px] rounded-full opacity-10 pointer-events-none"
          style={{ backgroundColor: '#fda102' }} />

        <motion.div
          initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center px-5 lg:px-8 w-full max-w-4xl mx-auto">

          <p className="uppercase tracking-[0.22em] lg:tracking-[0.28em] font-semibold mb-3"
            style={{ fontFamily: PP, fontSize: '0.8rem', color: '#fda102' }}>
            {job.category === 'internal' ? 'In-house Opportunity' : 'Client Job Posting'} · {job.department}
          </p>
          <h1 className="font-bold mb-5 leading-tight"
            style={{ fontFamily: PP, fontSize: 'clamp(1.6rem, 4vw, 3.2rem)', color: '#fff' }}>
            {job.title}
          </h1>
          <div className="flex flex-wrap justify-center gap-3 lg:gap-6"
            style={{ color: 'rgba(255,255,255,0.85)', fontSize: 'clamp(0.85rem, 1.5vw, 1.1rem)' }}>
            <span className="flex items-center gap-2 font-medium">
              <MapPin size={16} style={{ color: '#fda102' }} /> {job.location}
            </span>
            <span className="flex items-center gap-2 font-medium">
              <Clock size={16} style={{ color: '#fda102' }} /> {job.type}
            </span>
            <span className="flex items-center gap-2 font-medium">
              <Briefcase size={16} style={{ color: '#fda102' }} /> {job.experience} exp
            </span>
            <span className="flex items-center gap-2 font-bold" style={{ color: '#fda102' }}>
              {job.ctc}
            </span>
          </div>
        </motion.div>
      </section>

      {/* ── Main Content ── */}
      <section className="py-8 lg:py-14" style={{ backgroundColor: '#f8fafb' }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-10">

          {/* Back link */}
          <Link to="/careers"
            className="inline-flex items-center gap-2 text-sm font-semibold mb-6 lg:mb-8 transition-opacity hover:opacity-70"
            style={{ fontFamily: PP, color: 'var(--primary)' }}>
            <ArrowLeft size={15} /> Back to All Openings
          </Link>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">

            {/* ── Left — JD Content ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:w-2/3 space-y-5 lg:space-y-7">

              {/* About the Role */}
              <div className="bg-white rounded-2xl p-5 md:p-10 border border-gray-100 shadow-sm">
                <h2 className="font-bold mb-4 lg:mb-5"
                  style={{ fontFamily: PP, fontSize: 'clamp(1.15rem, 2.2vw, 1.7rem)', color: '#111' }}>
                  About the Role
                </h2>
                <p className="text-gray-600 leading-relaxed"
                  style={{ fontFamily: PP, fontSize: '0.92rem', lineHeight: 1.85, textAlign: 'justify' }}>
                  {job.about}
                </p>
              </div>

              {/* Responsibilities */}
              <div className="bg-white rounded-2xl p-5 md:p-10 border border-gray-100 shadow-sm">
                <h2 className="font-bold mb-5 lg:mb-6"
                  style={{ fontFamily: PP, fontSize: 'clamp(1.15rem, 2.2vw, 1.7rem)', color: '#111' }}>
                  Key Responsibilities
                </h2>
                <ul className="space-y-4">
                  {job.responsibilities.map((item, i) => (
                    <motion.li key={i}
                      initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                      className="flex items-start gap-4 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                      <span className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold mt-0.5"
                        style={{ backgroundColor: 'var(--p-a09)', color: 'var(--primary)', fontFamily: PP }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-gray-600 leading-relaxed"
                        style={{ fontFamily: PP, fontSize: '0.9rem' }}>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="bg-white rounded-2xl p-5 md:p-10 border border-gray-100 shadow-sm">
                <h2 className="font-bold mb-5 lg:mb-6"
                  style={{ fontFamily: PP, fontSize: 'clamp(1.15rem, 2.2vw, 1.7rem)', color: '#111' }}>
                  Requirements
                </h2>
                <ul className="space-y-3">
                  {job.requirements.map((item, i) => (
                    <motion.li key={i}
                      initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                      className="flex items-start gap-3">
                      <CheckCircle size={17} className="shrink-0 mt-0.5" style={{ color: 'var(--primary)' }} />
                      <span className="text-gray-600 leading-relaxed"
                        style={{ fontFamily: PP, fontSize: '0.9rem' }}>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Nice to Have */}
              {job.niceToHave.length > 0 && (
                <div className="rounded-2xl p-5 md:p-10 border"
                  style={{ backgroundColor: 'rgba(253,161,2,0.05)', borderColor: 'rgba(253,161,2,0.25)' }}>
                  <h2 className="font-bold mb-5"
                    style={{ fontFamily: PP, fontSize: 'clamp(1.05rem, 1.8vw, 1.4rem)', color: '#111' }}>
                    Nice to Have
                  </h2>
                  <ul className="space-y-3">
                    {job.niceToHave.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: '#fda102' }} />
                        <span className="text-gray-600 leading-relaxed"
                          style={{ fontFamily: PP, fontSize: '0.95rem' }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Apply Form */}
              <div id="apply" className="bg-white rounded-2xl p-5 md:p-10 border border-gray-100 shadow-sm">
                <h2 className="font-bold mb-2"
                  style={{ fontFamily: PP, fontSize: 'clamp(1.15rem, 2.2vw, 1.7rem)', color: '#111' }}>
                  Apply for This Role
                </h2>
                <p className="text-gray-400 mb-8 text-sm" style={{ fontFamily: PP }}>
                  Fill in your details and attach your resume. We'll get back to you within 3–5 business days.
                </p>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-14">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm"
                      style={{ backgroundColor: 'var(--p-a10)' }}>
                      <CheckCircle size={32} style={{ color: 'var(--primary)' }} />
                    </div>
                    <h3 className="font-bold mb-2"
                      style={{ fontFamily: PP, fontSize: '1.3rem', color: '#111' }}>
                      Application Submitted!
                    </h3>
                    <p className="text-gray-500 mb-6" style={{ fontFamily: PP, fontSize: '0.95rem' }}>
                      Thank you, {form.name}. We've received your application for <strong>{job.title}</strong>.<br />
                      Our team will review and reach out to you soon.
                    </p>
                    <Link to="/careers"
                      className="inline-flex items-center gap-2 font-semibold text-sm transition-opacity hover:opacity-70"
                      style={{ color: 'var(--primary)', fontFamily: PP }}>
                      <ArrowLeft size={14} /> Browse More Openings
                    </Link>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Name */}
                      <div>
                        <label className="block text-sm font-semibold mb-2"
                          style={{ fontFamily: PP, color: '#333' }}>
                          Full Name <span style={{ color: 'var(--primary)' }}>*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Rahul Sharma"
                          value={form.name}
                          onChange={e => setForm({ ...form, name: e.target.value })}
                          required
                          className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:border-[var(--primary)]"
                          style={{ fontFamily: PP, borderColor: '#e5e7eb', color: '#333' }}
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-semibold mb-2"
                          style={{ fontFamily: PP, color: '#333' }}>
                          Phone Number <span style={{ color: 'var(--primary)' }}>*</span>
                        </label>
                        <input
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={form.phone}
                          onChange={e => setForm({ ...form, phone: e.target.value })}
                          required
                          className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:border-[var(--primary)]"
                          style={{ fontFamily: PP, borderColor: '#e5e7eb', color: '#333' }}
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold mb-2"
                        style={{ fontFamily: PP, color: '#333' }}>
                        Email Address <span style={{ color: 'var(--primary)' }}>*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="rahul@example.com"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        required
                        className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:border-[var(--primary)]"
                        style={{ fontFamily: PP, borderColor: '#e5e7eb', color: '#333' }}
                      />
                    </div>

                    {/* Resume Upload */}
                    <div>
                      <label className="block text-sm font-semibold mb-2"
                        style={{ fontFamily: PP, color: '#333' }}>
                        Resume / CV <span style={{ color: 'var(--primary)' }}>*</span>
                        <span className="text-gray-400 font-normal ml-1">(PDF or Word, max 5MB)</span>
                      </label>
                      <div
                        className={`border-2 border-dashed rounded-xl p-5 lg:p-8 text-center cursor-pointer transition-all ${dragOver ? 'scale-[1.01]' : ''}`}
                        style={{
                          borderColor: dragOver ? 'var(--primary)' : (resumeFile ? 'var(--primary)' : '#e5e7eb'),
                          backgroundColor: resumeFile ? 'var(--p-a04)' : (dragOver ? 'var(--p-a03)' : '#fafafa'),
                        }}
                        onClick={() => fileRef.current?.click()}
                        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={e => {
                          e.preventDefault();
                          setDragOver(false);
                          handleFile(e.dataTransfer.files[0]);
                        }}>
                        <input
                          ref={fileRef} type="file" className="hidden"
                          accept=".pdf,.doc,.docx"
                          onChange={e => handleFile(e.target.files?.[0] || null)}
                        />
                        {resumeFile ? (
                          <div className="flex flex-col items-center gap-2">
                            <CheckCircle size={28} style={{ color: 'var(--primary)' }} />
                            <p className="font-semibold text-sm" style={{ fontFamily: PP, color: 'var(--primary)' }}>
                              {resumeFile.name}
                            </p>
                            <button type="button"
                              className="text-xs text-gray-400 underline hover:text-gray-600"
                              onClick={e => { e.stopPropagation(); setResumeFile(null); }}>
                              Remove
                            </button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-2">
                            <Upload size={26} style={{ color: 'var(--primary)' }} />
                            <p className="font-semibold text-sm" style={{ fontFamily: PP, color: '#333' }}>
                              Drag & drop your resume here
                            </p>
                            <p className="text-xs text-gray-400" style={{ fontFamily: PP }}>
                              or <span style={{ color: 'var(--primary)', fontWeight: 600 }}>click to browse</span>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Cover Note */}
                    <div>
                      <label className="block text-sm font-semibold mb-2"
                        style={{ fontFamily: PP, color: '#333' }}>
                        Cover Note <span className="text-gray-400 font-normal">(Optional)</span>
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Briefly tell us why you're a great fit for this role..."
                        value={form.coverNote}
                        onChange={e => setForm({ ...form, coverNote: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:border-[var(--primary)] resize-none"
                        style={{ fontFamily: PP, borderColor: '#e5e7eb', color: '#333' }}
                      />
                    </div>

                    {submitError && (
                      <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-2.5" style={{ fontFamily: PP }}>
                        {submitError}
                      </p>
                    )}
                    <button type="submit" disabled={submitting}
                      className="w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-md transition-all hover:opacity-90 hover:shadow-lg disabled:opacity-60"
                      style={{ fontFamily: PP, backgroundColor: 'var(--primary)', fontSize: '0.97rem' }}>
                      <Send size={16} /> {submitting ? 'Submitting…' : 'Submit Application'}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* ── Right — Sidebar ── */}
            <div className="lg:w-1/3">
              <div className="lg:sticky lg:top-28 space-y-5 lg:space-y-6">

                {/* Job Snapshot */}
                <motion.div
                  initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-2 text-center text-xs font-bold uppercase tracking-widest"
                    style={{ backgroundColor: 'var(--primary)', color: '#fda102', fontFamily: PP }}>
                    Job Overview
                  </div>
                  <div className="p-5 lg:p-7 space-y-4">
                    {[
                      { label: 'Location', value: job.location },
                      { label: 'Job Type', value: job.type },
                      { label: 'Department', value: job.department },
                      { label: 'Experience', value: job.experience },
                      { label: 'CTC Range', value: job.ctc },
                      { label: 'Category', value: job.category === 'internal' ? 'In-house at Maru Consultancy' : 'Client Placement' },
                    ].map((row, i) => (
                      <div key={i} className="flex justify-between items-start pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                        <span className="text-gray-400 text-sm" style={{ fontFamily: PP }}>{row.label}</span>
                        <span className="font-semibold text-sm text-right" style={{ fontFamily: PP, color: '#222', maxWidth: '60%' }}>
                          {row.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Quick Apply CTA */}
                <motion.div
                  initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 lg:p-7">
                  <h3 className="font-bold mb-2"
                    style={{ fontFamily: PP, fontSize: '1.15rem', color: '#111' }}>
                    Ready to Apply?
                  </h3>
                  <p className="text-gray-500 text-sm mb-5 leading-relaxed" style={{ fontFamily: PP }}>
                    Scroll down to fill the application form, or get in touch with our HR team directly.
                  </p>
                  <a href="#apply"
                    className="w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-md transition-opacity hover:opacity-90 mb-3"
                    style={{ fontFamily: PP, backgroundColor: 'var(--primary)', color: '#fff' }}>
                    Apply Now <ArrowLeft size={14} className="rotate-180" />
                  </a>
                  <a href="tel:+919876543210"
                    className="w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 border-2 transition-all hover:bg-[var(--primary)] hover:text-white"
                    style={{ fontFamily: PP, color: 'var(--primary)', borderColor: 'var(--primary)' }}>
                    Call HR Team
                  </a>
                </motion.div>

                {/* More Openings */}
                {relatedJobs.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 lg:p-7">
                    <h4 className="font-bold mb-5 uppercase tracking-widest text-xs"
                      style={{ fontFamily: PP, color: 'var(--primary)' }}>
                      More Openings
                    </h4>
                    <ul className="space-y-0.5">
                      {relatedJobs.map((j) => (
                        <li key={j._id}>
                          <Link to={`/careers/${j.slug}`}
                            className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0 group transition-colors hover:text-[var(--primary)]"
                            style={{ fontFamily: PP, color: '#333', fontSize: '0.88rem', fontWeight: 500 }}>
                            <ChevronRight size={13} className="text-gray-300 group-hover:text-[var(--primary)] transition-colors shrink-0" />
                            <span>
                              <span className="block">{j.title}</span>
                              <span className="text-xs text-gray-400 font-normal">{j.location} · {j.type}</span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link to="/careers"
                      className="mt-4 flex items-center gap-1.5 text-xs font-semibold transition-opacity hover:opacity-70"
                      style={{ color: 'var(--primary)', fontFamily: PP }}>
                      View all openings <ChevronRight size={12} />
                    </Link>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareerDetail;
