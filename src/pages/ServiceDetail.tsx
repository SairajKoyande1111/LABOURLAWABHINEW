import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, FileText, Phone } from 'lucide-react';

const ServiceDetail = () => {
  const { slug } = useParams();
  
  const title = slug?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div className="w-full bg-white">
      {/* Hero */}
      <section className="bg-navy-900 text-white py-16 md:py-24 border-b-8 border-teal-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="/src/assets/service-labour.png" alt="Background" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <Link to="/services" className="inline-flex items-center gap-2 text-teal-400 hover:text-white transition-colors mb-8 font-medium">
            <ArrowLeft size={16} /> Back to All Services
          </Link>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">{title}</h1>
          <p className="text-xl text-white/80 max-w-2xl">Robust, proactive, and meticulous solutions to secure your business against regulatory risks.</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col lg:flex-row gap-16">
          <div className="lg:w-2/3">
            <div className="prose prose-lg max-w-none text-gray-700">
              <h2 className="text-3xl font-display font-bold text-navy-900 mb-6">Overview</h2>
              <p className="mb-6">
                Navigating the complex web of Indian labour laws requires precision and proactive management. Our {title} service is designed to provide end-to-end protection, ensuring your organization remains fully compliant while optimizing operational efficiency.
              </p>
              <p className="mb-10">
                With the impending enforcement of the New Labour Codes, the regulatory landscape is shifting. We audit your current practices, identify gaps, and implement frameworks that withstand the highest level of scrutiny from statutory bodies.
              </p>

              <h3 className="text-2xl font-display font-bold text-navy-900 mb-6">Key Deliverables</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                {[
                  "Comprehensive Compliance Audits",
                  "Statutory Register Maintenance",
                  "Risk Assessment & Mitigation",
                  "Liaison with Government Authorities",
                  "Regular Regulatory Updates",
                  "Documentation Standardization"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <CheckCircle className="text-teal-500 shrink-0 mt-0.5" size={20} />
                    <span className="font-medium text-navy-900">{item}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-2xl font-display font-bold text-navy-900 mb-6">Why It Matters</h3>
              <p>
                Non-compliance is no longer just a financial risk; it is a profound reputational risk. Director liability and severe penal provisions in the new codes mandate a zero-tolerance approach to compliance lapses. Partnering with Labour Codes ensures that your leadership can focus on growth, knowing the regulatory foundation is unshakeable.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 sticky top-32">
              <h3 className="text-xl font-display font-bold text-navy-900 mb-6">Ready to secure your compliance?</h3>
              <p className="text-gray-600 mb-8">Speak directly with our legal experts to discuss how this service applies to your specific industry.</p>
              
              <div className="space-y-4">
                <Link to="/contact" className="w-full bg-navy-900 text-white py-4 rounded font-bold hover:bg-navy-800 transition-colors flex items-center justify-center gap-2">
                  <FileText size={20} /> Request Proposal
                </Link>
                <a href="tel:+919876543210" className="w-full bg-white text-navy-900 border-2 border-navy-900 py-4 rounded font-bold hover:bg-navy-50 transition-colors flex items-center justify-center gap-2">
                  <Phone size={20} /> Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;