"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Clock,
  Users,
  ArrowRight,
  Building2,
  CheckCircle,
  Ban,
  AlertTriangle,
} from "lucide-react";

export interface JobCardProps {
  id: number;
  title: string;
  location: string;
  type: string;
  status: "Published" | "Closed" | "On Hold";
  applicantCount?: number;
  customFooterText?: string;
  customActionText?: string;
  onStatusChange: (newStatus: "Published" | "Closed" | "On Hold") => void;
}

const JobCard = ({
  title,
  location,
  type,
  status,
  applicantCount,
  customFooterText,
  customActionText,
  onStatusChange,
}: JobCardProps) => {
  
  // --- STATE FOR POPUPS ---
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  // Logic helpers
  const isPublished = status === "Published";
  const isClosed = status === "Closed";

  // Handlers
  const handleBanClick = () => setShowConfirmDialog(true);
  
  const handleConfirmAction = () => {
    setShowConfirmDialog(false);
    setShowSuccessDialog(true);
  };

  const handleSuccessOk = () => {
    setShowSuccessDialog(false);
    onStatusChange("Closed");
  };

  const finalActionText = customActionText || (isPublished ? "View Applicants" : "Completed");
  const isCompleteAction = finalActionText === "Completed" || isClosed;

  return (
    <>
      {/* --- JOB CARD --- */}
      <div className="group bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:shadow-orange-500/5 hover:-translate-y-1 hover:border-orange-100 transition-all duration-300 flex flex-col h-full relative">
        
        {/* HEADER */}
        <div className="flex justify-between items-start mb-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold shadow-sm transition-colors duration-300 ${isPublished ? "bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white" : "bg-gray-50 text-gray-400 group-hover:bg-gray-100"}`}>
            <Building2 size={20} />
          </div>

          <div className="flex items-center gap-2">
            <div className={`px-3 py-1 rounded-full text-[10px] font-bold border tracking-wide uppercase transition-colors ${isPublished ? "bg-green-50 text-green-700 border-green-100" : isClosed ? "bg-red-50 text-red-700 border-red-100" : "bg-gray-50 text-gray-500 border-gray-200"}`}>
              {status}
            </div>
            {isPublished && (
              <button
                onClick={handleBanClick}
                title="Close Job"
                className="p-1.5 rounded-full bg-red-50 text-red-500 border border-red-100 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300 shadow-sm"
              >
                <Ban size={14} />
              </button>
            )}
          </div>
        </div>

        {/* DETAILS */}
        <div className="mb-4">
          <h3 className={`text-lg font-bold text-gray-900 leading-tight mb-2 transition-colors ${isPublished ? "group-hover:text-orange-600" : ""}`}>{title}</h3>
          <div className="flex flex-wrap gap-2 text-xs text-gray-500">
            <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md border border-gray-100"><MapPin size={12} className="text-gray-400" /><span>{location}</span></div>
            <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md border border-gray-100"><Clock size={12} className="text-gray-400" /><span>{type}</span></div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
          <div className="flex items-center gap-2 text-gray-500">
            {customFooterText ? <span className="text-xs font-medium text-gray-400 italic">{customFooterText}</span> : <><Users size={14} className={applicantCount ? "text-orange-500" : "text-gray-300"} /><span className="text-md font-medium"><span className="text-gray-900 font-bold">{applicantCount || 0}</span> Applicants</span></>}
          </div>
          <Link href={isPublished ? "/applicants" : "#"}>
            {isCompleteAction ? (
              <button disabled className="flex items-center gap-1 text-xs font-bold text-gray-400 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg cursor-not-allowed transition-all">{finalActionText}<CheckCircle size={12} /></button>
            ) : (
              <button className="flex items-center gap-1 text-xs font-bold text-orange-600 bg-orange-50 hover:bg-orange-600 hover:text-white px-3 py-1.5 rounded-lg transition-all duration-300 cursor-pointer">{finalActionText}<ArrowRight size={12} /></button>
            )}
          </Link>
        </div>
      </div>

      {/* ================= MODALS ================= */}

      {/* 1. CONFIRMATION DIALOG */}
      {showConfirmDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden transform transition-all scale-100 border border-gray-100">
            <div className="p-8 flex flex-col items-center text-center">
              
              {/* Icon Bubble */}
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6 animate-bounce-slow border border-red-100">
                <AlertTriangle size={32} className="text-red-500" />
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-3">Close this Job?</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                This action is irreversible. You won&apos;t be able to receive new applicants for <strong>&quot;{title}&quot;</strong>.
              </p>

              <div className="flex gap-3 w-full">
                <button 
                  onClick={() => setShowConfirmDialog(false)}
                  className="flex-1 py-3 px-4 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleConfirmAction}
                  className="flex-1 py-3 px-4 bg-red-600 text-white rounded-xl font-semibold text-sm hover:bg-red-700 shadow-lg shadow-red-200 transition-all hover:scale-[1.02]"
                >
                  Yes, Close it
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. SUCCESS DIALOG */}
      {showSuccessDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden transform transition-all scale-100 border border-gray-100">
            <div className="p-8 flex flex-col items-center text-center relative">
              
              {/* Success Check */}
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 border border-green-100">
                <CheckCircle size={40} className="text-green-500" />
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-2">Job Closed Successfully!</h2>
              <p className="text-gray-400 text-xs mb-6">The status has been updated.</p>

              {/* Summary Card inside Modal */}
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 w-full mb-8 text-left">
                <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1">Job Summary</p>
                <h4 className="font-bold text-gray-800 text-sm truncate mb-2">{title}</h4>
                <div className="flex flex-wrap gap-2">
                   <span className="text-[10px] font-medium bg-white border border-gray-200 px-2 py-1 rounded-md text-gray-600">{location}</span>
                   <span className="text-[10px] font-medium bg-white border border-gray-200 px-2 py-1 rounded-md text-gray-600">{type}</span>
                </div>
              </div>

              <button 
                onClick={handleSuccessOk}
                className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-black transition-all shadow-lg hover:scale-[1.02]"
              >
                Okay, Got it
              </button>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JobCard;