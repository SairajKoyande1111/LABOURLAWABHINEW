import React from 'react';
import { motion } from 'framer-motion';

const Clientele = () => {
  const clients = [
    'BCG', 'HDFC Bank', 'Hilton', 'Croma', 'Datamatics', 
    'NPCI', 'Kodak', 'Tata', 'Mahindra', 'Reliance', 
    'Infosys', 'Wipro', 'ITC', 'L&T', 'Maruti Suzuki',
    'Aditya Birla', 'Godrej', 'Cipla', 'TVS', 'Hero'
  ];

  return (
    <div className="w-full bg-white">
      <section className="bg-navy-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Our Esteemed Clientele</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">Trusted by India's largest corporations to safeguard their compliance and manage their workforce regulations.</p>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {clients.map((client, i) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.4, delay: i * 0.05 }}
              key={i} 
              className="bg-gray-50 border border-gray-200 aspect-[3/2] rounded-xl flex items-center justify-center p-6 shadow-sm hover:shadow-lg hover:border-teal-200 transition-all group"
            >
              <span className="font-display font-black text-2xl md:text-3xl text-navy-900/40 group-hover:text-teal-600 transition-colors tracking-tight text-center">
                {client.toUpperCase()}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-teal-50 border-t border-teal-100 text-center">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-display font-bold text-navy-900 mb-6">Join industry leaders who trust Labour Codes.</h2>
          <button className="bg-navy-900 text-white px-8 py-4 rounded font-bold hover:bg-teal-600 transition-colors shadow-lg">
            Discuss Your Requirements
          </button>
        </div>
      </section>
    </div>
  );
};

export default Clientele;