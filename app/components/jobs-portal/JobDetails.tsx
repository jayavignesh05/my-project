import React from 'react';
import { 
  ArrowLeft, MapPin, Briefcase, 
  Users, Check, Building2, ExternalLink, GraduationCap
} from 'lucide-react';

// --- Interfaces ---
interface JobData {
  id: number;
  title: string;
  company: string;
  salary: string;
  location: string;
  experience: string;
  postedAgo: string;
  openings: number;
  applicants: string;
  description: string;
  interviewMode: string;
  vacancies: number;
  eligibility: string[];
  aboutCompany: {
    address: string;
  };
  skills: {
    required: string[];
    userHas: string[];
    missing: string[];
  };
  matchPercentage: number;
  recommendedCourse?: {
    name: string;
    action: string;
  };
}

interface JobDetailsProps {
  job: JobData;
  onBack: () => void;
  similarJobs: JobData[];
}

const JobDetails: React.FC<JobDetailsProps> = ({ job, onBack, similarJobs }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 font-sans">
      
      {/* --- LEFT CONTENT (Main) --- */}
      <div className="flex-1 min-w-0">
        
        {/* Navigation */}
        <button 
          onClick={onBack} 
          className="group flex items-center gap-2 text-gray-400 hover:text-orange-600 transition-colors mb-6 text-sm font-medium"
        >
          <div className="p-1 rounded-full group-hover:bg-orange-50 transition-colors">
            <ArrowLeft size={18} />
          </div>
          Back to Jobs
        </button>

        {/* 1. HERO SECTION */}
        <div className="bg-white p-8 rounded-3xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            
            {/* Title & Info */}
            <div className="flex gap-5">
              {/* Logo: Changed to Orange Gradient */}
              <div className="w-16 h-16 bg-gradient-to-br from-orange-50 to-amber-50 text-orange-600 rounded-2xl flex items-center justify-center font-bold text-2xl shadow-inner border border-orange-100">
                {job.company.charAt(0)}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">{job.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 font-medium">
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-50 border border-gray-100">
                    <Building2 size={14} className="text-gray-400"/> {job.company}
                  </span>
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-50 border border-gray-100">
                    <MapPin size={14} className="text-gray-400"/> {job.location}
                  </span>
                  {/* Salary Badge: Light Orange */}
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-orange-50 text-orange-700 border border-orange-100">
                    <Briefcase size={14} /> {job.salary}
                  </span>
                </div>
              </div>
            </div>

            {/* Apply Action: Main Orange Button */}
            <div className="flex flex-col items-end gap-2 w-full md:w-auto">
              <button className="w-full md:w-auto bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-orange-200 transition-all active:scale-95 flex items-center justify-center gap-2">
                Apply Now <ExternalLink size={16} />
              </button>
              <p className="text-xs text-gray-400 font-medium">
                Posted {job.postedAgo} • {job.applicants} Applicants
              </p>
            </div>
          </div>

          <div className="h-px bg-gray-100 my-8"></div>

          {/* SKILLS & MATCH ANALYTICS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Skills List */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                Required Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {job.skills.required.map(skill => {
                  const hasSkill = job.skills.userHas.includes(skill);
                  return (
                    <span 
                      key={skill} 
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border flex items-center gap-1.5 transition-colors ${
                        hasSkill 
                          ? "bg-green-50 text-green-700 border-green-100" // Keep Green for "Have" (Logical)
                          : "bg-white text-gray-400 border-gray-200 border-dashed"
                      }`}
                    >
                      {hasSkill ? <Check size={12} strokeWidth={3} /> : <div className="w-2 h-2 rounded-full bg-orange-400"></div>}
                      {skill}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Match Indicator */}
            <div className="bg-orange-50/50 rounded-2xl p-5 border border-orange-100 flex flex-col justify-center">
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-semibold text-gray-600">Profile Match</span>
                <span className="text-2xl font-bold text-orange-600">{job.matchPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 bg-orange-500`}
                  style={{ width: `${job.matchPercentage}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                You possess <span className="font-bold text-orange-700">{Math.round((job.skills.userHas.length / job.skills.required.length) * 100)}%</span> of the required skills.
              </p>
            </div>
          </div>

          {/* COURSE RECOMMENDATION */}
          {job.skills.missing.length > 0 && (
            <div className="mt-8 relative overflow-hidden bg-gradient-to-r from-orange-100 to-orange-50 rounded-2xl border border-orange-200 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="relative z-10">
                 <div className="flex items-center gap-2 mb-2 text-orange-700 font-bold text-xs uppercase tracking-wide">
                    <GraduationCap size={16} /> Recommended Learning
                 </div>
                 <h4 className="text-gray-900 font-bold text-lg mb-1">
                   {job.recommendedCourse?.name}
                 </h4>
                 <p className="text-sm text-gray-600">
                   Master <span className="font-bold text-gray-800">{job.skills.missing.join(", ")}</span> to reach 100% eligibility.
                 </p>
              </div>
              <button className="relative z-10 whitespace-nowrap px-5 py-2.5 bg-white text-orange-600 font-bold text-sm rounded-xl border border-orange-100 shadow-sm hover:shadow-md transition-all">
                Enroll Now
              </button>
            </div>
          )}
        </div>

        {/* 2. DETAILS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { label: 'Experience', value: job.experience, icon: <Briefcase size={18} className="text-orange-400"/> },
            { label: 'Work Mode', value: job.interviewMode, icon: <Users size={18} className="text-orange-400"/> },
            { label: 'Vacancies', value: job.vacancies, icon: <Users size={18} className="text-orange-400"/> },
          ].map((item, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-center hover:border-orange-100 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                {item.icon}
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">{item.label}</span>
              </div>
              <span className="text-lg font-bold text-gray-900 ml-8">{item.value}</span>
            </div>
          ))}
        </div>

        {/* 3. LONG CONTENT (Description & About) */}
        <div className="bg-white p-8 rounded-3xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 space-y-10">
          
          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              Job Description
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              {job.description}
            </p>
          </section>

          <div className="h-px bg-gray-50"></div>

          <section>
             <h3 className="text-lg font-bold text-gray-900 mb-4">Eligibility Criteria</h3>
             <ul className="space-y-3">
               {job.eligibility.map((item, idx) => (
                 <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0"></div>
                    <span className="leading-relaxed">{item}</span>
                 </li>
               ))}
             </ul>
          </section>

          <div className="h-px bg-gray-50"></div>

          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-4">About {job.company}</h3>
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <p className="text-sm text-gray-600 flex gap-3">
                <MapPin className="shrink-0 text-gray-400 mt-0.5" size={18} />
                <span>{job.aboutCompany.address}</span>
              </p>
            </div>
          </section>

        </div>

      </div>

      {/* --- RIGHT SIDEBAR (Suggestions) --- */}
      <div className="w-full lg:w-80 shrink-0">
        <div className="sticky top-8">
           <div className="flex items-center justify-between mb-4 px-1">
             <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide">Similar Jobs</h3>
           </div>
           
           <div className="flex flex-col gap-3">
             {similarJobs.map(simJob => (
               <div key={simJob.id} className="group bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-orange-200 transition-all cursor-pointer">
                 <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm group-hover:text-orange-600 transition-colors">
                        {simJob.title}
                      </h4>
                      <p className="text-xs text-gray-400 font-medium">{simJob.company}</p>
                    </div>
                    <div className={`text-[10px] font-bold px-2 py-1 rounded-md ${
                      simJob.matchPercentage > 75 ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {simJob.matchPercentage}%
                    </div>
                 </div>
                 
                 <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                      <Briefcase size={10} /> {simJob.experience}
                    </span>
                    <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                      <MapPin size={10} /> {simJob.location.split(',')[0]}
                    </span>
                 </div>
               </div>
             ))}
           </div>
        </div>
      </div>

    </div>
  );
};

export default JobDetails;