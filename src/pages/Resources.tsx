import { useState, useEffect } from 'react';
import { Download, ChevronRight, Calendar, Clock, ArrowRight, FileText, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';
import type { ResourceItem } from '../types/content';

const PP = 'Poppins, sans-serif';

const CATEGORIES = ['All', 'New Labour Codes', 'Compliance', 'Labour Audit', 'POSH', 'ESI & PF', 'Payroll'];

const Resources = () => {
  const [activeTab, setActiveTab] = useState<'blogs' | 'downloads'>('blogs');
  const [catFilter, setCatFilter] = useState('All');
  const [blogPosts, setBlogPosts] = useState<ResourceItem[]>([]);
  const [downloads, setDownloads] = useState<ResourceItem[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    api.get<ResourceItem[]>('/resources')
      .then(data => {
        setBlogPosts(data.filter(r => r.tab === 'articles'));
        setDownloads(data.filter(r => r.tab === 'downloads'));
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  const filteredBlogs = catFilter === 'All'
    ? blogPosts
    : blogPosts.filter(p => p.category === catFilter);

  return (
    <div className="w-full" style={{ fontFamily: PP }}>

      {/* ── Hero ── */}
      <section
        className="flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: '#a83a00', minHeight: '200px', maxHeight: '300px', height: '38vh' }}>

        <div className="absolute top-[-60px] right-[-60px] w-[300px] h-[300px] rounded-full opacity-10 pointer-events-none"
          style={{ backgroundColor: '#fda102' }} />

        <motion.div
          initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center px-8 w-full max-w-4xl mx-auto">

          <p className="uppercase tracking-[0.3em] font-semibold mb-2"
            style={{ fontFamily: PP, fontSize: '0.9rem', color: '#fda102' }}>
            Knowledge Hub
          </p>
          <h1 className="font-bold mb-3"
            style={{ fontFamily: PP, fontSize: 'max(1.1rem, 2vw)', fontWeight: 700, letterSpacing: '0.03em', color: '#fff' }}>
            Insights, Blogs & Downloads
          </h1>
          <p style={{
            fontFamily: PP, fontSize: 'clamp(0.88rem, 1.3vw, 1rem)', fontWeight: 300,
            color: 'rgba(255,255,255,0.82)', maxWidth: '580px', margin: '0 auto', lineHeight: 1.6,
          }}>
            Expert insights, regulatory updates, and practical compliance resources to keep your business protected.
          </p>
        </motion.div>
      </section>

      {/* ── Tab Switch ── */}
      <section className="bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center gap-1 py-4">
          {[
            { key: 'blogs', label: `Articles & Insights (${blogPosts.length})`, icon: BookOpen },
            { key: 'downloads', label: `Downloads & Templates (${downloads.length})`, icon: FileText },
          ].map(tab => (
            <button key={tab.key}
              onClick={() => setActiveTab(tab.key as 'blogs' | 'downloads')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all"
              style={{
                fontFamily: PP,
                backgroundColor: activeTab === tab.key ? '#a83a00' : 'transparent',
                color: activeTab === tab.key ? '#fff' : '#a83a00',
              }}>
              <tab.icon size={14} /> {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* ── Blogs Tab ── */}
      {activeTab === 'blogs' && (
        <section className="py-14" style={{ backgroundColor: '#f8fafb' }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-10">

            {/* Category filters */}
            <div className="flex flex-wrap gap-2 mb-12">
              {CATEGORIES.map(cat => (
                <button key={cat}
                  onClick={() => setCatFilter(cat)}
                  className="px-5 py-2 rounded-full font-semibold text-sm transition-all border"
                  style={{
                    fontFamily: PP,
                    backgroundColor: catFilter === cat ? '#a83a00' : '#fff',
                    color: catFilter === cat ? '#fff' : '#a83a00',
                    borderColor: catFilter === cat ? '#a83a00' : 'rgba(168,58,0,0.25)',
                  }}>
                  {cat}
                </button>
              ))}
            </div>

            {/* Featured post — first item full-width */}
            <AnimatePresence mode="wait">
              {filteredBlogs.length > 0 && (
                <motion.div key={filteredBlogs[0].slug}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
                  className="mb-10">
                  <Link to={`/resources/${filteredBlogs[0].slug}`} className="group block">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col lg:flex-row">
                      <div className="lg:w-1/2 overflow-hidden" style={{ minHeight: '320px' }}>
                        <img src={filteredBlogs[0].img} alt={filteredBlogs[0].title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
                          style={{ minHeight: '320px' }} />
                      </div>
                      <div className="lg:w-1/2 p-10 lg:p-14 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                            style={{ backgroundColor: 'rgba(168,58,0,0.1)', color: '#a83a00', fontFamily: PP }}>
                            {filteredBlogs[0].category}
                          </span>
                          <span className="text-xs text-gray-400 flex items-center gap-1" style={{ fontFamily: PP }}>
                            <Calendar size={11} /> {filteredBlogs[0].date}
                          </span>
                          <span className="text-xs text-gray-400 flex items-center gap-1" style={{ fontFamily: PP }}>
                            <Clock size={11} /> {filteredBlogs[0].readTime}
                          </span>
                        </div>
                        <h2 className="font-bold mb-4 leading-tight"
                          style={{ fontFamily: PP, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#111' }}>
                          {filteredBlogs[0].title}
                        </h2>
                        <p className="text-gray-500 leading-relaxed mb-6"
                          style={{ fontFamily: PP, fontSize: '1rem', lineHeight: 1.8 }}>
                          {filteredBlogs[0].excerpt}
                        </p>
                        <span className="inline-flex items-center gap-2 font-bold text-sm transition-opacity group-hover:opacity-70"
                          style={{ color: '#a83a00', fontFamily: PP }}>
                          Read Full Article <ArrowRight size={15} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Remaining posts grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              <AnimatePresence mode="popLayout">
                {filteredBlogs.slice(1).map((post, i) => (
                  <motion.div key={post.slug}
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.35, delay: i * 0.06 }}>
                    <Link to={`/resources/${post.slug}`}
                      className="group block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col h-full">
                      <div className="relative overflow-hidden" style={{ height: '200px' }}>
                        <img src={post.img} alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-3 left-3 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                          style={{ backgroundColor: '#a83a00', color: '#fff', fontFamily: PP }}>
                          {post.category}
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center gap-3 mb-3 text-xs text-gray-400">
                          <span className="flex items-center gap-1"><Calendar size={11} /> {post.date}</span>
                          <span className="flex items-center gap-1"><Clock size={11} /> {post.readTime}</span>
                        </div>
                        <h3 className="font-bold mb-3 leading-snug"
                          style={{ fontFamily: PP, fontSize: '1.08rem', color: '#111' }}>
                          {post.title}
                        </h3>
                        <p className="text-gray-500 text-sm leading-relaxed flex-grow mb-5"
                          style={{ fontFamily: PP }}>
                          {post.excerpt}
                        </p>
                        <span className="flex items-center gap-1.5 font-bold text-sm transition-opacity group-hover:opacity-70 mt-auto"
                          style={{ color: '#a83a00', fontFamily: PP }}>
                          Read Article <ChevronRight size={14} />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredBlogs.length === 0 && (
              <div className="text-center py-20 text-gray-400" style={{ fontFamily: PP }}>
                No articles found for this category.
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Downloads Tab ── */}
      {activeTab === 'downloads' && (
        <section className="py-14" style={{ backgroundColor: '#f8fafb' }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="mb-10">
              <p className="font-bold tracking-[0.2em] uppercase text-xs mb-2"
                style={{ fontFamily: PP, color: '#a83a00' }}>Free Resources</p>
              <h2 className="font-bold" style={{ fontFamily: PP, fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: '#111' }}>
                Templates & Downloads
              </h2>
              <p className="text-gray-500 mt-2" style={{ fontFamily: PP, fontSize: '0.97rem' }}>
                Practical compliance templates, checklists, and reference documents — free to download.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {downloads.map((item, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-7 flex flex-col">

                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(168,58,0,0.09)' }}>
                      <FileText size={22} style={{ color: '#a83a00' }} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                      style={{
                        backgroundColor: item.type === 'Resource' ? 'rgba(253,161,2,0.12)' : 'rgba(168,58,0,0.08)',
                        color: item.type === 'Resource' ? '#b07000' : '#a83a00',
                        fontFamily: PP,
                      }}>
                      {item.type}
                    </span>
                  </div>

                  <h3 className="font-bold mb-2 leading-snug flex-grow"
                    style={{ fontFamily: PP, fontSize: '1rem', color: '#111' }}>
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5"
                    style={{ fontFamily: PP }}>
                    {item.desc}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                    <span className="text-xs text-gray-400 font-medium" style={{ fontFamily: PP }}>
                      {item.format} · {item.size}
                    </span>
                    <button
                      className="flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-full transition-all hover:opacity-80"
                      style={{ fontFamily: PP, backgroundColor: 'rgba(168,58,0,0.09)', color: '#a83a00' }}>
                      <Download size={13} /> Download
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Newsletter ── */}
      <section className="py-16" style={{ backgroundColor: '#a83a00' }}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.4 }}
            className="font-bold uppercase tracking-[0.2em] text-xs mb-4"
            style={{ fontFamily: PP, color: '#fda102' }}>
            Stay Updated
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.07 }}
            className="font-bold mb-4 text-white"
            style={{ fontFamily: PP, fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}>
            Never miss a compliance update
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.14 }}
            className="mb-8 leading-relaxed"
            style={{ fontFamily: PP, fontSize: '1rem', color: 'rgba(255,255,255,0.75)' }}>
            Subscribe for critical regulatory alerts, new circulars, and expert analysis delivered directly to your inbox.
          </motion.p>
          <motion.form
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="Your business email"
              className="flex-1 rounded-xl px-5 py-3.5 text-sm outline-none border-0"
              style={{ fontFamily: PP, backgroundColor: 'rgba(255,255,255,0.12)', color: '#fff', border: '1px solid rgba(255,255,255,0.25)' }} />
            <button type="submit"
              className="px-7 py-3.5 rounded-xl font-bold text-sm whitespace-nowrap transition-opacity hover:opacity-90"
              style={{ fontFamily: PP, backgroundColor: '#fda102', color: '#111' }}>
              Subscribe
            </button>
          </motion.form>
        </div>
      </section>
    </div>
  );
};

export default Resources;
