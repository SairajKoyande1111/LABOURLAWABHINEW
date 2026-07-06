import React, { useState } from 'react';
import { Download, ChevronRight, Calendar, Tag } from 'lucide-react';

const Resources = () => {
  const [filter, setFilter] = useState('All');

  const filters = ['All', 'Blogs', 'Downloads', 'Resources'];

  const blogs = [
    { type: 'Blogs', category: 'New Labour Codes', title: 'Understanding the New Wage Code', desc: 'A comprehensive guide to how the new definitions of wages impact your salary structure and PF contributions.', date: 'Oct 15, 2024', img: '/src/assets/service-payroll.png' },
    { type: 'Blogs', category: 'Compliance', title: 'Navigating State-Specific Leaves', desc: 'Analyzing the variations in sick, casual, and earned leaves across different Indian states.', date: 'Oct 02, 2024', img: '/src/assets/service-hr.png' },
    { type: 'Blogs', category: 'Litigation', title: 'Preparing for Labour Inspections', desc: 'Key documents and registers you must have updated before an unexpected factory inspection.', date: 'Sep 28, 2024', img: '/src/assets/service-audits.png' },
  ];

  const downloads = [
    { type: 'Downloads', title: 'PF Calculation Template 2024', desc: 'Excel spreadsheet for accurate PF deductions based on the latest guidelines.', size: '45 KB (XLSX)' },
    { type: 'Downloads', title: 'Sample Employment Contract', desc: 'Standardized template updated for New Labour Code compliance.', size: '120 KB (DOCX)' },
    { type: 'Resources', title: 'Minimum Wage Chart - Q3 2024', desc: 'Comprehensive list of state-wise minimum wages for skilled and unskilled labour.', size: '2 MB (PDF)' },
  ];

  const items = [...blogs, ...downloads];
  const filteredItems = filter === 'All' ? items : items.filter(item => item.type === filter);

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      <section className="bg-navy-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Resources & Insights</h1>
          <p className="text-xl text-white/80 max-w-2xl">Expert analysis, regulatory updates, and practical templates to keep you informed and compliant.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-12 border-b border-gray-200 pb-6">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-full font-medium text-sm transition-all ${filter === f ? 'bg-teal-500 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:border-teal-500 hover:text-teal-600'}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
              {item.type === 'Blogs' ? (
                <>
                  <div className="h-48 relative overflow-hidden">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4 bg-navy-900 text-white text-xs font-bold px-3 py-1 rounded">BLOG</div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-xs text-gray-500 font-medium uppercase tracking-wider mb-3">
                      <span className="flex items-center gap-1"><Tag size={14} className="text-teal-500" /> {item.category}</span>
                      <span className="flex items-center gap-1"><Calendar size={14} className="text-teal-500" /> {item.date}</span>
                    </div>
                    <h3 className="text-xl font-display font-bold text-navy-900 mb-3 line-clamp-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm mb-6 flex-grow">{item.desc}</p>
                    <button className="text-teal-600 font-bold flex items-center gap-2 hover:text-navy-900 transition-colors mt-auto">
                      Read Article <ChevronRight size={16} />
                    </button>
                  </div>
                </>
              ) : (
                <div className="p-8 flex flex-col h-full border-t-4 border-teal-500">
                  <div className="inline-block bg-teal-50 text-teal-600 text-xs font-bold px-3 py-1 rounded mb-4 w-max uppercase tracking-wider">
                    {item.type}
                  </div>
                  <h3 className="text-xl font-display font-bold text-navy-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-8 flex-grow">{item.desc}</p>
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100">
                    <span className="text-xs font-medium text-gray-500">{item.size}</span>
                    <button className="flex items-center gap-2 bg-navy-900 text-white px-4 py-2 rounded text-sm font-medium hover:bg-teal-600 transition-colors">
                      <Download size={16} /> Download
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;