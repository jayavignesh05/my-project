"use client";

import React, {
  useState,
  KeyboardEvent,
  useRef,
  ChangeEvent,
  ForwardedRef,
  useEffect
} from "react";
import { FiCalendar } from "react-icons/fi";
import { FaFileUpload, FaUsers } from "react-icons/fa";
import { FaUpload } from "react-icons/fa";
import { FaFilePen } from "react-icons/fa6";
import {
  FaTimes,
  FaPlus,
  FaCalendarAlt,
  FaBriefcase,
  FaArrowLeft,
} from "react-icons/fa";
import { FaRegFileAlt } from "react-icons/fa";
import { TbInfoOctagonFilled, TbListDetails } from "react-icons/tb";
import { IoMdWarning } from "react-icons/io";
import { LuCircleCheckBig } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import {
  IoSettingsOutline,
  IoShieldCheckmark,
  IoTimerSharp,
} from "react-icons/io5";
import { FaUserTie, FaMapMarkerAlt, FaClipboardList } from "react-icons/fa";
import { PiListStarBold } from "react-icons/pi";
import { BsBriefcaseFill } from "react-icons/bs";
import { MdAttachFile } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import {jobList} from "../components/JobDashboard/JobData";





// ---------------------------------
// Types
// ---------------------------------
interface JobPostFormProps {
  jobId?: string;
}

interface FormDataType {
  role: string;
  location: string;
  description: string;
  type: string;
  experience: string;
  deadline: string;
  internalNotes: string;
  assessmentTitle: string;
  assessmentFile: File | null;
  salaryMin: string;
  salaryMax: string;
  workMode: string;
  vacancy: string;
}

interface ErrorType {
  role?: string;
  location?: string;
  description?: string;
  type?: string;
  experience?: string;
  deadline?: string;
  skills?: string;
  assessmentTitle?: string;
  assessmentFile?: string;
  salary?: string;
  workMode?: string;
  vacancy?: string;
}

// ---------------------------------
// Component Start
// ---------------------------------

