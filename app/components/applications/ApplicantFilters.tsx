"use client";
import React from "react";
import { Search, ChevronDown } from "lucide-react";
import { Slider, ConfigProvider } from "antd";

export interface FilterState {
  search: string;
  status: string;
  course: string;
  matchRange: [number, number];
}

interface ApplicantFiltersProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

const ApplicantFilters = ({ filters, setFilters }: ApplicantFiltersProps) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, search: e.target.value });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, status: e.target.value });
  };

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, course: e.target.value });
  };

  const handleSliderChange = (value: number[]) => {
    setFilters({ ...filters, matchRange: [value[0], value[1]] });
  };

  return (
    <div className="flex flex-wrap items-center gap-4 mb-6 border-b border-gray-100 pb-6">
      <div className="flex-2 min-w-60">
        <div className="relative group">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors"
            size={16}
          />
          <input
            type="text"
            placeholder="Search applicants..."
            value={filters.search}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-400 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all text-sm"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <div className="relative min-w-[140px]">
          <select
            value={filters.status}
            onChange={handleStatusChange}
            className="w-full pl-3 pr-8 py-2.5 rounded-lg border border-gray-400 bg-white text-sm text-gray-600 appearance-none focus:outline-none focus:border-orange-500 cursor-pointer hover:border-gray-500 transition-colors"
          >
            <option value="All">All Statuses</option>
            <option value="Selected">Selected</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            size={14}
          />
        </div>

        <div className="relative min-w-[140px]">
          <select
            value={filters.course}
            onChange={handleCourseChange}
            className="w-full pl-3 pr-8 py-2.5 rounded-lg border border-gray-400 bg-white text-sm text-gray-600 appearance-none focus:outline-none focus:border-orange-500 cursor-pointer hover:border-gray-500 transition-colors"
          >
            <option value="All">All Courses</option>
            <option value="UI/UX">UI/UX Design</option>
            <option value="Development">Full Stack / Dev</option>
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            size={14}
          />
        </div>
      </div>

      <div className="flex-1 min-w-[200px] ml-auto">
        <div className="flex justify-between mb-1">
          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
            Skill Match
          </span>
          <span className="text-xs font-medium text-orange-600">
            {filters.matchRange[0]}% - {filters.matchRange[1]}%
          </span>
        </div>
        <div className="px-1">
          <ConfigProvider
            theme={{
              token: { colorPrimary: "#f97316" },
              components: {
                Slider: {
                  handleSize: 12,
                  handleSizeHover: 11,
                  railBg: "#f3f4f6",
                  trackBg: "#f97316",
                },
              },
            }}
          >
            <Slider
              range
              value={filters.matchRange}
              min={0}
              max={100}
              onChange={(val) => handleSliderChange(val as number[])}
            />
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
};

export default ApplicantFilters;
