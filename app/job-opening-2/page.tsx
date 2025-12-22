import React from "react";
import JobOpening from "../components/job-opening-comp-2/JobOpening-2";

const JobOpeningPage2= () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Job Opening Preview</h1>
      <JobOpening />
    </div>
  );
};

export default JobOpeningPage2;