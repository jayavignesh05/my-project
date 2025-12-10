"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  FaPhone,
  FaAddressBook,
  FaEnvelope,
  FaLinkedin,
  FaCheck,
  FaTimes,
  FaChartPie,
  FaBriefcase,
  FaGraduationCap,
  FaPen,
  FaUserTie,
} from "react-icons/fa";
import { MdStars } from "react-icons/md";
import { FaBookOpenReader } from "react-icons/fa6";

// --- INTERFACES ---
export interface TimelineItem {
  id?: number;
  title?: string;
  designation?: string;
  institution?: string;
  company?: string;
  college?: string;
  date?: string;
  years?: string;
  description?: string;
  degree?: string;
}

export interface Applicant {
  id: number;
  name: string;
  role: string;
  designation?: string;
  email: string;
  phone: string;
  linkedin: string;
  avatar: string;
  photo?: string;
  score: number;
  match: number;
  location: string;
  status: string;
  skills: string[];
  userSkills?: string[];
  requiredSkills: string[];
  education: TimelineItem[];
  experience: TimelineItem[];
}

type Props = {
  applicant: Applicant;
};

export default function ApplicantDetails({ applicant }: Props) {
  // --- 1. HOOKS FIRST (Always at the top) ---
  const [status, setStatus] = useState<string>("");
  const [showDialog, setShowDialog] = useState(false);
  const [pendingStatus, setPendingStatus] = useState("");

  // --- 2. EARLY RETURN AFTER HOOKS ---
  // If no applicant, we stop here. But hooks have already "registered".
  if (!applicant) return null;

  // --- 3. DATA MAPPING (Safe to do now) ---
  const {
    name,
    role,
    designation = role,
    avatar,
    photo = avatar,
    phone,
    email,
    linkedin,
    requiredSkills,
    skills,
    userSkills = skills || [],
    score,
    experience = [],
    education = [],
    match,
  } = applicant;

  // --- 4. OPTIONS CONFIGURATION ---
  const initialOptions = [
    {
      key: "Selected",
      label: "Selected",
      icon: <FaCheck className="text-green-600" />,
      activeClass: "bg-green-50 border-green-400 text-green-700",
    },
    {
      key: "Rejected",
      label: "Rejected",
      icon: <FaTimes className="text-red-600" />,
      activeClass: "bg-red-50 border-red-400 text-red-700",
    },
  ];

  const allStatusOptions = [
    {
      key: "Selected",
      label: "Selected",
      icon: <FaCheck className="text-green-600" />,
      class: "bg-green-50 border-green-400 text-green-700",
    },
    {
      key: "Rejected",
      label: "Rejected",
      icon: <FaTimes className="text-red-600" />,
      class: "bg-red-50 border-red-400 text-red-700",
    },
  ];

  const selectedStatus = allStatusOptions.find((s) => s.key === status);

  return (
    <div className=" w-[100%] bg-white  rounded-2xl shadow-sm border border-gray-200 p-6 overflow-y-auto sticky top-6 scrollbar-hide">
      {/* PROFILE IMAGE */}
      <div className="flex flex-col items-center">
        <div className="relative flex flex-col items-center">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-100 via-orange-200 to-orange-400 shadow-xl flex items-center justify-center -mt-2">
            <Image
              src={photo}
              alt={name}
              width={112}
              height={112}
              className="w-28 h-28 rounded-full object-cover shadow-md"
            />
          </div>

          <div className="absolute left-1/2 -bottom-6 -translate-x-1/2 z-20 bg-gradient-to-br from-orange-50 to-orange-200 border border-orange-300 px-3 py-2 rounded-full shadow-lg flex items-center gap-1 whitespace-nowrap">
            <MdStars className="text-orange-500 text-lg" />
            <span className="text-sm font-semibold text-orange-700">
              CADD Score: {score}%
            </span>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 text-center">
          {name}
        </h2>
        <p className="text-gray-500 text-sm text-center">{designation}</p>

        {/* STATUS ACTIONS */}
        <div className="mt-4 w-full flex justify-center">
          {!status && (
            <div className="flex justify-center gap-2">
              {initialOptions.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => {
                    setPendingStatus(opt.key);
                    setShowDialog(true);
                  }}
                  className="flex text-gray-800 flex-col items-center justify-center gap-1 w-20 py-2 rounded-xl border text-xs font-medium bg-white hover:bg-gray-50 border-gray-300 cursor-pointer shadow-sm transition-all hover:-translate-y-0.5"
                >
                  <div className="text-base">{opt.icon}</div>
                  {opt.label}
                </button>
              ))}
            </div>
          )}

          {status && (
            <div className="flex justify-center items-center gap-3 mt-2">
              <span
                className={`px-4 py-2 rounded-xl border text-sm font-medium shadow-sm capitalize flex items-center gap-2 ${selectedStatus?.class}`}
              >
                {selectedStatus?.icon}
                {selectedStatus?.label}
              </span>
              <button
                onClick={() => {
                  setPendingStatus("edit");
                  setShowDialog(true);
                }}
                className="p-2 rounded-lg border bg-white hover:bg-gray-50 text-orange-600 hover:border-orange-200 transition-colors"
              >
                <FaPen size={14} />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="my-6 border-b border-gray-100"></div>

      {/* CONTACT INFO */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <FaAddressBook className="text-orange-500" /> Contact Information
        </h3>
        <div className="mt-4 flex flex-col gap-3">
          <a
            href={`tel:${phone}`}
            className="flex items-center gap-3 p-1 rounded-xl transition cursor-point"
          >
            <FaPhone className="text-gray-400 text-sm" />
            <p className="text-gray-600 text-sm">{phone}</p>
          </a>
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-3 p-1 rounded-xl transition cursor-point"
          >
            <FaEnvelope className="text-gray-400 text-sm" />
            <p className="text-gray-600 text-sm break-all hover:text-orange-500 hover:underline">{email}</p>
          </a>
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-1 rounded-xl transition cursor-point"
          >
            <FaLinkedin className="text-gray-400 text-sm" />
            <p className="text-gray-600 text-sm break-all hover:underline hover:text-orange-500">
              {linkedin}
            </p>
          </a>
        </div>
      </div>

      <div className="my-6 border-b border-gray-100"></div>

      {/* SKILL SECTION */}
      <div className="mt-6">
        <div className="flex items-center gap-2 mb-4">
          <FaChartPie className="text-orange-500 text-lg" />
          <h3 className="text-lg font-semibold text-gray-800">
            Skill Compatibility
          </h3>
        </div>

        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
          Required Skills
        </h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {requiredSkills.map((skill) => {
            const matched = userSkills.includes(skill);
            return (
              <div
                key={skill}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium ${
                  matched
                    ? "bg-purple-50 border-purple-200 text-purple-700"
                    : "bg-gray-50 border-gray-200 text-gray-500"
                }`}
              >
                {skill}
                {matched && <FaCheck className="text-purple-600 text-[10px]" />}
              </div>
            );
          })}
        </div>

        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
          User Skills
        </h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {userSkills.map((skill) => {
            const matched = requiredSkills.includes(skill);

            return (
            <div
              key={skill}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium ${
                  matched
                    ? "bg-purple-50 border-purple-200 text-purple-700"
                    : "bg-gray-50 border-gray-200 text-gray-500"
                }`}
              >
                {skill}
                {matched && <FaCheck className="text-purple-600 text-[10px]" />}
              </div>
             );
          })}
        </div>

        {/* Skill Match Bar */}
        <div className="mt-4 bg-gray-50 p-3 rounded-xl border border-gray-100">
          <div className="flex justify-between items-center mb-1">
            <p className="text-xs font-bold text-gray-600">Match Score</p>
            <p className="text-sm font-bold text-gray-900">{match}%</p>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-orange-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${match}%` }}
            ></div>
          </div>
        </div>

        <p className="text-gray-700 text-xs mt-2">
          Candidate has{" "}
          <span className="font-bold">
            {requiredSkills.filter((s) => userSkills.includes(s)).length}
          </span>{" "}
          out of <span className="font-bold">{requiredSkills.length}</span>{" "}
          required skills.
        </p>
      </div>

      <div className="my-6 border-b border-gray-100"></div>

      {/* EDUCATION LIST */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <FaGraduationCap className="text-orange-500" /> Education
        </h3>
        <div className="mt-4 border-l-2 border-orange-200 pl-6 space-y-6">
          {education.map((edu, index) => (
            <div key={index} className="relative">
              <div className="absolute -left-6 top-1 flex items-center gap-1">
                <span className="h-[2px] w-1 bg-orange-300"></span>
                <FaBookOpenReader className="text-orange-500 text-xs" />
              </div>{" "}
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-bold text-gray-900 text-sm leading-tight w-2/3">
                  {edu.degree || edu.title}
                </h4>
                <span className="text-[10px] font-bold text-orange-700 bg-orange-100 border border-orange-200 px-2 py-0.5 rounded-full whitespace-nowrap">
                  {edu.years || edu.date}
                </span>
              </div>
              <p className="text-gray-500 text-xs font-medium">
                {edu.college || edu.institution}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="my-6 border-b border-gray-100"></div>

      {/* EXPERIENCE LIST */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <FaBriefcase className="text-orange-500" /> Work Experience
        </h3>
        <div className="mt-4 border-l-2 border-orange-200 pl-6 space-y-6">
          {experience.map((exp, index) => (
            <div key={index} className="relative">
              <div className="absolute -left-6 top-1 flex items-center gap-1">
                <span className="h-[2px] w-1 bg-orange-300"></span>
                <FaUserTie className="text-orange-500 text-xs" />
              </div>{" "}
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-bold text-gray-900 text-sm leading-tight w-2/3">
                  {exp.designation || exp.title}
                </h4>
                <span className="text-[10px] font-bold text-orange-700 bg-orange-100 border border-orange-200 px-2 py-0.5 rounded-full whitespace-nowrap">
                  {exp.years || exp.date}
                </span>
              </div>
              <p className="text-gray-700 text-xs font-bold mb-1">
                {exp.company || exp.institution}
              </p>
              <p className="text-gray-500 text-xs leading-relaxed">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CONFIRMATION DIALOG */}
      {showDialog && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[100] backdrop-blur-sm">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-80 border border-gray-100 transform transition-all scale-100">
            <h2 className="text-lg font-bold text-gray-900 mb-2 text-center">
              {pendingStatus === "edit" ? "Edit Status" : "Confirm Action"}
            </h2>

            {pendingStatus !== "edit" &&
              !pendingStatus.startsWith("edit-confirm-") && (
                <>
                  <p className="text-sm text-gray-500 text-center mb-6">
                    Mark this candidate as{" "}
                    <span className="font-bold text-gray-900 capitalize">
                      {pendingStatus}
                    </span>
                    ?
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowDialog(false)}
                      className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        setStatus(pendingStatus);
                        setShowDialog(false);
                      }}
                      className="flex-1 py-2.5 bg-orange-600 text-white rounded-xl text-sm font-semibold hover:bg-orange-700 transition-colors shadow-lg shadow-orange-200"
                    >
                      Confirm
                    </button>
                  </div>
                </>
              )}

            {/* Edit Options */}
            {pendingStatus === "edit" && (
              <div className="flex flex-col gap-2">
                {allStatusOptions
                  .filter((opt) => opt.key !== status)
                  .map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() =>
                        setPendingStatus(`edit-confirm-${opt.key}`)
                      }
                      className={`w-full py-2 rounded-lg border text-sm ${opt.class} flex items-center justify-center gap-2`}
                    >
                      {opt.icon} {opt.label}
                    </button>
                  ))}
                <button
                  onClick={() => setShowDialog(false)}
                  className="w-full py-2 bg-gray-100 rounded-lg text-sm mt-2"
                >
                  Cancel
                </button>
              </div>
            )}

            {/* Edit Confirmation */}
            {pendingStatus.startsWith("edit-confirm-") && (
              <>
                <p className="text-sm text-gray-500 text-center mb-6">
                  Change status to{" "}
                  <span className="font-bold text-gray-900 capitalize">
                    {pendingStatus.replace("edit-confirm-", "")}
                  </span>
                  ?
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setPendingStatus("edit")}
                    className="flex-1 py-2 bg-gray-100 rounded-lg text-sm"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => {
                      setStatus(pendingStatus.replace("edit-confirm-", ""));
                      setShowDialog(false);
                    }}
                    className="flex-1 py-2 bg-orange-600 text-white rounded-lg text-sm"
                  >
                    Confirm
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
