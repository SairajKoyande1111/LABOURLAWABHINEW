import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <div className="w-full bg-gray-50 min-h-screen">
      <section className="bg-navy-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">Schedule a consultation with our legal experts to discuss your compliance and HR requirements.</p>
        </div>
      </section>

      <div className="py-20 max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Form */}
          <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-3xl font-display font-bold text-navy-900 mb-8">Send us a message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">First Name *</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg p-3.5 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all bg-gray-50 focus:bg-white" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Last Name *</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg p-3.5 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all bg-gray-50 focus:bg-white" placeholder="Doe" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address *</label>
                  <input type="email" className="w-full border border-gray-300 rounded-lg p-3.5 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all bg-gray-50 focus:bg-white" placeholder="john@company.com" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number *</label>
                  <input type="tel" className="w-full border border-gray-300 rounded-lg p-3.5 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all bg-gray-50 focus:bg-white" placeholder="+91 98765 43210" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Service Interest</label>
                <select className="w-full border border-gray-300 rounded-lg p-3.5 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all bg-gray-50 focus:bg-white appearance-none">
                  <option value="">Select a service...</option>
                  <option>Labour Law Compliance</option>
                  <option>Payroll & Salary Structuring</option>
                  <option>Statutory Compliance & Filings</option>
                  <option>Audits & Governance</option>
                  <option>Contract Staffing</option>
                  <option>Other / General Inquiry</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                <textarea rows={5} className="w-full border border-gray-300 rounded-lg p-3.5 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all bg-gray-50 focus:bg-white" placeholder="How can we help you?"></textarea>
              </div>
              <button type="button" className="w-full bg-teal-500 text-white py-4 rounded-lg font-bold text-lg hover:bg-teal-600 transition-colors shadow-lg shadow-teal-500/20">
                Submit Inquiry
              </button>
            </form>
          </div>
          
          {/* Info & Map */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="bg-navy-900 text-white p-8 md:p-10 rounded-2xl shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
              <h3 className="text-2xl font-display font-bold mb-8 relative z-10">Corporate Headquarters</h3>
              
              <ul className="space-y-8 relative z-10">
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-teal-400">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="font-bold mb-1 text-lg">Address</p>
                    <p className="text-white/70 leading-relaxed">15th Floor, Nariman Point,<br/>Mumbai, Maharashtra 400021<br/>India</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-teal-400">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="font-bold mb-1 text-lg">Contact</p>
                    <p className="text-white/70">+91 98765 43210<br/>022 4567 8900</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-teal-400">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="font-bold mb-1 text-lg">Email</p>
                    <p className="text-white/70">contact@labourcodes.in<br/>support@labourcodes.in</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-teal-400">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="font-bold mb-1 text-lg">Working Hours</p>
                    <p className="text-white/70">Monday - Friday: 9:30 AM - 6:30 PM<br/>Saturday & Sunday: Closed</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-gray-200 h-64 rounded-2xl overflow-hidden relative group">
              <div className="absolute inset-0 flex items-center justify-center bg-black/5 text-gray-500 font-medium group-hover:bg-black/10 transition-colors cursor-pointer">
                [ Interactive Map Embed Placeholder ]
              </div>
              <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80" alt="Map Location" className="w-full h-full object-cover mix-blend-overlay opacity-50" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;