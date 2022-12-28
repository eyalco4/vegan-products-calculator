import React, { useEffect } from 'react';
import './Search.css';
import SearchIcon from './icons/Search';
interface SearchProps {
  children?: React.ReactNode;
  value: string;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

function Search({ children, value, onChange }: SearchProps) {
  return (
    <div className="search-wrapper">
      <label htmlFor="search">{children}</label>
      <input
        placeholder="Choose a product"
        id="search"
        type="text"
        value={value}
        onChange={onChange}
      />
      <SearchIcon />
    </div>
  );
}

export default Search;
