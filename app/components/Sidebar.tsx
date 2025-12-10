import React from "react";
import { Users, Briefcase, LogOut } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  const activePage = "jobs";

  return (
    <div className="w-64 bg-white h-screen border-r border-gray-200 flex flex-col p-6 fixed left-0 top-0">
      <div className="mb-12 flex flex-col items-start font-bold text-red-700 leading-tight">
        <h1 className="text-2xl">CADD</h1>
        <h2 className="text-lg text-gray-800">CENTRE</h2>
        <small className="text-xs text-gray-500 font-normal">
          World. Class.
        </small>
      </div>

      <nav className="flex-1 space-y-2">
        <NavItem icon={<Users size={20} />} label="Candidates" />
        <NavItem
          icon={<Briefcase size={20} />}
          label="Jobs Post"
          isActive={activePage === "jobs"}
        />
      </nav>

      <div className="mt-auto">
        <div className="flex items-center space-x-3 text-red-600 font-medium cursor-pointer hover:bg-red-50 p-3 rounded-lg transition-colors">
          <LogOut size={20} />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

const NavItem = ({
  icon,
  label,
  isActive,
}: {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}) => {
  const baseClasses =
    "flex items-center space-x-3 p-3 rounded-lg font-medium transition-colors cursor-pointer";
  const activeClasses = "text-orange-500 bg-orange-50";
  const inactiveClasses =
    "text-gray-500 hover:text-orange-500 hover:bg-orange-50";

  return (
    <Link
      href="#"
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export default Sidebar;
