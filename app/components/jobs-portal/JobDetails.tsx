import React from "react";
import {
  ArrowLeft,
  MapPin,
  Briefcase,
  Users,
  Check,
  Building2,
  ExternalLink,
  Trophy,
  CheckCircle2,
  AlertCircle,
  Monitor,

} from "lucide-react";

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
    bio?: string;
  };
  skills: {
    required: string[];
    userHas: string[];
    missing: string[];
  };
  matchPercentage?: number;
  recommendedCourse?: {
    name: string;
    action: string;
  };
  responsibilities?: string[];
  // Removed perks & hiringProcess from interface usage
}

interface JobDetailsProps {
  job: JobData;
  onBack: () => void;
  similarJobs: JobData[];
}

const JobDetails: React.FC<JobDetailsProps> = ({
  job,
  onBack,
  similarJobs,
}) => {
  // --- CALCULATION LOGIC ---
  const totalRequired = job.skills.required.length;

  const matchedSkills = job.skills.userHas.filter((skill) =>
    job.skills.required.includes(skill)
  );

  const matchedCount = matchedSkills.length;

  const calculatedPercentage =
    totalRequired > 0 ? Math.round((matchedCount / totalRequired) * 100) : 0;

  // Check Eligibility
  const isEligible = calculatedPercentage === 100;

  const responsibilities = job.responsibilities || [
    "Develop and maintain scalable web applications using React.js and Node.js.",
    "Collaborate with cross-functional teams to define, design, and ship new features.",
    "Optimize applications for maximum speed and scalability.",
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 font-sans">
      <div className="flex-1 min-w-0">
        <button
          onClick={onBack}
          className="group flex items-center gap-2 text-gray-400 hover:text-orange-600 transition-colors mb-6 text-sm font-medium"
        >
          <div className="p-1 rounded-full group-hover:bg-orange-50 transition-colors">
            <ArrowLeft size={18} />
          </div>
          Back to Jobs
        </button>

        <div className="bg-white p-8 rounded-3xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div className="flex gap-5">
              <div className="w-16 h-16 bg-linear-to-br from-orange-50 to-amber-50 text-orange-600 rounded-2xl flex items-center justify-center font-bold text-2xl shadow-inner border border-orange-100 shrink-0">
                {job.company.charAt(0)}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
                  {job.title}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 font-medium">
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-50 border border-gray-100">
                    <Building2 size={14} className="text-gray-400" />{" "}
                    {job.company}
                  </span>
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-50 border border-gray-100">
                    <MapPin size={14} className="text-gray-400" />{" "}
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-orange-50 text-orange-700 border border-orange-100">
                    <Briefcase size={14} /> {job.salary}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2 w-full md:w-auto">
              <button
                disabled={!isEligible}
                className={`w-full md:w-auto px-8 py-3 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2
                  ${
                    isEligible
                      ? "bg-orange-600 hover:bg-orange-700 text-white shadow-orange-200 active:scale-95 cursor-pointer"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                  }`}
              >
                {isEligible ? "Apply Now" : "Complete Skills to Apply"}{" "}
                <ExternalLink size={16} />
              </button>
              <p className="text-xs text-gray-400 font-medium">
                Posted {job.postedAgo} • {job.applicants} Applicants
              </p>
            </div>
          </div>

          <div className="h-px bg-gray-100 my-8"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-8">
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                  Required Skills ({totalRequired})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {job.skills.required.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold bg-orange-50 text-orange-800 border border-orange-100"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-green-600" />
                  Your Skills ({matchedCount})
                </h3>
                {job.skills.userHas.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {job.skills.userHas.map((skill) => (
                      <span
                        key={skill}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 border ${
                          job.skills.required.includes(skill)
                            ? "bg-green-50 text-green-700 border-green-100"
                            : "bg-gray-50 text-gray-500 border-gray-100"
                        }`}
                      >
                        <Check size={12} strokeWidth={4} /> {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-gray-400 italic flex items-center gap-1.5 bg-gray-50 p-2 rounded-lg border border-dashed border-gray-200">
                    <AlertCircle size={14} /> No matching skills yet.
                  </div>
                )}
              </div>
            </div>

            <div className="bg-orange-50/50 rounded-2xl p-6 border border-orange-100 flex flex-col justify-center h-full">
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-bold text-gray-700">
                  Skill Compatibility
                </span>
                <span
                  className={`text-3xl font-bold ${
                    isEligible ? "text-green-600" : "text-orange-600"
                  }`}
                >
                  {calculatedPercentage}%
                </span>
              </div>

              <div className="w-full bg-white rounded-full h-3 mb-4 overflow-hidden border border-orange-100">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${
                    isEligible
                      ? "bg-green-500"
                      : "bg-linear-to-r from-orange-400 to-orange-600"
                  }`}
                  style={{ width: `${calculatedPercentage}%` }}
                ></div>
              </div>

              <p className="text-xs text-gray-500 leading-relaxed mb-4">
                You have{" "}
                <span className="font-bold text-orange-700">
                  {matchedCount}
                </span>{" "}
                out of{" "}
                <span className="font-bold text-gray-700">{totalRequired}</span>{" "}
                required skills.
              </p>

              {!isEligible && job.skills.missing.length > 0 && (
                <div className="bg-white p-3 rounded-xl border border-orange-100 shadow-sm">
                  <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">
                    Recommendation
                  </p>
                  <p className="text-xs font-medium text-gray-800">
                    Learn{" "}
                    <span className="text-orange-600 underline decoration-orange-300 underline-offset-2">
                      {job.skills.missing[0]}
                    </span>{" "}
                    to improve your match score.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            {
              label: "Experience",
              value: job.experience,
              icon: <Briefcase size={18} className="text-orange-400" />,
            },
            {
              label: "Work Mode",
              value: job.interviewMode,
              icon: <Monitor size={18} className="text-orange-400" />,
            },
            {
              label: "Vacancies",
              value: job.vacancies,
              icon: <Users size={18} className="text-orange-400" />,
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-center hover:border-orange-100 transition-colors"
            >
              <div className="flex items-center gap-3 mb-2">
                {item.icon}
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                  {item.label}
                </span>
              </div>
              <span className="text-lg font-bold text-gray-900 ml-8">
                {item.value}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 space-y-10">
          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Job Overview
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              {job.description}
            </p>
          </section>

          <div className="h-px bg-gray-50"></div>

          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Trophy size={18} className="text-orange-500" /> Key
              Responsibilities
            </h3>
            <ul className="grid grid-cols-1 gap-3">
              {responsibilities.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-sm text-gray-600"
                >
                  <Check className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="h-px bg-gray-50"></div>

          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              About {job.company}
            </h3>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                {job.aboutCompany.bio ||
                  `${job.company} is a leading technology company focused on innovation and scalable solutions. We are looking for passionate individuals to join our growing team.`}
              </p>
              <p className="text-sm text-gray-800 font-medium flex gap-2 items-start">
                <MapPin className="shrink-0 text-orange-500 mt-0.5" size={16} />
                <span>{job.aboutCompany.address}</span>
              </p>
            </div>
          </section>
        </div>
      </div>

      <div className="w-full lg:w-80 shrink-0">
        <div className="sticky top-20 space-y-6">
          <div>
            <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide mb-4 px-1">
              Similar Jobs
            </h3>
            <div className="flex flex-col gap-3">
              {similarJobs.map((simJob) => (
                <div
                  key={simJob.id}
                  className="bg-white p-4 rounded-2xl border border-gray-100 hover:border-orange-200 transition-all cursor-pointer"
                >
                  <div className="flex justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">
                        {simJob.title}
                      </h4>
                      <p className="text-xs text-gray-400">{simJob.company}</p>
                    </div>
                    <div className="text-[10px] font-bold px-2 py-1 rounded-md bg-orange-100 text-orange-700 h-fit">
                      {simJob.matchPercentage}%
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                      <Briefcase size={10} /> {simJob.experience}
                    </span>
                    <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                      <MapPin size={10} /> {simJob.location.split(",")[0]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
