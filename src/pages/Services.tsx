import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  { slug: 'labour-law-compliance', title: 'Labour Law Compliance', img: '/src/assets/service-labour.png', desc: 'End-to-end compliance with all applicable central and state labour legislation, shielding your business from penal consequences.' },
  { slug: 'payroll-structuring', title: 'Payroll & Salary Structuring', img: '/src/assets/service-payroll.png', desc: 'Precise payroll processing and salary structure auditing optimized for the New Labour Codes.' },
  { slug: 'statutory-filings', title: 'Statutory Compliance & Filings', img: '/src/assets/service-statutory.png', desc: 'Flawless management of PF, ESIC, PT, LWF, TDS, alongside regular returns and meticulous statutory filings.' },
  { slug: 'contract-staffing', title: 'People Outsourcing & Staffing', img: '/src/assets/service-staffing.png', desc: 'Flexible, compliant workforce solutions via outsourcing, managing everything from onboarding to exit.' },
  { slug: 'audits-governance', title: 'Audits & Governance', img: '/src/assets/service-audits.png', desc: 'Rigorous labour audits, factory audits, and establishment compliance reviews to identify and seal gaps.' },
  { slug: 'registrations-licensing', title: 'Registrations & Licensing', img: '/src/assets/service-licensing.png', desc: 'Procurement of Shop & Establishment, Factory License, Contract Labour License and timely renewals.' },
  { slug: 'hr-policy-advisory', title: 'HR Policy & Advisory', img: '/src/assets/service-hr.png', desc: 'Drafting robust HR handbooks, standing orders, POSH policies, and airtight employment contracts.' },
  { slug: 'litigation-support', title: 'Legal Representation', img: '/src/assets/service-legal.png', desc: 'Expert labour court representation, conciliation proceedings, and robust litigation support.' },
  { slug: 'training-workshops', title: 'Training & Workshops', img: '/src/assets/service-training.png', desc: 'In-depth labour law training sessions designed to upskill internal HR teams and management.' },
];

const Services = () => {
  return (
    <div className="w-full">
      <section className="bg-navy-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">Our Services</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Comprehensive solutions tailored to meet the exacting and evolving regulatory demands of Indian businesses.
          </p>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service, i) => (
              <motion.div key={service.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }} className="bg-white rounded-xl shadow-sm hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col border border-gray-100">
                <div className="h-56 relative overflow-hidden">
                  <div className="absolute inset-0 bg-navy-900/10 hover:bg-transparent transition-colors z-10"></div>
                  <img src={service.img} alt={service.title} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-display font-bold text-navy-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-8 flex-grow leading-relaxed">{service.desc}</p>
                  <Link to={`/services/${service.slug}`} className="group flex items-center justify-between mt-auto border-t border-gray-100 pt-6">
                    <span className="text-teal-600 font-bold group-hover:text-navy-900 transition-colors">Explore Details</span>
                    <span className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 group-hover:bg-navy-900 group-hover:text-white transition-all">
                      <ArrowRight size={18} />
                    </span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl font-display font-bold text-navy-900 mb-6">Need a custom compliance structure?</h2>
          <p className="text-gray-600 mb-10 text-lg">We understand that every business has unique operational needs. Contact us for a bespoke audit and advisory package.</p>
          <Link to="/contact" className="inline-block bg-teal-500 text-white px-8 py-4 rounded font-bold hover:bg-teal-600 transition-colors shadow-lg">
            Request Custom Consultation
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;