"use client";
import React, { useState, useMemo } from "react";
import { Star } from "lucide-react";
import Image from "next/image";
import ApplicantFilters, { FilterState } from "./ApplicantFilters";
import { Progress, ConfigProvider } from "antd";
import { Applicant } from "./ApplicantDetails";

interface ApplicantsListProps {
  applicants: Applicant[];
  selectedId: number;
  onSelect: (applicant: Applicant) => void;
}

const ApplicantsList = ({
  applicants,
  selectedId,
  onSelect,
}: ApplicantsListProps) => {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    status: "All",
    course: "All",
    matchRange: [0, 100],
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Selected":
        return "bg-green-50 text-green-700 border-green-100";
      case "Rejected":
        return "bg-red-50 text-red-700 border-red-100";
      case "Hold":
        return "bg-orange-50 text-orange-700 border-orange-100";
      default:
        return "bg-gray-50 text-gray-700 border-gray-100";
    }
  };

  const filteredApplicants = useMemo(() => {
    return applicants.filter((app) => {
      const matchesSearch =
        app.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        app.email.toLowerCase().includes(filters.search.toLowerCase());
      const matchesStatus =
        filters.status === "All" || app.status === filters.status;
      const matchesCourse =
        filters.course === "All" ||
        (filters.course === "UI/UX" && app.role.includes("Designer")) ||
        (filters.course === "Development" &&
          (app.role.includes("Developer") || app.role.includes("Engineer")));
      const matchesRange =
        app.match >= filters.matchRange[0] &&
        app.match <= filters.matchRange[1];
      return matchesSearch && matchesStatus && matchesCourse && matchesRange;
    });
  }, [applicants, filters]);

  return (
    <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col h-163">
      <div className="shrink-0">
        <ApplicantFilters filters={filters} setFilters={setFilters} />
      </div>

      <div className="grid grid-cols-12 gap-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider pb-3 px-4 border-b border-gray-50 mb-2 shrink-0">
        <div className="col-span-3 text-left">Candidate</div>
        <div className="col-span-3 text-left">Email</div>
        <div className="col-span-2 text-left">Skills</div>
        <div className="col-span-2 text-left">Location</div>
        <div className="col-span-1 text-center">CADD Score</div>
        <div className="col-span-1 text-center">Match</div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-1 custom-scrollbar h-50">
        {filteredApplicants.length > 0 ? (
          filteredApplicants.map((applicant) => {
            const isSelected = selectedId === applicant.id;
            return (
              <div
                key={applicant.id}
                onClick={() => onSelect(applicant)}
                className={`group grid grid-cols-12 gap-4 items-center px-4 py-3 rounded-lg cursor-pointer transition-all border-l-[3px] ${
                  isSelected
                    ? "bg-orange-50/50 border-l-orange-500 border-t border-r border-b border-t-orange-100 border-r-orange-100 border-b-orange-100 shadow-sm"
                    : "bg-white border-l-transparent border-t border-r border-b border-transparent hover:bg-gray-50"
                }`}
              >
                <div className="col-span-3 flex items-center gap-3 overflow-hidden">
                  <div className="relative w-10 h-10 shrink-0">
                    <Image
                      src={applicant.avatar}
                      alt={applicant.name}
                      fill
                      sizes="40px"
                      priority
                      className={`rounded-full object-cover border-2 ${
                        isSelected ? "border-orange-200" : "border-gray-100"
                      }`}
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span
                      className={`text-sm font-bold truncate leading-tight ${
                        isSelected ? "text-gray-900" : "text-gray-700"
                      }`}
                    >
                      {applicant.name}
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wide border ${getStatusColor(
                          applicant.status
                        )}`}
                      >
                        {applicant.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="col-span-3 text-sm text-gray-500 font-medium truncate"
                  title={applicant.email}
                >
                  {applicant.email}
                </div>
                <div className="col-span-2 flex flex-wrap gap-1.5 items-center">
                  {applicant.skills.slice(0, 2).map((skill, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-md border border-gray-100 whitespace-nowrap"
                    >
                      {skill}
                    </span>
                  ))}
                  {applicant.skills.length > 2 && (
                    <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-1.5 py-1 rounded-md border border-gray-100">
                      +{applicant.skills.length - 2}
                    </span>
                  )}
                </div>
                <div className="col-span-2 flex flex-col justify-center">
                  <span className="text-[14px] font-semibold text-gray-600 leading-tight">
                    {applicant.location.split(",")[0]}
                  </span>
                  <span className="text-[11px] text-gray-400 mt-0.5">
                    {applicant.location.split(",")[1]}
                  </span>
                </div>
                <div className="col-span-1 flex items-center justify-center gap-1">
                  <Star size={14} className="text-orange-500 fill-orange-500" />
                  <span className="text-sm font-bold text-gray-700">
                    {applicant.score}
                  </span>
                </div>
                <div className="col-span-1 flex items-center justify-center">
                  <div className="relative w-10 h-10 flex items-center justify-center">
                    <ConfigProvider
                      theme={{
                        components: { Progress: { defaultColor: "#f3f4f6" } },
                      }}
                    >
                      <Progress
                        type="circle"
                        percent={applicant.match}
                        size={40}
                        strokeWidth={8}
                        strokeColor={
                          applicant.match >= 80 ? "#22c55e" : "#f97316"
                        }
                        railColor="#f3f4f6"
                        showInfo={false}
                      />
                    </ConfigProvider>
                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[12px] font-bold text-gray-700">
                      {applicant.match}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center h-40 text-gray-400">
            <p className="text-sm">
              No applicants found matching your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicantsList;
