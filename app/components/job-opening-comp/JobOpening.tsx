"use client";

import React, { useEffect, useState } from "react";
import {
  MapPin,
  Banknote,
  ArrowRight,
  AlertCircle,
  Loader2,
  GraduationCap,
  Users,
  Briefcase,
  Building2, // Imported the Company Icon
} from "lucide-react";

// --- Types ---
interface Job {
  company_name: string;
  post_type: string;
  job_title: string;
  job_location: string;
  education_qualification: string;
  Industry: string;
  stipend: string;
  no_of_openings: number;
  created_at?: string;
  last_registration_date: string;
  status?: number;
}

interface ApiResponse {
  status: number;
  data: {
    aaData: Job[];
  };
  message?: string;
}

const JobPortal = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:2000/api/job_view", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source: "list_view_jobs",
        }),
      });

      const result: ApiResponse = await response.json();
      if (result.status === 200 && result.data && result.data.aaData) {
        setJobs(result.data.aaData);
      } else {
        setJobs([]);
      }
    } catch (err) {
      setError("Failed to connect to API");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-orange-200">
      
      {/* Background decoration */}
      <div className="fixed top-0 left-0 w-full h-96 bg-gradient-to-b from-orange-50 to-transparent -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header */}
        

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="mx-auto max-w-lg text-center bg-white p-8 rounded-3xl shadow-sm border border-red-100">
            <AlertCircle className="w-10 h-10 mx-auto text-red-400 mb-3" />
            <p className="text-slate-600">{error}</p>
          </div>
        )}

        {/* Success */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map((job, index) => {
              const isInternship = job.post_type.toLowerCase().includes("internship");

              return (
                <div
                  key={index}
                  className="group bg-white rounded-3xl border border-slate-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] hover:shadow-[0_10px_40px_-3px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden relative"
                >
                  
                  {/* Top Section: Gradient Header */}
                  <div className="bg-gradient-to-b from-orange-50/80 to-white px-6 pt-6 pb-2">
                    <div className="flex justify-between items-start">
                      
                      {/* Logo + Company Name Block */}
                      <div className="flex items-center gap-3">
                        {/* CHANGED: Using static Building2 Icon instead of Letter 
                        */}
                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-orange-100 flex items-center justify-center text-orange-500">
                          <Building2 size={24} />
                        </div>
                        
                        <div>
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">{job.Industry}</h4>
                          <h3 className="text-sm font-bold text-slate-800 line-clamp-1">{job.company_name}</h3>
                        </div>
                      </div>

                      {/* Floating Status Badge */}
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border shadow-sm ${
                        isInternship 
                        ? "bg-white text-blue-600 border-blue-100" 
                        : "bg-white text-emerald-600 border-emerald-100"
                      }`}>
                        {job.post_type}
                      </span>
                    </div>
                  </div>

                  {/* Middle Section: Job Title & Grid Data */}
                  <div className="px-6 py-2 flex-grow">
                    
                    {/* Hero Title */}
                    <div className="mb-6 mt-2">
                       <h2 className="text-xl font-extrabold text-slate-900 leading-snug group-hover:text-orange-600 transition-colors">
                          {job.job_title}
                       </h2>
                    </div>

                    {/* The 2x2 Info Grid - Perfect Alignment */}
                    <div className="grid grid-cols-2 gap-y-5 gap-x-4 border-t border-slate-50 pt-5">
                       
                       {/* 1. Salary */}
                       <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 uppercase">
                             <Banknote size={14} className="text-orange-500" /> Salary
                          </div>
                          <span className="text-sm font-bold text-slate-900 truncate" title={job.stipend}>
                             {job.stipend}
                          </span>
                       </div>

                       {/* 2. Location */}
                       <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 uppercase">
                             <MapPin size={14} className="text-orange-500" /> Location
                          </div>
                          <span className="text-sm font-bold text-slate-900 truncate" title={job.job_location}>
                             {job.job_location}
                          </span>
                       </div>

                       {/* 3. Qualification */}
                       <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 uppercase">
                             <GraduationCap size={14} className="text-orange-500" /> Qual.
                          </div>
                          <span className="text-sm font-medium text-slate-700 truncate" title={job.education_qualification}>
                             {job.education_qualification}
                          </span>
                       </div>

                       {/* 4. Openings */}
                       <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 uppercase">
                             <Users size={14} className="text-orange-500" /> Openings
                          </div>
                          <span className="text-sm font-medium text-slate-700">
                             {job.no_of_openings} Seats
                          </span>
                       </div>

                    </div>
                  </div>

                  {/* Footer Section: Action */}
                  <div className="p-6 mt-2">
                    <button className="w-full py-3.5 rounded-xl bg-slate-900 text-white font-bold text-sm shadow-lg shadow-slate-200 group-hover:bg-orange-600 group-hover:shadow-orange-200 transition-all duration-300 flex items-center justify-between px-6">
                       <span>Apply Now</span>
                       <div className="flex items-center gap-2">
                          <span className="text-[10px] font-normal opacity-70 border-r border-white/20 pr-3 mr-1">
                            Ends {formatDate(job.last_registration_date)}
                          </span>
                          <ArrowRight size={16} />
                       </div>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobPortal;