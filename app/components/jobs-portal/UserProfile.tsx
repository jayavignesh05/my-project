import React from 'react';
import { MapPin, Briefcase, GraduationCap, Phone, Mail, User } from 'lucide-react';

const UserProfile = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
      <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
          <User size={24} />
        </div>
        <div>
          <h3 className="font-bold text-lg">Prasanna</h3>
          <p className="text-gray-500 text-sm">Backend Developer</p>
        </div>
      </div>

      <div className="space-y-4 text-sm text-gray-600 mb-6">
        <div className="flex items-center gap-3">
          <MapPin size={16} className="text-gray-400" /> Chennai
        </div>
        <div className="flex items-center gap-3">
          <Briefcase size={16} className="text-gray-400" /> 3 Years Experience
        </div>
        <div className="flex items-center gap-3">
          <GraduationCap size={16} className="text-gray-400" /> Bsc Computer Science
        </div>
        <div className="flex items-center gap-3">
          <Phone size={16} className="text-gray-400" /> 9876543210
        </div>
        <div className="flex items-center gap-3">
          <Mail size={16} className="text-gray-400" /> prasanna@gmail.com
        </div>
      </div>

      <button className="w-full bg-orange-500 text-white py-2.5 rounded-lg font-medium hover:bg-orange-600 transition-colors">
        View Profile
      </button>
    </div>
  );
};

export default UserProfile;