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
    <div className="relative w-32 sm:w-40 md:w-[300px]">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleChange}
        className="w-full rounded text-sm px-3 py-1 pr-10 bg-white/40 text-white placeholder:text-white/70 outline-none"
      />
      <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white" />
    </div>
  );
};

export default GlobalSearch;
