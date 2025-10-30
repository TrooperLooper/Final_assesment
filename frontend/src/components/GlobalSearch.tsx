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
    <div className="relative w-[300px]">
      <input
        type="text"
        placeholder="Search users..."
        value={query}
        onChange={handleChange}
        className="w-full rounded px-3 py-1 pr-10 bg-white/50 text-gray-900 outline-none"
      />
      <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-900" />
    </div>
  );
};

export default GlobalSearch;
