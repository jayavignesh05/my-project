"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Briefcase,
  Users,
  Clock,
  Ban,
  ArrowUpAZ,
  ArrowDownZA,
} from "lucide-react";

import FilterBar from "./FilterBar";
import StatsCard from "./StatsCard";
import JobCard from "./JobCard";
import JobTabs from "./JobTabs";
import { jobList } from "./JobData";


// export const jobList = [
//   {
//     role: "Senior Frontend Developer",
//     description: "Lead UI development using React, TypeScript, and Tailwind.",
//     location: "San Francisco, CA",
//     type: "Full time",
//     status: "Published",
//     applicants: 39,
//     salaryMin: 20000,
//     salaryMax: 30000,
//     workMode: "Onsite",
//     experience: "5+ Yrs",
//     vacancy: 20,
//     deadline: "2025-02-28",
//     skills: ["Java", "Python", "HTML"],
//     assessmentTitle: "Frontend Coding Test",
//     assessmentFile: "photo.jpg",
//     internalNotes: "Strong portfolio required.",
//   },
//   {
//     role: "Full Stack Developer",
//     description: "Work on backend (Node.js) and frontend (React).",
//     location: "New York, NY",
//     type: "Full time",
//     status: "Published",
//     applicants: 18,
//     salaryMin: 25000,
//     salaryMax: 42000,
//     workMode: "Hybrid",
//     experience: "3-5 Yrs",
//     vacancy: 5,
//     deadline: "2025-03-05",
//     skills: ["Node.js", "React", "MongoDB"],
//     assessmentTitle: "Full Stack Assignment",
//     assessmentFile: "fullstack_test.pdf",
//     internalNotes: "Strong API skills preferred.",
//   },
//   {
//     role: "Mobile App Developer",
//     description: "Build cross-platform apps using Flutter.",
//     location: "Remote",
//     type: "Contract",
//     status: "Published",
//     applicants: 22,
//     salaryMin: 15000,
//     salaryMax: 28000,
//     workMode: "Remote",
//     experience: "1-3 Yrs",
//     vacancy: 3,
//     deadline: "2025-02-25",
//     skills: ["Flutter", "Dart", "Firebase"],
//     assessmentTitle: "Mobile App Task",
//     assessmentFile: "mobile.pdf",
//     internalNotes: "Contract for 6 months.",
//   },
//   {
//     role: "Backend Engineer",
//     description: "Develop scalable APIs using Django and PostgreSQL.",
//     location: "London, UK",
//     type: "Full time",
//     status: "Published",
//     applicants: 12,
//     salaryMin: 30000,
//     salaryMax: 55000,
//     workMode: "Onsite",
//     experience: "3-5 Yrs",
//     vacancy: 4,
//     deadline: "2025-03-10",
//     skills: ["Django", "Python", "PostgreSQL"],
//     assessmentTitle: "Backend API Test",
//     assessmentFile: "backend.pdf",
//     internalNotes: "Focus on scalability.",
//   },
//   {
//     role: "Data Scientist",
//     description: "Analyze datasets and build ML models.",
//     location: "Austin, TX",
//     type: "Full time",
//     status: "Published",
//     applicants: 20,
//     salaryMin: 35000,
//     salaryMax: 60000,
//     workMode: "Hybrid",
//     experience: "1-3 Yrs",
//     vacancy: 6,
//     deadline: "2025-03-01",
//     skills: ["Python", "TensorFlow", "SQL"],
//     assessmentTitle: "ML Assessment",
//     assessmentFile: "ml_task.docx",
//     internalNotes: "Strong stats background.",
//   },
//   {
//     role: "UI/UX Designer",
//     description: "Design wireframes, prototypes, and user flows.",
//     location: "Remote",
//     type: "Full time",
//     status: "Published",
//     applicants: 48,
//     salaryMin: 18000,
//     salaryMax: 28000,
//     workMode: "Remote",
//     experience: "1-3 Yrs",
//     vacancy: 2,
//     deadline: "2025-02-20",
//     skills: ["Figma", "Adobe XD", "Prototyping"],
//     assessmentTitle: "Design Challenge",
//     assessmentFile: "ux.pdf",
//     internalNotes: "Portfolio required.",
//   },
//   {
//     role: "DevOps Engineer",
//     description: "Manage CI/CD pipelines and cloud infrastructure.",
//     location: "Berlin, Germany",
//     type: "Full time",
//     status: "Published",
//     applicants: 33,
//     salaryMin: 40000,
//     salaryMax: 70000,
//     workMode: "Hybrid",
//     experience: "3-5 Yrs",
//     vacancy: 3,
//     deadline: "2025-03-15",
//     skills: ["AWS", "Docker", "Kubernetes"],
//     assessmentTitle: "DevOps Practical Test",
//     assessmentFile: "devops.doc",
//     internalNotes: "Must know Terraform.",
//   },
//   {
//     role: "Cybersecurity Analyst",
//     description: "Monitor systems and handle security incidents.",
//     location: "Toronto, Canada",
//     type: "Full time",
//     status: "Published",
//     applicants: 17,
//     salaryMin: 32000,
//     salaryMax: 52000,
//     workMode: "Onsite",
//     experience: "1-3 Yrs",
//     vacancy: 4,
//     deadline: "2025-02-27",
//     skills: ["SIEM", "Python", "Network Security"],
//     assessmentTitle: "Security Test",
//     assessmentFile: "cyber.pdf",
//     internalNotes: "Experience with SOC tools required.",
//   },
//   {
//     role: "HR Manager",
//     description: "Handle recruitment, payroll, and HR policies.",
//     location: "Seattle, WA",
//     type: "Full time",
//     status: "Published",
//     applicants: 10,
//     salaryMin: 25000,
//     salaryMax: 40000,
//     workMode: "Onsite",
//     experience: "5+ Yrs",
//     vacancy: 1,
//     deadline: "2025-03-12",
//     skills: ["Communication", "HRMS", "Policy Writing"],
//     assessmentTitle: "HR Case Study",
//     assessmentFile: "hr.docx",
//     internalNotes: "Prefer MBA HR.",
//   },
//   {
//     role: "Marketing Specialist",
//     description: "Plan campaigns and manage social media.",
//     location: "Chicago, IL",
//     type: "Part time",
//     status: "Published",
//     applicants: 15,
//     salaryMin: 12000,
//     salaryMax: 20000,
//     workMode: "Remote",
//     experience: "1-3 Yrs",
//     vacancy: 2,
//     deadline: "2025-02-22",
//     skills: ["SEO", "Content Writing", "Analytics"],
//     assessmentTitle: "Marketing Task",
//     assessmentFile: "marketing.pdf",
//     internalNotes: "Experience with ads required.",
//   },
//   {
//     role: "Cloud Architect",
//     description: "Design large-scale cloud solutions.",
//     location: "Bangalore, India",
//     type: "Full time",
//     status: "Published",
//     applicants: 9,
//     salaryMin: 50000,
//     salaryMax: 80000,
//     workMode: "Hybrid",
//     experience: "5+ Yrs",
//     vacancy: 2,
//     deadline: "2025-03-20",
//     skills: ["Azure", "AWS", "Architecture"],
//     assessmentTitle: "Cloud Architecture Test",
//     assessmentFile: "cloud.pdf",
//     internalNotes: "Must have multi-cloud experience.",
//   },
//   {
//     role: "Content Writer",
//     description: "Write blogs, scripts, and marketing content.",
//     location: "Remote",
//     type: "Freelance",
//     status: "Published",
//     applicants: 42,
//     salaryMin: 8000,
//     salaryMax: 15000,
//     workMode: "Remote",
//     experience: "Fresher",
//     vacancy: 5,
//     deadline: "2025-02-18",
//     skills: ["Writing", "Research", "SEO"],
//     assessmentTitle: "Writing Sample",
//     assessmentFile: "content.doc",
//     internalNotes: "Must deliver 3 articles per week.",
//   },
// ];


const JobDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationTerm, setLocationTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("All");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const router = useRouter();

  const counts = jobList.reduce((acc, job) => {
    acc["All"] = (acc["All"] || 0) + 1;
    acc[job.status] = (acc[job.status] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });

  const totalApplicants = jobList.reduce((acc, job) => acc + job.applicants, 0);

  const filteredJobs = jobList
    .filter((job) => {
      if (activeTab !== "All" && job.status !== activeTab) return false;
      const matchesSearch = job.role
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesLocation = job.location
        .toLowerCase()
        .includes(locationTerm.toLowerCase());
      const matchesType =
        selectedTypes.length === 0 ||
        selectedTypes.some((type) =>
          job.type.toLowerCase().includes(type.toLowerCase())
        );
      return matchesSearch && matchesLocation && matchesType;
    })
    .sort((a, b) => {
      if (sortOrder === "asc") return a.role.localeCompare(b.role);
      return b.role.localeCompare(a.role);
    });

  return (
    <div className="p-8 w-full max-w-7xl mx-auto font-sans text-gray-900 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-gray-900">
            Job Board
          </h1>
          <p className="text-gray-500">Manage your openings and applicants.</p>
        </div>
        <button
          onClick={() => router.push("/JobPostForm")}
          className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-full font-medium flex items-center transition-all shadow-lg shadow-orange-200 hover:-translate-y-0.5"
        >
          <Plus size={18} className="mr-2" /> Create New Job
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Open Positions"
          count={counts["Published"] || 0}
          icon={<Briefcase size={24} />}
          iconBgClass="bg-indigo-50"
          iconColorClass="text-indigo-600"
        />
        <StatsCard
          title="Total Applicants"
          count={totalApplicants}
          icon={<Users size={24} />}
          iconBgClass="bg-orange-50"
          iconColorClass="text-orange-600"
        />
        <StatsCard
          title="On-Hold"
          count={counts["On Hold"] || 0}
          icon={<Clock size={24} />}
          iconBgClass="bg-amber-50"
          iconColorClass="text-amber-600"
        />
        <StatsCard
          title="Closed Jobs"
          count={counts["Closed"] || 0}
          icon={<Ban size={24} />}
          iconBgClass="bg-rose-50"
          iconColorClass="text-rose-600"
        />
      </div>

      <FilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        locationTerm={locationTerm}
        setLocationTerm={setLocationTerm}
        selectedTypes={selectedTypes}
        setSelectedTypes={setSelectedTypes}
      />

      <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
        {activeTab === "All" ? "All Jobs" : `${activeTab} Jobs`}
        <span className="text-xs font-normal text-orange-600 bg-orange-50 border border-orange-100 px-2 py-1 rounded-full">
          {filteredJobs.length}
        </span>
      </h2>
      <div className="flex justify-between items-center mb-6">
        <JobTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          counts={counts}
        />
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="flex items-center gap-2 text-sm font-medium text-gray-500 bg-white border border-gray-200 px-3 py-2 rounded-lg shadow-sm hover:border-gray-300 hover:text-gray-700 transition-all"
        >
          {sortOrder === "asc" ? (
            <ArrowUpAZ size={16} />
          ) : (
            <ArrowDownZA size={16} />
          )}
          <span className="hidden sm:inline">Sort</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredJobs.map((job, index) => (
          <JobCard
            key={jobList.indexOf(job)}
            index={jobList.indexOf(job)}
            title={job.role}
            location={job.location}
            type={job.type}
            status={job.status as "Published" | "Closed" | "On Hold"}
            applicantCount={job.applicants}
          />
        ))}
      </div>
    </div>
  );
};

export default JobDashboard;
