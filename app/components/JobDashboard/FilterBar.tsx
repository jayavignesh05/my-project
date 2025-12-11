"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { Search, MapPin, SlidersHorizontal } from "lucide-react";

// --- 1. DATA SOURCE ---
const initialJobList = [
  { id: 1, role: "Senior Frontend Developer", location: "San Francisco, CA" },
  { id: 2, role: "Product Manager", location: "New York, NY" },
  { id: 3, role: "Data Scientist", location: "Austin, TX" },
  { id: 4, role: "UX/UI Designer", location: "Remote" },
  { id: 5, role: "Backend Engineer", location: "London, UK" },
  { id: 6, role: "Digital Marketing Specialist", location: "Chicago, IL" },
  { id: 7, role: "DevOps Engineer", location: "Remote" },
  { id: 8, role: "Sales Representative", location: "Miami, FL" },
  { id: 9, role: "Human Resources Manager", location: "Seattle, WA" },
  { id: 10, role: "Graphic Designer", location: "Los Angeles, CA" },
];

interface FilterBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  locationTerm: string;
  setLocationTerm: (value: string) => void;
  selectedTypes: string[];
  setSelectedTypes: (types: string[]) => void;
}

const FilterBar = ({
  searchTerm,
  setSearchTerm,
  locationTerm,
  setLocationTerm,
  selectedTypes,
  setSelectedTypes,
}: FilterBarProps) => {
  const [showFilters, setShowFilters] = useState(false);

  // --- STATES FOR DROPDOWNS ---
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  // --- LOCAL INPUT STATES ---
  const [localSearch, setLocalSearch] = useState(searchTerm);
  const [localLocation, setLocalLocation] = useState(locationTerm);

  // --- REFS ---
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const locationContainerRef = useRef<HTMLDivElement>(null);

  // Flag to check if the user just clicked a suggestion
  const isSelectionRef = useRef(false);

  const employmentTypes = [
    "Full Time",
    "Part Time",
    "Internship",
    "Contract",
    "Freelance",
  ];

  // --- 2. EXTRACT UNIQUE DATA ---
  const allJobTitles = useMemo(() => {
    const roles = initialJobList.map((job) => job.role);
    return Array.from(new Set(roles));
  }, []);

  const allLocations = useMemo(() => {
    const locs = initialJobList.map((job) => job.location);
    return Array.from(new Set(locs));
  }, []);

  // --- 3. SEARCH BAR DEBOUNCE ---
  useEffect(() => {
    const delayInput = setTimeout(() => {
      // LOGIC FIX: If this update was caused by a CLICK, stop here.
      if (isSelectionRef.current) {
        isSelectionRef.current = false; // Reset the flag
        return; // STOP! Don't open dropdown
      }

      if (localSearch.trim().length === 0) {
        setSearchTerm("");
        setShowSearchDropdown(false);
      } else {
        const filtered = allJobTitles.filter((title) =>
          title.toLowerCase().includes(localSearch.toLowerCase())
        );
        setSearchSuggestions(filtered);
        // Only show if there are results
        if (filtered.length > 0) {
          setShowSearchDropdown(true);
        } else {
          setShowSearchDropdown(false);
        }
      }
    }, 100);

    return () => clearTimeout(delayInput);
  }, [localSearch, allJobTitles, setSearchTerm]);

  // --- 4. LOCATION BAR DEBOUNCE ---
  useEffect(() => {
    const delayInput = setTimeout(() => {
      // LOGIC FIX: Same check for Location
      if (isSelectionRef.current) {
        isSelectionRef.current = false;
        return;
      }

      if (localLocation.trim().length === 0) {
        setLocationTerm("");
        setShowLocationDropdown(false);
      } else {
        const filtered = allLocations.filter((loc) =>
          loc.toLowerCase().includes(localLocation.toLowerCase())
        );
        setLocationSuggestions(filtered);

        if (filtered.length > 0) {
          setShowLocationDropdown(true);
        } else {
          setShowLocationDropdown(false);
        }
      }
    }, 100);

    return () => clearTimeout(delayInput);
  }, [localLocation, allLocations, setLocationTerm]);

  // --- 5. CLICK OUTSIDE LISTENER ---
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowFilters(false);
      }
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowSearchDropdown(false);
      }
      if (
        locationContainerRef.current &&
        !locationContainerRef.current.contains(event.target as Node)
      ) {
        setShowLocationDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- HANDLERS ---

  // Search Handlers
  const handleSearchSuggestionClick = (title: string) => {
    isSelectionRef.current = true; // <--- Mark as Selection
    setLocalSearch(title);
    setSearchTerm(title);
    setShowSearchDropdown(false); // Force Close
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      isSelectionRef.current = true;
      setSearchTerm(localSearch);
      setShowSearchDropdown(false);
    }
  };

  // Location Handlers
  const handleLocationSuggestionClick = (loc: string) => {
    isSelectionRef.current = true; // <--- Mark as Selection
    setLocalLocation(loc);
    setLocationTerm(loc);
    setShowLocationDropdown(false); // Force Close
  };

  const handleLocationKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      isSelectionRef.current = true;
      setLocationTerm(localLocation);
      setShowLocationDropdown(false);
    }
  };

  const handleTypeChange = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-3 mb-6 w-full z-20 relative">
      {/* --- SEARCH BAR --- */}
      <div className="flex-1 relative" ref={searchContainerRef}>
        <div className="flex items-center px-4 py-2.5 rounded-xl bg-white border border-gray-200 shadow-sm focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-200 transition-all h-full">
          <Search className="text-gray-400 mr-3" size={20} />
          <input
            type="text"
            placeholder="Search by Role..."
            className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400 h-full py-1"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            onFocus={() => {
              // Only open if text exists and it wasn't just clicked
              if (localSearch && !isSelectionRef.current)
                setShowSearchDropdown(true);
            }}
          />
        </div>

        {showSearchDropdown && searchSuggestions.length > 0 && (
          <div className="absolute left-0 top-full mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
            <ul>
              {searchSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSearchSuggestionClick(suggestion)}
                  className="px-4 py-3 hover:bg-orange-50 cursor-pointer text-sm text-gray-700 flex items-center gap-2 transition-colors border-b border-gray-50 last:border-0"
                >
                  <Search size={14} className="text-gray-400" />
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* --- LOCATION BAR (UPDATED) --- */}
      <div className="flex-1 relative" ref={locationContainerRef}>
        <div className="flex items-center px-4 py-2.5 rounded-xl bg-white border border-gray-200 shadow-sm focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-200 transition-all h-full">
          <MapPin className="text-gray-400 mr-3" size={20} />
          <input
            type="text"
            placeholder="Location..."
            className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400 h-full py-1"
            value={localLocation}
            onChange={(e) => setLocalLocation(e.target.value)}
            onKeyDown={handleLocationKeyDown}
            onFocus={() => {
              if (localLocation && !isSelectionRef.current)
                setShowLocationDropdown(true);
            }}
          />
        </div>

        {/* Location Dropdown */}
        {showLocationDropdown && locationSuggestions.length > 0 && (
          <div className="absolute left-0 top-full mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
            <ul>
              {locationSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleLocationSuggestionClick(suggestion)}
                  className="px-4 py-3 hover:bg-orange-50 cursor-pointer text-sm text-gray-700 flex items-center gap-2 transition-colors border-b border-gray-50 last:border-0"
                >
                  <MapPin size={14} className="text-gray-400" />
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* --- FILTER BUTTON --- */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`h-full px-4 flex justify-center items-center rounded-xl border shadow-sm transition-all gap-2 ${
            showFilters || selectedTypes.length > 0
              ? "bg-white border-orange-500 text-orange-600"
              : "bg-white border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700"
          }`}
        >
          <SlidersHorizontal size={18} />
          <span className="text-sm font-semibold">Job Type</span>
          {selectedTypes.length > 0 && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full border border-white"></span>
          )}
        </button>

        {showFilters && (
          <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-200">
            <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
              Employment Type
            </div>
            <div className="space-y-1">
              {employmentTypes.map((type) => (
                <label
                  key={type}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-orange-50 cursor-pointer group transition-colors"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500 accent-orange-600"
                    checked={selectedTypes.includes(type)}
                    onChange={() => handleTypeChange(type)}
                  />
                  <span
                    className={`text-sm font-medium group-hover:text-orange-700 ${
                      selectedTypes.includes(type)
                        ? "text-orange-700 font-bold"
                        : "text-gray-700"
                    }`}
                  >
                    {type}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
