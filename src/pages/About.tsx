import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Shield, Users, Award, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-navy-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">The Standard in Compliance</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            For over two decades, Labour Codes has been the trusted partner for Indian enterprises, demystifying complex regulations and building resilient HR frameworks.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
                <img src="/src/assets/service-staffing.png" alt="Our Team" className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 bg-teal-500 text-white p-6">
                  <div className="text-4xl font-display font-bold mb-1">21+</div>
                  <div className="text-sm font-medium uppercase tracking-wider">Years of Excellence</div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 prose max-w-none text-gray-700">
              <h2 className="text-3xl font-display font-bold text-navy-900 mb-6">Our Story</h2>
              <p className="text-lg leading-relaxed mb-6">
                Founded in 2003, Labour Codes began with a singular vision: to bridge the gap between complex legal statutes and practical business operations. What started as a boutique advisory firm in Mumbai has grown into a pan-India compliance powerhouse.
              </p>
              <p className="leading-relaxed mb-6">
                We recognized early that compliance is not merely about avoiding penalties; it's about creating an ethical, structured, and highly motivated workforce. Our evolution has mirrored the transformation of Indian labour laws, culminating in our unmatched expertise in the recent comprehensive Labour Codes.
              </p>
              <p className="leading-relaxed">
                Today, we manage compliance for over 500 organizations, ranging from dynamic startups to Fortune 500 conglomerates, processing millions of data points annually while maintaining a pristine record of legal adherence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-10 rounded-lg shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-navy-50 text-navy-900 rounded-full flex items-center justify-center mb-6">
                <Target size={32} />
              </div>
              <h3 className="text-2xl font-display font-bold text-navy-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To empower businesses with foolproof compliance strategies, enabling them to focus on growth while we secure their legal and operational foundation. We strive to make compliance a seamless, automated, and invisible part of corporate success.
              </p>
            </div>
            <div className="bg-white p-10 rounded-lg shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mb-6">
                <Eye size={32} />
              </div>
              <h3 className="text-2xl font-display font-bold text-navy-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be the undisputed authority and most trusted partner in India for comprehensive labour law management, setting the gold standard for HR governance and ethical workforce practices across all industries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Our Core Values</h2>
            <p className="text-teal-400">The principles that guide every audit, advice, and action.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "Absolute Integrity", desc: "We uphold the highest ethical standards. In compliance, there are no shortcuts, only rigorous adherence." },
              { icon: Award, title: "Unmatched Excellence", desc: "We deliver precision in every detail, backed by profound legal knowledge and continuous learning." },
              { icon: Users, title: "Client Partnership", desc: "We act as an extension of your team, deeply invested in your operational continuity and success." }
            ].map((value, i) => (
              <div key={i} className="text-center">
                <div className="w-20 h-20 mx-auto border border-white/20 rounded-full flex items-center justify-center text-teal-400 mb-6 bg-white/5">
                  <value.icon size={32} />
                </div>
                <h4 className="text-xl font-display font-bold mb-3">{value.title}</h4>
                <p className="text-white/60 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team CTA */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-display font-bold text-navy-900 mb-6">Join Our Roster of Experts</h2>
          <p className="text-gray-600 mb-8 text-lg">We are always looking for sharp legal minds and HR professionals who share our dedication to compliance excellence.</p>
          <Link to="/careers" className="inline-flex items-center gap-2 text-teal-600 font-bold hover:text-navy-900 transition-colors border-b-2 border-teal-600 hover:border-navy-900 pb-1 text-lg">
            View Career Opportunities <ChevronRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;