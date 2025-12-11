import React from 'react';
import { Clock, Briefcase, MapPin } from 'lucide-react';

// 1. Update Interface to include skills for calculation
interface JobProps {
  role: string;
  company: string;
  postedAgo: string;
  description: string;
  tags: string[];
  experience: string;
  salary: string;
  location: string;
  // New props needed for calculation
  skills: {
    required: string[];
    userHas: string[];
  };
}

const JobCard = ({ data, onClick }: { data: JobProps; onClick?: () => void }) => {
  
  // --- 2. DYNAMIC CALCULATION LOGIC ---
  const totalRequired = data.skills.required.length;
  
  // Count matches
  const matchedCount = data.skills.userHas.filter(skill => 
    data.skills.required.includes(skill)
  ).length;

  // Calculate Percentage
  const calculatedScore = totalRequired > 0 
    ? Math.round((matchedCount / totalRequired) * 100) 
    : 0;
  // -------------------------------------

  return (
    // Added onClick here so the parent click works
    <div onClick={onClick} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-bold text-lg text-gray-900">{data.role}</h3>
          <p className="text-gray-500 text-sm font-medium">{data.company}</p>
        </div>
        
        {/* Simple Circle Score Indicator (Design Unchanged) */}
        {/* 3. Replaced data.matchScore with calculatedScore */}
        <div className="relative w-10 h-10 flex items-center justify-center rounded-full border-2 border-green-500 text-[10px] font-bold text-green-700">
          {calculatedScore}%
        </div>
      </div>

      <div className="flex items-center gap-1 text-xs text-gray-400 mb-4">
        {/* Note: Ensure data.postedAgo is passed as a string like "2 days" */}
        <Clock size={12} /> Posted: {data.postedAgo} 
      </div>

      <div className="flex items-center gap-2 mb-4 text-gray-600 text-sm">
        <Briefcase size={14} /> {data.description}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {data.tags.map((tag, i) => (
          <span key={i} className="bg-orange-50 text-orange-600 px-3 py-1 rounded text-xs font-medium">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-sm text-gray-600">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><Briefcase size={14} /> {data.experience}</span>
          <span className="flex items-center gap-1">₹ {data.salary}</span>
          <span className="flex items-center gap-1"><MapPin size={14} /> {data.location}</span>
        </div>
      </div>
    </div>
  );
};

export default JobCard;