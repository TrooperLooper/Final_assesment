import React, { useState } from "react";

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
    <input
      type="text"
      placeholder="Search users..."
      value={query}
      onChange={handleChange}
    />
  );
};

export default GlobalSearch;
