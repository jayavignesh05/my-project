"use client";
import React, { useState } from "react";
import { RefreshCcw, Building2, Home, Laptop, Check } from "lucide-react";
import { Slider, ConfigProvider } from "antd";

const Filters = () => {
  // --- State to manage selections ---
  const [salaryRange, setSalaryRange] = useState<[number, number]>([0, 1500000]);
  const [selectedWorkMode, setSelectedWorkMode] = useState<string>("Onsite");
  const [selectedExp, setSelectedExp] = useState<string>("Fresher");
  
  // For checkboxes, we track arrays of selected values
  const [jobTypes, setJobTypes] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>(["Chennai"]);

  // --- Helpers ---
  const formatSalary = (val: number) => {
    if (val === 0) return "0";
    if (val >= 100000) return `${val / 100000}L`;
    return `${val / 1000}k`;
  };

  const toggleSelection = (
  list: string[], 
  setList: React.Dispatch<React.SetStateAction<string[]>>, 
  item: string
) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 w-full max-w-xs">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg text-gray-800">Filters</h3>
        <button 
          onClick={() => {
            setSalaryRange([0, 1500000]);
            setSelectedWorkMode("");
            setSelectedExp("");
            setJobTypes([]);
            setLocations([]);
          }}
          className="text-orange-500 text-xs font-semibold flex items-center gap-1 hover:text-orange-600"
        >
          <RefreshCcw size={12} /> Clear all
        </button>
      </div>

      {/* 1. Salary Range (Using Ant Design Slider) */}
      <div className="mb-8 p-4 bg-white border border-gray-100 rounded-2xl">
        <div className="flex justify-between items-center mb-4">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Salary Range</span>
        </div>
        
        <div className="text-center mb-4">
            <span className="text-lg font-bold text-gray-900">
                ₹{formatSalary(salaryRange[0])} - ₹{formatSalary(salaryRange[1])}
            </span>
        </div>

        {/* ConfigProvider allows us to change the slider color to Orange */}
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#f97316", // Tailwind orange-500
            },
          }}
        >
          <Slider
            range
            min={0}
            max={1500000}
            step={10000}
            value={salaryRange}
            onChange={(val) => setSalaryRange(val as [number, number])}
            tooltip={{ formatter: null }} // Hides default tooltip
          />
        </ConfigProvider>
        
        <div className="flex justify-between text-[10px] text-gray-400 font-medium mt-1">
          <span>0</span>
          <span>5L</span>
          <span>10L</span>
          <span>15L+</span>
        </div>
      </div>

      {/* 2. Work Mode */}
      <div className="mb-6">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 block">Work Mode</label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Onsite", icon: <Building2 size={16} /> },
            { label: "Remote", icon: <Home size={16} /> },
            { label: "Hybrid", icon: <Laptop size={16} /> },
          ].map((mode) => {
            const isActive = selectedWorkMode === mode.label;
            return (
              <button
                key={mode.label}
                onClick={() => setSelectedWorkMode(mode.label)}
                className={`flex flex-col items-center justify-center gap-2 py-3 rounded-xl border transition-all ${
                  isActive
                    ? "border-orange-500 bg-orange-50 text-orange-700 shadow-sm"
                    : "border-gray-100 bg-white text-gray-500 hover:border-gray-200"
                }`}
              >
                {mode.icon}
                <span className="text-[11px] font-bold">{mode.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Experience Level */}
      <div className="mb-6">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 block">Experience Level</label>
        <div className="grid grid-cols-2 gap-2">
          {["Fresher", "1-3 Yrs", "3-5 Yrs", "5+ Yrs"].map((exp) => {
            const isActive = selectedExp === exp;
            return (
              <button
                key={exp}
                onClick={() => setSelectedExp(exp)}
                className={`py-2.5 text-xs font-bold rounded-lg border transition-all ${
                  isActive
                    ? "border-orange-500 bg-white text-gray-900 shadow-sm"
                    : "border-gray-100 bg-white text-gray-500 hover:border-gray-200"
                }`}
              >
                {exp}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Job Type */}
      <div className="mb-6">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 block">Job Type</label>
        <div className="space-y-3">
          {["Full Time", "Part Time", "Internship", "Contract", "Freelance"].map((type) => (
            <label key={type} className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                  jobTypes.includes(type) ? "bg-orange-500 border-orange-500" : "border-gray-200 bg-white group-hover:border-orange-300"
              }`}>
                  {jobTypes.includes(type) && <Check size={12} className="text-white" strokeWidth={4} />}
              </div>
              <input 
                type="checkbox" 
                className="hidden" 
                onChange={() => toggleSelection(jobTypes, setJobTypes, type)}
              />
              <span className={`text-sm ${jobTypes.includes(type) ? "text-gray-900 font-medium" : "text-gray-500"}`}>
                {type}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* 5. Location */}
      <div className="mb-2">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 block">Location</label>
        <div className="space-y-3">
          {["Chennai", "Bangalore", "Hyderabad", "Mumbai", "Delhi"].map((loc) => (
            <label key={loc} className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                  locations.includes(loc) ? "bg-orange-500 border-orange-500" : "border-gray-200 bg-white group-hover:border-orange-300"
              }`}>
                  {locations.includes(loc) && <Check size={12} className="text-white" strokeWidth={4} />}
              </div>
              <input 
                type="checkbox" 
                className="hidden" 
                onChange={() => toggleSelection(locations, setLocations, loc)}
              />
              <span className={`text-sm ${locations.includes(loc) ? "text-gray-900 font-medium" : "text-gray-500"}`}>
                {loc}
              </span>
            </label>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Filters;