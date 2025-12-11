import React from 'react';
import { Clock, Briefcase, MapPin } from 'lucide-react';

// Define the type for the data we pass in
interface JobProps {
  role: string;
  company: string;
  postedDays: number;
  matchScore: number;
  description: string;
  tags: string[];
  experience: string;
  salary: string;
  location: string;
}

const JobCard = ({ data }: { data: JobProps }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-bold text-lg text-gray-900">{data.role}</h3>
          <p className="text-gray-500 text-sm font-medium">{data.company}</p>
        </div>
        
        {/* Simple Circle Score Indicator */}
        <div className="relative w-10 h-10 flex items-center justify-center rounded-full border-2 border-green-500 text-[10px] font-bold text-green-700">
          {data.matchScore}%
        </div>
      </div>

      <div className="flex items-center gap-1 text-xs text-gray-400 mb-4">
        <Clock size={12} /> Posted: {data.postedDays} days ago
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