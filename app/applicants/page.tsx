"use client";
import React, { useState } from "react";
import ApplicantsList, {
  Applicant,
} from "../components/applications/ApplicantsList";
import ApplicantDetails from "../components/applications/ApplicantDetails";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// --- 1. HELPER FUNCTION ---
function calculateMatchPercentage(
  requiredSkills: string[],
  userSkills: string[]
) {
  if (!requiredSkills || !requiredSkills.length) return 0;

  const matched = requiredSkills.filter((skill) =>
    userSkills.includes(skill)
  ).length;

  return Math.round((matched / requiredSkills.length) * 100);
}

// --- 2. RAW DATA (Match is calculated automatically below) ---
const rawApplicants = [
  
  {
    id: 1,
    name: "Chloe Rivera",
    role: "Senior UI/UX Designer",
    email: "chloe.rivera@example.com",
    phone: "555-0103",
    linkedin: "linkedin.com/in/chloerivera",
    location: "Austin, TX",
    score: 78,
    status: "Selected",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",

    requiredSkills: [
      "Figma",
      "Sketch",
      "Prototyping",
      "Wireframing",
      "User Research",
    ],
    skills: ["Figma", "Sketch", "Adobe XD", "Prototyping"], // Matches 4/5 = 80%? No, Adobe XD is extra. Matches 3 (Figma, Sketch, Prototyping) out of 5 = 60%

    education: [
      {
        id: 1,
        title: "B.Des in Interaction Design",
        institution: "Austin School of Design",
        date: "2015 - 2019",
      },
    ],
    experience: [
      {
        id: 1,
        title: "UI Designer",
        institution: "Creative Studio X",
        date: "2019 - 2022",
        description: "Designed mobile app interfaces for fintech clients.",
      },
    ],
  },
  {
    id: 2,
    name: "David Chen",
    role: "Frontend Developer",
    email: "david.chen@example.com",
    phone: "555-0104",
    linkedin: "linkedin.com/in/davidchen",
    location: "Seattle, WA",
    score: 95,
    status: "Selected",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",

    requiredSkills: ["React", "TypeScript", "Node.js", "AWS", "Docker"],
    skills: ["Python", "TensorFlow", "React", "Node.js"], // Matches 2 (React, Node) out of 5 = 40%

    education: [
      {
        id: 1,
        title: "M.S. in Computer Science",
        institution: "University of Washington",
        date: "2018 - 2020",
      },
      {
        id: 2,
        title: "B.S. Computer Science",
        institution: "Beijing University",
        date: "2014 - 2018",
      },
    ],
    experience: [
      {
        id: 1,
        title: "Web Developer",
        institution: "TechFlow Solutions",
        date: "2020 - 2023",
        description: "Worked on e-commerce platforms using MERN stack.",
      },
    ],
  },
  {
    id: 3,
    name: "Elena Vance",
    role: "Senior Frontend Engineer",
    email: "elena.vance@example.com",
    phone: "555-0101",
    linkedin: "linkedin.com/in/elenavance",
    location: "New York, NY",
    score: 90,
    status: "Rejected",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",

    requiredSkills: [
      "React",
      "TypeScript",
      "Node.js",
      "GraphQL",
      "Jest",
      "CSS",
    ],
    skills: ["TypeScript", "Node.js", "GraphQL", "Jest", "React"], // Matches 5 out of 6 = 83%

    education: [
      {
        id: 1,
        title: "B.Tech in Computer Science",
        institution: "St. Xavier's College of Engineering",
        date: "2016 - 2020",
      },
      {
        id: 2,
        title: "Higher Secondary",
        institution: "St. Joseph's Matriculation School",
        date: "2014 - 2016",
      },
    ],
    experience: [
      {
        id: 1,
        title: "Senior Frontend Engineer",
        institution: "ABC Technologies",
        date: "2022 - 2025",
        description:
          "Led a team of frontend developers, built scalable dashboards.",
      },
      {
        id: 2,
        title: "Frontend Developer",
        institution: "NovaSoft Pvt Ltd",
        date: "2020 - 2022",
        description:
          "Developed user interfaces, collaborated with backend teams.",
      },
    ],
  },
  {
    id: 4,
    name: "Leo Kim",
    role: "Cybersecurity Analyst",
    email: "leo.kim@example.com",
    phone: "555-0106",
    linkedin: "linkedin.com/in/leokim",
    location: "Boston, MA",
    score: 82,
    status: "Pending",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",

    requiredSkills: [
      "Network Security",
      "Python",
      "Linux",
      "Ethical Hacking",
      "SIEM",
    ],
    skills: ["Network Security", "Python"], // Matches 2 out of 5 = 40%

    education: [
      {
        id: 1,
        title: "B.S. Cybersecurity",
        institution: "MIT",
        date: "2017 - 2021",
      },
    ],
    experience: [
      {
        id: 1,
        title: "Security Intern",
        institution: "CyberSafe Corp",
        date: "2021 - 2022",
        description:
          "Monitored network traffic and analyzed security breaches.",
      },
    ],
  },
];

// --- 3. PROCESSED DATA (Calculates Match) ---
const applicantsData: Applicant[] = rawApplicants.map((applicant) => ({
  ...applicant,
  match: calculateMatchPercentage(applicant.requiredSkills, applicant.skills),
}));

const ApplicantsPage = () => {
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant>(
    applicantsData[0]
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans text-gray-900 overflow-hidden flex flex-col">
      {/* Page Header */}
      <div className="mb-4 shrink-0">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-orange-600 transition-colors mb-2 group"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Jobs
        </Link>
        <div className="flex items-baseline gap-2">
          <h1 className="text-2xl font-bold text-gray-900">Student List</h1>
          <span className="text-sm text-gray-500 font-medium">
            ({applicantsData.length} Candidates)
          </span>
        </div>
      </div>

      {/* MAIN LAYOUT: Side by Side with Gap */}
      <div className="flex flex-col lg:flex-row gap-6 items-start h-full overflow-hidden">
        {/* Left Side: List (Takes available width) */}
        <div className="flex-1 h-full min-w-0">
          <ApplicantsList
            applicants={applicantsData}
            selectedId={selectedApplicant.id}
            onSelect={setSelectedApplicant}
          />
        </div>

        {/* Right Side: Details (Fixed Width, Sticky) */}
        <div className="shrink-0 w-full lg:w-[350px]">
          <ApplicantDetails applicant={selectedApplicant} />
        </div>
      </div>
    </div>
  );
};

export default ApplicantsPage;
