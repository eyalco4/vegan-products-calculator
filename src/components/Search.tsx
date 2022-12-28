import React from 'react';

interface SearchProps {
  children?: React.ReactNode;
  value?: string;
  onChange?(event: React.ChangeEvent<HTMLInputElement>): void;
}

function Search({ children, value, onChange }: SearchProps) {
  return (
    <div>
      <label htmlFor="search">{children}</label>
      <input placeholder="Example" id="search" type="text" value={value} onChange={onChange} />
    </div>
  );
}

export default Search;
