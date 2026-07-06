import React from 'react';
import { MapPin, Briefcase, Clock, ChevronRight } from 'lucide-react';

const Careers = () => {
  const internalJobs = [
    { title: "Senior Labour Law Consultant", loc: "Mumbai", type: "Full-time", dept: "Legal Advisory" },
    { title: "Payroll Compliance Manager", loc: "Delhi NCR", type: "Full-time", dept: "Operations" },
    { title: "Statutory Audit Specialist", loc: "Bangalore", type: "Full-time", dept: "Audits" },
    { title: "HR Business Partner", loc: "Pune", type: "Full-time", dept: "Internal HR" }
  ];

  const clientJobs = [
    { title: "Plant HR Head", loc: "Ahmedabad", type: "Full-time", dept: "Manufacturing" },
    { title: "Compliance Executive", loc: "Chennai", type: "Contract", dept: "IT Services" },
    { title: "IR Manager (Industrial Relations)", loc: "Gurgaon", type: "Full-time", dept: "Automotive" },
    { title: "Welfare Officer", loc: "Hyderabad", type: "Full-time", dept: "Textiles" },
    { title: "Recruitment Specialist", loc: "Mumbai", type: "Contract", dept: "Retail" }
  ];

  const JobCard = ({ job, isInternal }) => (
    <div className={`p-6 md:p-8 rounded-xl border ${isInternal ? 'bg-white border-gray-200 shadow-sm hover:shadow-md' : 'bg-gray-50 border-gray-200 hover:border-teal-300'} transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6`}>
      <div>
        <h3 className="text-xl font-bold text-navy-900 mb-3">{job.title}</h3>
        <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-500">
          <span className="flex items-center gap-1"><MapPin size={16} className="text-teal-500" /> {job.loc}</span>
          <span className="flex items-center gap-1"><Clock size={16} className="text-teal-500" /> {job.type}</span>
          <span className="flex items-center gap-1"><Briefcase size={16} className="text-teal-500" /> {job.dept}</span>
        </div>
      </div>
      <button className={`shrink-0 px-8 py-3 rounded font-bold transition-colors flex items-center gap-2 ${isInternal ? 'bg-teal-500 text-white hover:bg-teal-600' : 'bg-navy-900 text-white hover:bg-navy-800'}`}>
        Apply Now <ChevronRight size={18} />
      </button>
    </div>
  );

  return (
    <div className="w-full">
      <section className="bg-navy-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Career Opportunities</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">Build your career with India's premier compliance firm, or discover opportunities with our esteemed corporate clients.</p>
        </div>
      </section>

      <div className="py-20 max-w-5xl mx-auto px-4 md:px-8">
        <section className="mb-24">
          <div className="mb-10 text-center md:text-left">
            <span className="text-teal-600 font-bold uppercase tracking-wider text-sm mb-2 block">Join Our Team</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-navy-900">Opportunities at Labour Codes</h2>
          </div>
          <div className="space-y-4">
            {internalJobs.map((job, i) => <JobCard key={i} job={job} isInternal={true} />)}
          </div>
        </section>

        <section>
          <div className="mb-10 text-center md:text-left">
            <span className="text-gray-500 font-bold uppercase tracking-wider text-sm mb-2 block">Client Placements</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-navy-900">Client Job Postings</h2>
            <p className="text-gray-600 mt-3">Exclusive roles sourced directly from our corporate client network.</p>
          </div>
          <div className="space-y-4">
            {clientJobs.map((job, i) => <JobCard key={i} job={job} isInternal={false} />)}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Careers;