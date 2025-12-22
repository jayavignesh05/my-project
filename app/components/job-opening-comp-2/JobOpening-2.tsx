"use client";

import React, { useState } from "react";
import {
  MapPin,
  Banknote,
  ArrowRight,
  AlertCircle,
  Loader2,
  Building2,
  CalendarClock,
  GraduationCap,
  Briefcase,
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

const JobPortal2 = () => {
  // --- STATIC DATA ---
  const staticJobs: Job[] = [
    {
      company_name: "CADD Centre",
      post_type: "Internship",
      job_title: "Full Stack Developer Intern",
      job_location: "Chennai",
      education_qualification: "BE/B.Tech (CSE/IT)",
      Industry: "EdTech",
      stipend: "15,000 - 20,000",
      no_of_openings: 5,
      created_at: "2025-12-19T11:50:26.000Z",
      last_registration_date: "2025-12-30T18:30:00.000Z",
      status: 1,
    },
    {
      company_name: "Dreamzone",
      post_type: "Fulltime Job",
      job_title: "Senior UI/UX Designer",
      job_location: "Bangalore",
      education_qualification: "B.Des / Any Degree",
      Industry: "Creative Design",
      stipend: "45,000 - 60,000",
      no_of_openings: 3,
      created_at: "2025-12-18T11:50:26.000Z",
      last_registration_date: "2025-12-28T18:30:00.000Z",
      status: 1,
    },
    {
      company_name: "Synergy",
      post_type: "Internship",
      job_title: "Project Management Trainee",
      job_location: "Mumbai",
      education_qualification: "MBA / PGDM",
      Industry: "Management",
      stipend: "20,000 - 25,000",
      no_of_openings: 8,
      created_at: "2025-12-19T10:00:00.000Z",
      last_registration_date: "2026-01-05T18:30:00.000Z",
      status: 1,
    },
    {
      company_name: "Livewire",
      post_type: "Fulltime Job",
      job_title: "Data Science Associate",
      job_location: "Hyderabad",
      education_qualification: "B.Tech / M.Sc Data Science",
      Industry: "IT Services",
      stipend: "40,000 - 55,000",
      no_of_openings: 12,
      created_at: "2025-12-15T11:50:26.000Z",
      last_registration_date: "2025-12-31T18:30:00.000Z",
      status: 1,
    },
    {
      company_name: "CADD Centre",
      post_type: "Internship",
      job_title: "Digital Marketing Executive",
      job_location: "Coimbatore",
      education_qualification: "BBA / Any Arts",
      Industry: "Marketing",
      stipend: "12,000 - 18,000",
      no_of_openings: 15,
      created_at: "2025-12-19T11:50:26.000Z",
      last_registration_date: "2026-01-10T18:30:00.000Z",
      status: 1,
    },
    {
      company_name: "Tech Solutions",
      post_type: "Fulltime Job",
      job_title: "React Native Developer",
      job_location: "Remote",
      education_qualification: "B.E / B.Tech",
      Industry: "Software",
      stipend: "60,000 - 80,000",
      no_of_openings: 2,
      created_at: "2025-12-10T11:50:26.000Z",
      last_registration_date: "2025-12-25T18:30:00.000Z",
      status: 1,
    },
  ];

  const [jobs, setJobs] = useState<Job[]>(staticJobs);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
    });
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans">
      
      {/* Subtle Background */}
      <div className="fixed top-0 left-0 w-full h-full opacity-40 pointer-events-none -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-100 via-gray-100 to-gray-100" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Latest Openings</h1>
            <p className="text-gray-500 text-sm mt-1">Found {jobs.length} jobs available for you</p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="mx-auto max-w-lg text-center bg-white p-6 rounded-xl shadow-sm border border-red-100">
            <AlertCircle className="w-8 h-8 mx-auto text-red-400 mb-2" />
            <p className="text-gray-600">{error}</p>
          </div>
        )}

        {/* Success - NEW ROW DESIGN */}
        {!loading && !error && (
          <div className="flex flex-col gap-5">
            {jobs.map((job, index) => {
              const isInternship = job.post_type.toLowerCase().includes("internship");

              return (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    
                    {/* 1. Left: Logo & Main Info */}
                    <div className="flex items-start gap-4 flex-1">
                      {/* Company Logo Placeholder */}
                      <div className="w-14 h-14 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                        <Building2 size={26} strokeWidth={1.5} />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                          {job.job_title}
                        </h3>
                        
                        <div className="flex flex-wrap items-center gap-2 text-sm">
                            <span className="font-semibold text-gray-700">{job.company_name}</span>
                            <span className="hidden sm:inline w-1 h-1 rounded-full bg-gray-300" />
                            <span className="text-gray-500">{job.Industry}</span>
                        </div>

                        {/* Badges Row */}
                        <div className="flex flex-wrap gap-2 mt-2">
                           {/* Post Type Badge */}
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold tracking-wide uppercase ${
                                isInternship 
                                ? "bg-blue-50 text-blue-700 border border-blue-100" 
                                : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                            }`}>
                                <Briefcase size={12} />
                                {job.post_type}
                            </span>

                            {/* Location Badge */}
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-50 text-gray-600 border border-gray-200">
                                <MapPin size={12} />
                                {job.job_location}
                            </span>

                            {/* Qualification (Hidden on very small screens) */}
                            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-50 text-gray-600 border border-gray-200">
                                <GraduationCap size={12} />
                                {job.education_qualification}
                            </span>
                        </div>
                      </div>
                    </div>

                    {/* 2. Right: Salary & Action */}
                    <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 min-w-[140px] pt-4 md:pt-0 border-t md:border-t-0 border-gray-100">
                      
                      {/* Salary Info */}
                      <div className="text-left md:text-right">
                        <div className="flex items-center md:justify-end gap-1.5 text-gray-900 font-bold text-base">
                            <Banknote size={16} className="text-green-600" />
                            {job.stipend}
                        </div>
                        <p className="text-xs text-gray-400 font-medium mt-0.5 md:ml-auto">
                            per month
                        </p>
                      </div>

                      {/* Action Button */}
                      <div className="flex flex-col items-end gap-2">
                        <button className="px-5 py-2.5 bg-gray-900 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-colors flex items-center gap-2 shadow-md hover:shadow-lg">
                            View Details 
                            <ArrowRight size={14} />
                        </button>
                        <div className="hidden md:flex items-center gap-1 text-[11px] font-medium text-gray-400">
                            <CalendarClock size={12} />
                            Apply by {formatDate(job.last_registration_date)}
                        </div>
                      </div>

                    </div>
                  </div>
                  
                  {/* Mobile Date (Only visible on small screens) */}
                  <div className="md:hidden mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-medium">
                      <span className="flex items-center gap-1"><CalendarClock size={12}/> Deadline: {formatDate(job.last_registration_date)}</span>
                      <span>{job.no_of_openings} Openings</span>
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

export default JobPortal2;