import { useState } from 'react';
import { ArrowRight, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import heroVideo from '@assets/7683053-hd_1920_1080_24fps_1783584828907.mp4';
import iconLocation from '@assets/placeholder_1783488477011.png';
import iconCall from '@assets/call_1783488542810.png';
import iconMail from '@assets/communication_1783488559887.png';
import chatIcon from '@assets/chat_1783587012486.png';

const PP = 'Poppins, sans-serif';

const IconCall = ({ size = 18 }: { size?: number }) => (
  <img src={iconCall} alt="" className="object-contain" style={{ width: size, height: size }} />
);
const IconMail = ({ size = 18 }: { size?: number }) => (
  <img src={iconMail} alt="" className="object-contain" style={{ width: size, height: size }} />
);
const IconLocation = ({ size = 18 }: { size?: number }) => (
  <img src={iconLocation} alt="" className="object-contain" style={{ width: size, height: size }} />
);

const FIELD_STYLE: React.CSSProperties = {
  fontFamily: PP,
  fontSize: '0.92rem',
  width: '100%',
  border: '1.5px solid #e5e7eb',
  borderRadius: '12px',
  padding: '12px 16px',
  outline: 'none',
  backgroundColor: '#fafafa',
  color: '#111',
  transition: 'border-color 0.2s',
};

const LABEL_STYLE: React.CSSProperties = {
  fontFamily: PP,
  fontSize: '0.8rem',
  fontWeight: 600,
  color: '#a83a00',
  display: 'block',
  marginBottom: '6px',
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
};

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', service: '', message: '' });
  const [focused, setFocused] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  const inputProps = (name: string) => ({
    style: { ...FIELD_STYLE, borderColor: focused === name ? '#a83a00' : '#e5e7eb' },
    onFocus: () => setFocused(name),
    onBlur: () => setFocused(''),
  });

  return (
    <div className="w-full" style={{ fontFamily: PP }}>

      {/* ── Hero ── */}
      <section className="flex items-center justify-center overflow-hidden relative"
        style={{ minHeight: '260px', maxHeight: '420px', height: '48vh' }}>
        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'center 15%' }}
          src={heroVideo}
        />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(30,10,0,0.62)' }} />
        <motion.div
          initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center px-8 w-full max-w-6xl mx-auto relative z-10">
          <p className="uppercase tracking-[0.3em] font-light mb-3"
            style={{ fontFamily: PP, fontSize: '1.4rem', color: '#fda102' }}>
            Get In Touch
          </p>
          <h1 className="font-medium mb-4 whitespace-nowrap"
            style={{ fontFamily: PP, fontSize: 'clamp(1.8rem, 4.2vw, 3.6rem)', fontWeight: 500, color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.15 }}>
            Ready to Put Your Worries to Rest?
          </h1>
          <p style={{
            fontFamily: PP, fontWeight: 300, fontSize: 'clamp(1.05rem, 1.8vw, 1.35rem)',
            color: 'rgba(255,255,255,0.88)', maxWidth: '700px', margin: '0 auto', lineHeight: 1.7,
          }}>
            Our experts are ready to analyse your compliance situation and build a clear roadmap for you.
          </p>
        </motion.div>
      </section>

      {/* ── Quick contact strip ── */}
      <section className="bg-white border-b border-gray-100 py-0">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            {[
              { icon: IconCall, label: 'Call Us', value: '+91 98765 43210', href: 'tel:+919876543210' },
              { icon: IconMail, label: 'Email Us', value: 'contact@maruconsultancy.in', href: 'mailto:contact@maruconsultancy.in' },
              { icon: IconLocation, label: 'Our Office', value: 'Nariman Point, Mumbai', href: '#map' },
            ].map((item, i) => (
              <a key={i} href={item.href}
                className="flex items-center gap-4 px-8 py-5 hover:bg-[#f8fafb] transition-colors group">
                <item.icon size={34} />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider mb-0.5"
                    style={{ fontFamily: PP, color: '#a83a00' }}>{item.label}</p>
                  <p className="font-semibold text-sm" style={{ fontFamily: PP, color: '#111' }}>{item.value}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Form + Info ── */}
      <section className="py-16" style={{ backgroundColor: '#f8fafb' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

            {/* ── Form ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="lg:col-span-7 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

              {/* Card header */}
              <div className="px-10 py-6 border-b border-gray-100 flex items-center gap-3">
                <img src={chatIcon} alt="" className="object-contain" style={{ width: 34, height: 34 }} />
                <div>
                  <h3 className="font-bold leading-none" style={{ fontFamily: PP, fontSize: '1.1rem', color: '#111' }}>
                    Send Us a Message
                  </h3>
                  <p className="text-gray-400 text-xs mt-0.5" style={{ fontFamily: PP }}>
                    We'll get back to you within 1 business day.
                  </p>
                </div>
              </div>

              <div className="p-8 md:p-10">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-12">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5 shadow-md"
                      style={{ backgroundColor: 'rgba(168,58,0,0.09)' }}>
                      <CheckCircle size={32} style={{ color: '#a83a00' }} />
                    </div>
                    <h3 className="font-bold mb-2" style={{ fontFamily: PP, fontSize: '1.5rem', color: '#111' }}>
                      Message Sent!
                    </h3>
                    <p className="text-gray-500 text-sm max-w-sm leading-relaxed" style={{ fontFamily: PP }}>
                      Thank you for reaching out. One of our compliance experts will get back to you within 1 business day.
                    </p>
                    <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', company: '', service: '', message: '' }); }}
                      className="mt-7 font-semibold text-sm flex items-center gap-1.5 transition-opacity hover:opacity-70"
                      style={{ fontFamily: PP, color: '#a83a00' }}>
                      Send another message <ArrowRight size={14} />
                    </button>
                  </motion.div>
                ) : (
                  <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label style={LABEL_STYLE}>Full Name *</label>
                        <input name="name" value={form.name} onChange={handleChange} required
                          type="text" placeholder="Your full name" {...inputProps('name')} />
                      </div>
                      <div>
                        <label style={LABEL_STYLE}>Email Address *</label>
                        <input name="email" value={form.email} onChange={handleChange} required
                          type="email" placeholder="your@email.com" {...inputProps('email')} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label style={LABEL_STYLE}>Phone Number *</label>
                        <input name="phone" value={form.phone} onChange={handleChange} required
                          type="tel" placeholder="+91 98765 43210" {...inputProps('phone')} />
                      </div>
                      <div>
                        <label style={LABEL_STYLE}>Company Name</label>
                        <input name="company" value={form.company} onChange={handleChange}
                          type="text" placeholder="Your company" {...inputProps('company')} />
                      </div>
                    </div>
                    <div>
                      <label style={LABEL_STYLE}>Service Interest</label>
                      <select name="service" value={form.service} onChange={handleChange}
                        style={{ ...FIELD_STYLE, borderColor: focused === 'service' ? '#a83a00' : '#e5e7eb', appearance: 'none' }}
                        onFocus={() => setFocused('service')} onBlur={() => setFocused('')}>
                        <option value="">Select a service...</option>
                        <option>Labour Law Compliance</option>
                        <option>Payroll &amp; Salary Structuring</option>
                        <option>Statutory Compliance &amp; Filings</option>
                        <option>Audits &amp; Governance</option>
                        <option>Contract Staffing</option>
                        <option>Registrations &amp; Licensing</option>
                        <option>HR Policy &amp; Advisory</option>
                        <option>Legal Representation</option>
                        <option>Training &amp; Workshops</option>
                        <option>Other / General Inquiry</option>
                      </select>
                    </div>
                    <div>
                      <label style={LABEL_STYLE}>Your Message</label>
                      <textarea name="message" value={form.message} onChange={handleChange}
                        rows={5} placeholder="Describe your compliance challenge or query..."
                        style={{ ...FIELD_STYLE, borderColor: focused === 'message' ? '#a83a00' : '#e5e7eb', resize: 'none' }}
                        onFocus={() => setFocused('message')} onBlur={() => setFocused('')} />
                    </div>
                    <button type="submit"
                      className="w-full py-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-md transition-opacity hover:opacity-90"
                      style={{ fontFamily: PP, backgroundColor: '#a83a00', color: '#fff' }}>
                      Send Message <ArrowRight size={16} />
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* ── Info Sidebar ── */}
            <div className="lg:col-span-5 flex flex-col gap-6">

              {/* Contact info card */}
              <motion.div
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.1 }}
                className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                <div className="px-7 py-4 text-xs font-bold uppercase tracking-widest text-center"
                  style={{ backgroundColor: '#a83a00', color: '#fda102', fontFamily: PP }}>
                  Contact Details
                </div>
                <div className="bg-white p-7 space-y-6">
                  {[
                    {
                      icon: IconLocation,
                      label: 'Office Address',
                      lines: ['15th Floor, Nariman Point,', 'Mumbai, Maharashtra 400021', 'India'],
                    },
                    {
                      icon: IconCall,
                      label: 'Phone Numbers',
                      lines: ['+91 98765 43210', '022 4567 8900'],
                      hrefs: ['tel:+919876543210', 'tel:02245678900'],
                    },
                    {
                      icon: IconMail,
                      label: 'Email Addresses',
                      lines: ['contact@maruconsultancy.in', 'support@maruconsultancy.in'],
                      hrefs: ['mailto:contact@maruconsultancy.in', 'mailto:support@maruconsultancy.in'],
                    },
                    {
                      icon: Clock,
                      label: 'Working Hours',
                      lines: ['Monday – Friday: 9:30 AM – 6:30 PM', 'Saturday & Sunday: Closed'],
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      {item.icon === Clock ? (
                        <Clock size={32} style={{ color: '#a83a00' }} className="shrink-0" />
                      ) : (
                        <item.icon size={32} />
                      )}
                      <div>
                        <p className="font-bold text-xs uppercase tracking-wider mb-1"
                          style={{ fontFamily: PP, color: '#a83a00' }}>{item.label}</p>
                        {item.lines.map((line, j) =>
                          item.hrefs ? (
                            <a key={j} href={item.hrefs[j]}
                              className="block text-sm leading-relaxed transition-opacity hover:opacity-60"
                              style={{ fontFamily: PP, color: '#444' }}>{line}</a>
                          ) : (
                            <p key={j} className="text-sm leading-relaxed"
                              style={{ fontFamily: PP, color: '#444' }}>{line}</p>
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Map */}
              <motion.div
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm"
                style={{ height: '260px', position: 'relative' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.9!2d72.8232!3d18.9256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7d1c6cfb3b99b%3A0x4a5a3a6d7e5f4f1a!2sNariman%20Point%2C%20Mumbai%2C%20Maharashtra%20400021!5e0!3m2!1sen!2sin!4v1700000000000"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade" title="Maru Consultancy Office Location"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;