export default function JobForm({ jobId }: JobPostFormProps) {
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState<string>("");

  const [errors, setErrors] = useState<ErrorType>({});

  const [formData, setFormData] = useState<FormDataType>({
    role: "",
    location: "",
    description: "",
    type: "",
    experience: "",
    deadline: "",
    internalNotes: "",
    assessmentTitle: "",
    assessmentFile: null,
    salaryMin: "",
    salaryMax: "",
    workMode: "",
    vacancy: "",
  });

  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const router = useRouter();

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const assessmentTitleRef = useRef<HTMLInputElement>(null);
  const assessmentFileRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLSelectElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  const [showDialog, setShowDialog] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Creating job post...");
  const [progress, setProgress] = useState<number>(0);
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [existingFileName, setExistingFileName] = useState<string>("");
  // Confirm dialog for editing job
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);

  // Success snackbar text
  const [successSnackbar, setSuccessSnackbar] = useState<string>("");

  

  // ---------------------------------
  // Handlers
  // ---------------------------------

  const addSkill = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skillInput.trim() !== "") {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };
  
 const handleConfirmAction = async (): Promise<void> => {

   setShowConfirm(false);

   // Start loader dialog
   setShowDialog(true);
   setLoadingMessage(
     isEditMode ? "Updating job post..." : "Creating job post..."
   );
   setProgress(0);

   let val = 0;

   const interval = setInterval(() => {
     val += 20;
     setProgress(val);

     if (val >= 100) {
       clearInterval(interval);

       setTimeout(() => {
         setShowDialog(false);

         if (!isEditMode) resetForm();

         setSuccessSnackbar(
           isEditMode ? "Job updated successfully" : "Job created successfully"
         );

         setTimeout(() => {
           setSuccessSnackbar("");
           router.back();
         }, 1200);
       }, 500);
     }
   }, 400);
 };




  const resetForm = () => {
    setFormData({
      role: "",
      location: "",
      description: "",
      type: "",
      experience: "",
      deadline: "",
      internalNotes: "",
      assessmentTitle: "",
      assessmentFile: null,
      salaryMin: "",
      salaryMax: "",
      workMode: "",
      vacancy: "",
    });

    setSkills([]);
    setSkillInput("");
    setErrors({});
    setProgress(0);
    setExistingFileName("");
  };
  const validateOnly = (): boolean => {
    const newErrors: ErrorType = {};

    if (!formData.role.trim()) newErrors.role = "Job title is required.";
    if (!formData.description.trim())
      newErrors.description = "Description required.";
    if (!formData.type) newErrors.type = "Select employment type.";
    if (!formData.experience) newErrors.experience = "Select experience.";
   if (!formData.deadline) {
     newErrors.deadline = "Choose a deadline.";
   } else {
     const today = new Date().setHours(0, 0, 0, 0);
     const selected = new Date(formData.deadline).setHours(0, 0, 0, 0);

     if (!isEditMode && selected < today) {
       newErrors.deadline = "Deadline cannot be in the past.";
     }
   }


    if (skills.length === 0) newErrors.skills = "Add at least one skill.";
    if (!formData.assessmentTitle.trim())
      newErrors.assessmentTitle = "Assessment title required.";

    if (!formData.assessmentFile && !existingFileName)
      newErrors.assessmentFile = "Upload an assessment file.";

    if (!formData.salaryMin || !formData.salaryMax)
      newErrors.salary = "Salary range is required.";
    else if (Number(formData.salaryMax) < Number(formData.salaryMin))
      newErrors.salary = "Max salary must be greater.";

    if (!formData.location) newErrors.location = "Select location.";
    if (!formData.workMode) newErrors.workMode = "Select work mode.";
    if (!formData.vacancy) newErrors.vacancy = "Vacancy is required.";
    else if (!formData.vacancy || Number(formData.vacancy) < 1)
      newErrors.vacancy = "Vacancy must be at least 1.";


    setErrors(newErrors);

    const firstErrorKey = Object.keys(newErrors)[0];
    if (firstErrorKey) {
      const scrollMap: Record<string, React.RefObject<any>> = {
        role: titleRef,
        location: locationRef,
        description: descriptionRef,
        workMode: settingsRef,
        type: settingsRef,
        experience: settingsRef,
        deadline: settingsRef,
        skills: skillsRef,
        assessmentTitle: assessmentTitleRef,
        assessmentFile: assessmentFileRef,
        salary: settingsRef,
        vacancy: settingsRef,
      };

      scrollMap[firstErrorKey]?.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      // show red error snackbar
      setShowSnackbar(true);
      setTimeout(() => setShowSnackbar(false), 2000);

      return true; // Validation FAILED ❌
    }

    return false; // Validation PASSED ✔
  };


  const handleSubmit = () => {
    const newErrors: ErrorType = {};

    if (!formData.role.trim()) newErrors.role = "Job title is required.";
    if (!formData.description.trim())
      newErrors.description = "Description required.";
    if (!formData.type) newErrors.type = "Select employment type.";
    if (!formData.experience) newErrors.experience = "Select experience.";
    if (!formData.deadline) newErrors.deadline = "Choose a deadline.";
    if (skills.length === 0) newErrors.skills = "Add at least one skill.";
    if (!formData.assessmentTitle.trim())
      newErrors.assessmentTitle = "Assessment title required.";
    if (!formData.assessmentFile && !existingFileName) {
      newErrors.assessmentFile = "Upload an assessment file.";
    }

    if (!formData.salaryMin || !formData.salaryMax) {
      newErrors.salary = "Salary range is required.";
    } else if (Number(formData.salaryMax) < Number(formData.salaryMin)) {
      newErrors.salary = "Max salary must be greater.";
    }

    if (!formData.location) newErrors.location = "Select location.";
    if (!formData.workMode) newErrors.workMode = "Select work mode.";
    if (!formData.vacancy) newErrors.vacancy = "Vacancy is required.";

    setErrors(newErrors);

    const firstErrorKey = Object.keys(newErrors)[0];
    if (firstErrorKey) {
      const scrollMap: Record<string, React.RefObject<any>> = {
        role: titleRef,
        location: locationRef,
        description: descriptionRef,
        workMode: settingsRef,
        type: settingsRef,
        experience: settingsRef,
        deadline: settingsRef,
        skills: skillsRef,
        assessmentTitle: assessmentTitleRef,
        assessmentFile: assessmentFileRef,
        salary: settingsRef,
        vacancy: settingsRef,
      };

      scrollMap[firstErrorKey]?.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      setShowSnackbar(true);
      setTimeout(() => setShowSnackbar(false), 2000);
      return;
    }

    setShowDialog(true);
    setLoadingMessage(
      isEditMode ? "Updating job post..." : "Creating job post..."
    );
    setProgress(0);

    let val = 0;
    const interval = setInterval(() => {
      val += 20;
      setProgress(val);

      if (val >= 100) {
        clearInterval(interval);
        if (!isEditMode) {
          resetForm();
        }
        setTimeout(() => setShowDialog(false), 1500);
      }
    }, 400);
  };

  useEffect(() => {
    if (jobId) {
      setIsEditMode(true);

      const job = jobList[Number(jobId)];
      if (job) {
        setFormData({
          role: job.role,
          location: job.location,
          description: job.description,
          type: job.type,
          experience: job.experience,
          deadline: job.deadline,
          internalNotes: job.internalNotes,
          assessmentTitle: job.assessmentTitle,
          assessmentFile: null,
          salaryMin: String(job.salaryMin),
          salaryMax: String(job.salaryMax),
          workMode: job.workMode,
          vacancy: String(job.vacancy),
        });

        setSkills(job.skills);
        setExistingFileName(job.assessmentFile || "");
      }
    } else {
      setIsEditMode(false);
    }
  }, [jobId]);

  // -----------------------------------
  // JSX
  // -----------------------------------

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-2">
          <FaArrowLeft
            onClick={() => router.back()}
            className="text-gray-700 text-2xl hover:text-gray-500 cursor-pointer transition"
          />

          <h1 className="text-4xl font-bold text-gray-900">
            {isEditMode ? "Edit Job" : "Add Job"}
          </h1>
        </div>

        <p className="text-gray-600 mb-8 ml-10">
          {isEditMode
            ? "Update the details of this job posting."
            : "Enter the details to create a new job posting."}
        </p>

        <div className="bg-white text-gray-800 rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100 space-y-10">
          <SectionTitle icon={<TbListDetails />} title="Job Information" />
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Job Title"
                ref={titleRef}
                icon={<FaUserTie />}
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                error={errors.role}
              />

              <SelectField
                label="Location"
                ref={locationRef}
                icon={<FaMapMarkerAlt />}
                options={[
                  "Chennai",
                  "Bangalore",
                  "Hyderabad",
                  "Mumbai",
                  "Delhi",
                ]}
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                error={errors.location}
              />
            </div>

            <div className="mt-5">
              <Label icon={<FaClipboardList />} text="Job Description" />
              <textarea
                ref={descriptionRef}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className={`w-full h-40 mt-2 p-4 border rounded-xl bg-gray-50 
  ${
    errors.description
      ? "border-red-500 focus:ring-red-400"
      : "border-gray-400 focus:ring-indigo-400"
  }
  transition`}
                placeholder="Write a detailed job description..."
              ></textarea>

              {errors.description && (
                <p className="text-sm text-red-500">{errors.description}</p>
              )}
            </div>
          </div>
          <SectionTitle icon={<IoMdSettings />} title="Job Settings" />
          <div ref={settingsRef}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex flex-col">
                <Label icon={<FaRupeeSign />} text="Salary Range" />

                <div className="mt-2 flex items-center gap-3">
                  <input
                    type="number"
                    placeholder="Min"
                    value={formData.salaryMin}
                    min={1}
                    onWheel={(e) => e.currentTarget.blur()} // prevent scroll change
                    onChange={(e) => {
                      const value = e.target.value;

                      // Prevent negative or zero
                      if (Number(value) < 1) {
                        setFormData({ ...formData, salaryMin: "" });
                        return;
                      }

                      setFormData({ ...formData, salaryMin: value });
                    }}
                    className={`w-1/2 p-3 border rounded-xl bg-gray-50 
    ${
      errors.salary
        ? "border-red-500 focus:ring-red-400"
        : "border-gray-400 focus:ring-indigo-400"
    }
  `}
                  />

                  <span className="text-gray-600 font-medium">to</span>

                  <input
                    type="number"
                    placeholder="Max"
                    value={formData.salaryMax}
                    min={1}
                    onWheel={(e) => e.currentTarget.blur()} // prevent scroll change
                    onChange={(e) => {
                      const value = e.target.value;

                      // Prevent negative or zero
                      if (Number(value) < 1) {
                        setFormData({ ...formData, salaryMax: "" });
                        return;
                      }

                      setFormData({ ...formData, salaryMax: value });
                    }}
                    className={`w-1/2 p-3 border rounded-xl bg-gray-50 
    ${
      errors.salary
        ? "border-red-500 focus:ring-red-400"
        : "border-gray-400 focus:ring-indigo-400"
    }
  `}
                  />

                  <span className="text-gray-700 font-medium whitespace-nowrap">
                    /Year
                  </span>
                </div>

                {errors.salary && (
                  <p className="text-sm text-red-500 mt-1">{errors.salary}</p>
                )}
              </div>

              <SelectField
                label="Work Mode"
                icon={<BsBriefcaseFill />}
                options={["Onsite", "Remote", "Hybrid"]}
                value={formData.workMode}
                onChange={(e) =>
                  setFormData({ ...formData, workMode: e.target.value })
                }
                error={errors.workMode}
              />

              <SelectField
                label="Employment Type"
                icon={<BsBriefcaseFill />}
                options={[
                  "Full time",
                  "Part time",
                  "Contract",
                  "Internship",
                  "Freelance",
                ]}
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                error={errors.type}
              />

              <SelectField
                label="Experience Level"
                icon={<IoTimerSharp />}
                options={["Fresher", "1-3 Yrs", "3-5 Yrs", "5+ Yrs"]}
                value={formData.experience}
                onChange={(e) =>
                  setFormData({ ...formData, experience: e.target.value })
                }
                error={errors.experience}
              />

              <InputField
                label="No. of Vacancies"
                type="number"
                icon={<FaUsers />}
                value={formData.vacancy}
                onChange={(e) => {
                  const value = e.target.value;

                  // Prevent negative and zero
                  if (Number(value) < 1) {
                    setFormData({ ...formData, vacancy: "" });
                    return;
                  }

                  setFormData({ ...formData, vacancy: value });
                }}
                error={errors.vacancy}
              />

              <InputField
                label="Application Deadline"
                icon={<FaCalendarAlt />}
                type="date"
                value={formData.deadline}
                min={
                  isEditMode
                    ? undefined
                    : new Date().toISOString().split("T")[0]
                }
                onChange={(e) =>
                  setFormData({ ...formData, deadline: e.target.value })
                }
                error={errors.deadline}
              />
            </div>
          </div>

          <div className="mt-8" ref={skillsRef}>
            <SectionTitle icon={<PiListStarBold />} title="Required Skills" />

            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={addSkill}
              placeholder="Enter a skill and press enter"
              className={`w-full mb-4 p-3 border border-gray-400 rounded-lg focus:ring-indigo-400 focus:border-indigo-400 transition"
              ${errors.skills ? "border-red-500" : "border-gray-100"}`}
            />

            {skills.length !== 0 && (
              <div className="max-h-40 overflow-y-auto p-3 border border-gray-100 rounded-lg bg-gray-50 shadow-inner">
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full border border-orange-300 text-sm font-medium flex items-center gap-2"
                    >
                      {skill}
                      <button
                        onClick={() => removeSkill(skill)}
                        className="text-orange-600 hover:text-orange-800"
                      >
                        <FaTimes />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {errors.skills && (
              <p className="text-sm text-red-500 mt-1">{errors.skills}</p>
            )}
          </div>

          <div className="mt-10">
            <SectionTitle icon={<MdAttachFile />} title="Assessment" />

            <div className="flex flex-col gap-5">
              <InputField
                label="Assessment Title"
                icon={<FaFilePen />}
                ref={assessmentTitleRef}
                type="text"
                value={formData.assessmentTitle}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    assessmentTitle: e.target.value,
                  })
                }
                error={errors.assessmentTitle}
              />

              <div>
                <Label icon={<FaFileUpload />} text="Upload Assessment File" />

                <input
                  ref={assessmentFileRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.png"
                  id="assessmentUpload"
                  className="hidden"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      assessmentFile: e.target.files?.[0] || null,
                    })
                  }
                />

                <label
                  htmlFor="assessmentUpload"
                  className={`
      mt-3 w-full flex flex-col items-center justify-center 
      border-2 border-dashed rounded-xl cursor-pointer p-8
      transition bg-gray-50 
      ${
        errors.assessmentFile
          ? "border-red-400"
          : "border-gray-300 hover:bg-gray-100"
      }
    `}
                >
                  <div className="text-gray-500 mb-2 text-3xl">
                    <FaUpload />
                  </div>

                  <p className="text-gray-700 font-medium">
                    {formData.assessmentFile
                      ? "Change selected file"
                      : "Choose a file"}
                  </p>

                  <p className="text-gray-400 text-sm">
                    PDF, DOC, JPG, PNG formats, up to 50MB
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("assessmentUpload")?.click()
                    }
                    className=" cursor-pointer mt-4 px-4 py-2 bg-orange-300 border border-gray-300 rounded-lg 
      text-white font-medium shadow-sm hover:bg-orange-500 transition"
                  >
                    Browse File
                  </button>
                </label>

                {formData.assessmentFile || existingFileName ? (
                  <div
                    className="
        mt-3 inline-flex items-center gap-2 
        bg-orange-100 text-orange-700 
        px-3 py-1.5 rounded-full text-sm font-medium
        border border-orange-300"
                  >
                    <FaFileUpload className="text-orange-600" />

                    <span className="truncate max-w-[150px]">
                      {formData.assessmentFile
                        ? formData.assessmentFile.name
                        : existingFileName}
                    </span>

                    <button
                      onClick={() => {
                        setFormData({ ...formData, assessmentFile: null });
                        setExistingFileName("");
                      }}
                      className="text-orange-700 hover:text-orange-900"
                    >
                      <FaTimes size={12} className="cursor-pointer" />
                    </button>
                  </div>
                ) : (
                  ""
                )}

                {errors.assessmentFile && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.assessmentFile}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div>
            <SectionTitle icon={<FaRegFileAlt />} title="Internal Notes" />

            <textarea
              className="w-full h-32 p-4 border border-gray-400 rounded-xl bg-gray-50  focus:ring-indigo-400"
              value={formData.internalNotes}
              onChange={(e) =>
                setFormData({ ...formData, internalNotes: e.target.value })
              }
              placeholder="Internal/reference notes..."
            ></textarea>

            <div className="flex gap-1 items-center px-5 py-3 text-sm text-yellow-500 mt-3 rounded-xl bg-yellow-50">
              <TbInfoOctagonFilled />
              <p>
                These notes are only for internal HR use and will not be visible
                to job applicants.
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center mt-8 flex-col sm:flex-row gap-4 sm:gap-0">
            <button
              onClick={() => router.back()}
              className="px-8 py-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-100 transition font-medium cursor-pointer"
            >
              Cancel
            </button>

            <button
              onClick={() => {
                const hasErrors = validateOnly();
                if (hasErrors) return;

                setShowConfirm(true);
              }}
              className="flex items-center gap-2 px-8 py-3 rounded-lg bg-orange-600 text-white hover:bg-orange-700 transition font-semibold shadow cursor-pointer"
            >
              {isEditMode ? (
                <>
                  <IoMdCheckmarkCircleOutline className="text-lg font-semibold" />
                  Update Job Post
                </>
              ) : (
                <>
                  <FaPlus />
                  Create Job Post
                </>
              )}
            </button>
          </div>

          {showSnackbar && (
            <div className="fixed  flex items-center gap-2 w-80 p-4 top-5 right-5 z-50  bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fadeIn">
              <IoMdWarning /> Fill in all the required fields.
            </div>
          )}
          {successSnackbar && (
            <div className="fixed top-5 right-5 z-9999 bg-green-600 text-white px-5 py-3 rounded-xl shadow-lg animate-fadeIn flex items-center gap-2">
              <LuCircleCheckBig className="text-white text-xl" />
              <span className="font-medium">{successSnackbar}</span>
            </div>
          )}
        </div>
      </div>

      {showDialog && (
        <div className="fixed top-5 right-5 z-50">
          <div className="bg-white w-80 pt-4 rounded-md shadow-lg border border-gray-200 animate-fadeIn">
            <div className="flex items-center gap-2 px-2 py-2 mb-2">
              <FaBriefcase className="text-gray-600 text-md" />

              <p className="text-md text-gray-600">{loadingMessage}</p>
            </div>

            <div className="w-full h-2 bg-gray-200 overflow-hidden">
              <div
                className="h-full bg-orange-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-9999">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-96 border border-orange-300 animate-fadeIn">
            <h2 className="text-xl font-semibold text-orange-700 mb-4 text-center">
              {isEditMode ? "Confirm Update" : "Confirm Create"}
            </h2>

            <p className="text-gray-600 text-center mb-10 text-base">
              {isEditMode
                ? "Do you want to update this job post?"
                : "Do you want to create this new job post?"}
            </p>

            <div className="flex gap-5">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-3 bg-gray-100 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-200 transition"
              >
                Back
              </button>

              <button
                onClick={handleConfirmAction}
                className="flex-1 py-3 bg-orange-600 text-white rounded-xl text-sm font-bold hover:bg-orange-700 shadow-lg shadow-orange-200 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// -----------------------------------------------------------
// Reusable Components (Typed)
// -----------------------------------------------------------
interface LabelProps {
  text: string;
  icon?: React.ReactNode;
}

function Label({ icon, text }: LabelProps) {
  return (
    <label className="flex items-center gap-2 text-gray-700 font-medium">
      {icon}
      {text}
    </label>
  );
}

interface SelectProps {
  label: string;
  icon?: React.ReactNode;
  options: string[];
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
}

const SelectField = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, icon, options, value, onChange, error }, ref) => (
    <div>
      <div className="flex items-center gap-2">
        {icon}
        <label className="text-gray-700 font-medium">{label}</label>
      </div>

      <select
        ref={ref}
        value={value}
        onChange={onChange}
        className={`w-full mt-2 p-3 border rounded-xl bg-gray-50 ${
          error ? "border-red-500" : "border-gray-400"
        }`}
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
);

interface InputProps {
  label: string;
  icon?: React.ReactNode;
  placeholder?: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  min?: string;
}

const InputField = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { label, icon, placeholder, value, onChange, error, type = "text", min },
    ref
  ) => (
    <div>
      <label className="flex items-center gap-2 text-gray-700 font-medium">
        {icon}
        {label}
      </label>

      <input
        ref={ref}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min ? min : type === "number" ? 1 : undefined}
        onWheel={(e) => {
          if (type === "number") e.currentTarget.blur(); // prevent scroll only for numbers
        }}
        className={`w-full mt-2 p-3 border rounded-xl bg-gray-50 ${
          error ? "border-red-500" : "border-gray-400"
        }`}
      />

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
);

InputField.displayName = "InputField";

interface SectionProps {
  title: string;
  icon?: React.ReactNode;
}

function SectionTitle({ title, icon }: SectionProps) {
  return (
    <div className="border-b border-gray-500 pb-3 mb-5 flex items-center gap-2">
      {icon}
      <h2 className="text-xl font-semibold text-gray-500">{title}</h2>
    </div>
  );
}
