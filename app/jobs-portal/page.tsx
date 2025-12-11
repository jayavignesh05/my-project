"use client";
import React, { useState } from "react";
import Filters from "../components/jobs-portal/Filters";
import JobCard from "../components/jobs-portal/JobCard";
import UserProfile from "../components/jobs-portal/UserProfile";
// Import the new Details component
import JobDetails from "../components/jobs-portal/JobDetails";

const JobsPortalPage = () => {
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);

  // --- EXTENDED DATA based on your screenshots ---
  const jobs = [
    {
      id: 1,
      title: "React Developer",
      company: "CADD",
      postedAgo: "just now",
      openings: 50,
      applicants: "Less than 10",
      description:
        "Work on end-to-end systems and build scalable UI components.",
      interviewMode: "Walkin & Virtual",
      vacancies: 50,
      location: "Chennai",
      salary: "12 LPA",
      experience: "4 Years",
      skills: {
        required: ["React", "Node.js", "Express", "MongoDB"],
        userHas: ["Node.js", "Express"],
        missing: ["React", "MongoDB"],
      },
      matchPercentage: 70,
      recommendedCourse: {
        name: "Advanced React & State Management",
        action: "Enroll in Course",
      },
      eligibility: [
        "Freshers are eligible.",
        "12th pass or Graduate candidates are eligible.",
        "6 days work with 1 rotational week off.",
        "24/7 (any 9-hour shift), must be willing to work in night shift.",
      ],
      aboutCompany: {
        address:
          "Ashar IT Park, 2nd floor, Jayshree Baug, Road No.16/Z, Wagle Industrial Estate, Thane, Maharashtra 400604",
      },
    },
    {
      id: 2,
      title: "Frontend Developer",
      company: "Google",
      postedAgo: "2 days ago",
      openings: 12,
      applicants: "100+",
      description:
        "Build high-performance web applications using modern web technologies.",
      interviewMode: "Virtual",
      vacancies: 5,
      location: "Bangalore, Remote",
      salary: "6 LPA",
      experience: "2 Years",
      skills: {
        required: ["React", "Next.js", "Tailwind", "Redux"],
        userHas: ["React", "Tailwind"],
        missing: ["Next.js", "Redux"],
      },
      matchPercentage: 69,
      recommendedCourse: {
        name: "Next.js Mastery",
        action: "Enroll in Course",
      },
      eligibility: [
        "B.Tech / B.E graduates preferred.",
        "Minimum 2 years of hands-on experience.",
        "Flexible working hours.",
      ],
      aboutCompany: {
        address:
          "RMZ Infinity, Old Madras Rd, Bennigana Halli, Bangalore, Karnataka",
      },
    },
    {
      id: 3,
      title: "Backend Developer",
      company: "Amazon",
      postedAgo: "5 days ago",
      openings: 20,
      applicants: "500+",
      description: "Design and implement scalable backend services.",
      interviewMode: "Virtual",
      vacancies: 10,
      location: "Hyderabad",
      salary: "10 LPA",
      experience: "3 Years",
      skills: {
        required: ["Node.js", "Express", "MongoDB", "AWS"],
        userHas: ["Node.js", "Express", "MongoDB", "AWS"],
        missing: [],
      },
      matchPercentage: 96,
      eligibility: [
        "Computer Science Degree.",
        "Proficiency in Cloud Computing.",
      ],
      aboutCompany: {
        address: "Financial District, Nanakramguda, Hyderabad, Telangana",
      },
    },
  ];

  // Helper to find the full job object
  const selectedJob = jobs.find((j) => j.id === selectedJobId);

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      {/* 1. CONDITIONAL RENDERING: LIST vs DETAILS */}
      {selectedJob ? (
        // --- VIEW B: DETAILS PAGE ---
        <JobDetails
          job={selectedJob}
          onBack={() => setSelectedJobId(null)}
          similarJobs={jobs.filter((j) => j.id !== selectedJob.id)}
        />
      ) : (
        // --- VIEW A: DASHBOARD LIST ---
        <>
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Recommended Jobs for You
          </h1>

          <div className="grid grid-cols-12 gap-6">
            {/* Left Side: Filters */}
            <div className="col-span-12 lg:col-span-3">
              <Filters />
            </div>

            {/* Middle: Job Feed */}
            <div className="col-span-12 lg:col-span-6 space-y-4">
              {jobs.map((job) => (
                <div key={job.id} onClick={() => setSelectedJobId(job.id)}>
                 
                  <JobCard
                    onClick={() => setSelectedJobId(job.id)}
                    data={{
                      role: job.title,
                      company: job.company,
                      postedAgo: job.postedAgo,
                      description: job.description,
                      tags: job.skills.required.slice(0, 3), 
                      experience: job.experience,
                      salary: job.salary,
                      location: job.location,
                     
                      skills: job.skills,
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Right Side: Profile */}
            <div className="col-span-12 lg:col-span-3">
              <UserProfile />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default JobsPortalPage;
