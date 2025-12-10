"use client";
import React, { useState } from "react";
import ApplicantsList from "../components/applications/ApplicantsList";
import ApplicantDetails, {
  Applicant,
} from "../components/applications/ApplicantDetails";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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
    status: "Pending",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    requiredSkills: [
      "Figma",
      "Sketch",
      "Prototyping",
      "Wireframing",
      "User Research",
    ],
    skills: ["Figma", "Sketch", "Adobe XD", "Prototyping"],
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
    skills: ["Python", "TensorFlow", "React", "Node.js"],
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
    status: "Pending",
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
    skills: ["TypeScript", "Node.js", "GraphQL", "Jest", "React"],
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
    status: "Rejected",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
    requiredSkills: [
      "Network Security",
      "Python",
      "Linux",
      "Ethical Hacking",
      "SIEM",
    ],
    skills: ["Network Security", "Python"],
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
  {
    id: 5,
    name: "Marcus Johnson",
    role: "Backend Engineer",
    email: "marcus.j@example.com",
    phone: "555-0107",
    linkedin: "linkedin.com/in/marcusj",
    location: "Chicago, IL",
    score: 88,
    status: "Selected",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150",
    requiredSkills: ["Java", "Spring Boot", "Microservices", "SQL", "Docker"],
    skills: ["Java", "Spring Boot", "SQL", "Hibernate", "Docker"],
    education: [
      {
        id: 1,
        title: "B.S. Software Engineering",
        institution: "University of Illinois",
        date: "2015 - 2019",
      },
    ],
    experience: [
      {
        id: 1,
        title: "Backend Dev",
        institution: "FinTech Global",
        date: "2019 - 2023",
        description: "Optimized API latency by 40% using Redis caching.",
      },
    ],
  },
  {
    id: 6,
    name: "Priya Patel",
    role: "Data Scientist",
    email: "priya.p@example.com",
    phone: "555-0108",
    linkedin: "linkedin.com/in/priyapatel",
    location: "San Francisco, CA",
    score: 92,
    status: "Pending",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
    requiredSkills: ["Python", "Machine Learning", "Pandas", "SQL", "Tableau"],
    skills: ["Python", "R", "Pandas", "SQL", "PowerBI"],
    education: [
      {
        id: 1,
        title: "M.S. Data Science",
        institution: "Stanford University",
        date: "2019 - 2021",
      },
    ],
    experience: [
      {
        id: 1,
        title: "Data Analyst",
        institution: "CloudData Inc",
        date: "2021 - 2024",
        description: "Built predictive models for customer churn analysis.",
      },
    ],
  },
  {
    id: 7,
    name: "James Wilson",
    role: "DevOps Engineer",
    email: "james.w@example.com",
    phone: "555-0109",
    linkedin: "linkedin.com/in/jameswilson",
    location: "Denver, CO",
    score: 85,
    status: "Pending",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    requiredSkills: ["AWS", "Kubernetes", "Terraform", "CI/CD", "Linux"],
    skills: ["AWS", "Docker", "Jenkins", "Linux", "Bash"],
    education: [
      {
        id: 1,
        title: "B.S. Network Engineering",
        institution: "Colorado State",
        date: "2016 - 2020",
      },
    ],
    experience: [
      {
        id: 1,
        title: "SysAdmin",
        institution: "ServerCo",
        date: "2020 - 2022",
        description: "Managed on-premise servers and migrated to AWS.",
      },
    ],
  },
  {
    id: 8,
    name: "Sophia Martinez",
    role: "Product Manager",
    email: "sophia.m@example.com",
    phone: "555-0110",
    linkedin: "linkedin.com/in/sophiam",
    location: "Miami, FL",
    score: 75,
    status: "Rejected",
    avatar:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=150&h=150",
    requiredSkills: [
      "Agile",
      "Jira",
      "Roadmapping",
      "StakePendinger Management",
      "SQL",
    ],
    skills: ["Agile", "Jira", "Scrum", "Product Strategy"],
    education: [
      {
        id: 1,
        title: "MBA",
        institution: "University of Miami",
        date: "2017 - 2019",
      },
    ],
    experience: [
      {
        id: 1,
        title: "Junior PM",
        institution: "StartUp Hub",
        date: "2019 - 2021",
        description: "Managed the launch of the mobile application.",
      },
    ],
  },
  {
    id: 9,
    name: "Lucas Garcia",
    role: "Mobile Developer",
    email: "lucas.g@example.com",
    phone: "555-0111",
    linkedin: "linkedin.com/in/lucasg",
    location: "Los Angeles, CA",
    score: 80,
    status: "Pending",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150",
    requiredSkills: ["Swift", "iOS", "React Native", "Firebase", "Git"],
    skills: ["Swift", "Xcode", "iOS SDK", "Git"],
    education: [
      {
        id: 1,
        title: "B.S. Computer Science",
        institution: "UCLA",
        date: "2018 - 2022",
      },
    ],
    experience: [
      {
        id: 1,
        title: "iOS Intern",
        institution: "AppWorks",
        date: "2022 - 2023",
        description: "Assisted in bug fixing and UI implementation.",
      },
    ],
  },
  {
    id: 10,
    name: "Emily Clark",
    role: "QA Engineer",
    email: "emily.c@example.com",
    phone: "555-0112",
    linkedin: "linkedin.com/in/emilyc",
    location: "Portland, OR",
    score: 89,
    status: "Pending",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150&h=150",
    requiredSkills: ["Selenium", "Java", "TestNG", "Jira", "Automation"],
    skills: ["Selenium", "Java", "Manual Testing", "Postman", "Jira"],
    education: [
      {
        id: 1,
        title: "B.S. Info Systems",
        institution: "Portland State",
        date: "2017 - 2021",
      },
    ],
    experience: [
      {
        id: 1,
        title: "QA Tester",
        institution: "SoftServe",
        date: "2021 - 2024",
        description: "Wrote automated test scripts for web applications.",
      },
    ],
  },
];

const initialApplicants: Applicant[] = rawApplicants.map((app) => ({
  ...app,
  match: calculateMatchPercentage(app.requiredSkills, app.skills),
}));

const ApplicantsPage = () => {
  const [allApplicants, setAllApplicants] =
    useState<Applicant[]>(initialApplicants);
  const [selectedId, setSelectedId] = useState<number>(initialApplicants[0].id);

  const selectedApplicant =
    allApplicants.find((a) => a.id === selectedId) || allApplicants[0];

  const handleStatusUpdate = (newStatus: string) => {
    const updatedList = allApplicants.map((app) =>
      app.id === selectedId ? { ...app, status: newStatus } : app
    );
    setAllApplicants(updatedList);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans text-gray-900 overflow-hidden flex flex-col">
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
            ({allApplicants.length} Candidates)
          </span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start h-163 overflow-hidden">
        <div className="flex-1 h-full min-w-0">
          <ApplicantsList
            applicants={allApplicants}
            selectedId={selectedId}
            onSelect={(app) => setSelectedId(app.id)}
          />
        </div>

        <div className="shrink-0 w-full lg:w-[350px] h-full">
          <ApplicantDetails
            key={selectedApplicant.id}
            applicant={selectedApplicant}
            onStatusChange={handleStatusUpdate}
          />
        </div>
      </div>
    </div>
  );
};

export default ApplicantsPage;
