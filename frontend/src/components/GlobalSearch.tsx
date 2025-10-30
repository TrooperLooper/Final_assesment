import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

interface GlobalSearchProps {
  onSearch?: (query: string) => void;
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <div className="relative w-full flex justify-end">
      <div className="w-full max-w-xs">
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <FiSearch className="text-black w-4 h-4" />
        </span>
        <input
          type="text"
          placeholder="Search users..."
          value={query}
          onChange={handleChange}
          className="pl-8 pr-2 py-1 rounded bg-white/70 text-black border border-gray-300 w-full"
        />
      </div>
    </div>
  );
};

export default GlobalSearch;
