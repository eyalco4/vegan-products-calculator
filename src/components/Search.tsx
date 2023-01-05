import React, { useState, useEffect, useRef, Ref, MouseEvent, ChangeEvent } from 'react';
import './Search.css';
import SearchIcon from './icons/Search';
import { ISelectedProduct } from 'src/common/types';
interface SearchProps {
  children?: React.ReactNode;
  products: Array<ISelectedProduct>;
  onProductSelection: (index: number) => void;
}

function Search({ children, products, onProductSelection }: SearchProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>('');
  const ref: Ref<HTMLDivElement> = useRef(null);

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setFilter(event.target.value);
    filter && setIsDrawerOpen(true);
  }

  function onFocus() {
    setIsDrawerOpen(true);
  }
  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsDrawerOpen(false);
      setFilter('');
    }
  };

  const onProductClick = (e: MouseEvent<HTMLElement>, index: number) => {
    e.preventDefault();
    setIsDrawerOpen(false);
    onProductSelection(index);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);
  function filteredOptions() {
    const filterLowerCase = filter.toLowerCase();
    const names = products.map(({ product: { name } }) => name);
    return names.filter((name) => name.includes(filterLowerCase));
  }

  return (
    <div className="top">
      <div className="search-wrapper" ref={ref}>
        <div className="search-box" onFocus={onFocus}>
          <label htmlFor="search">{children}</label>
          <input
            placeholder="Choose a product"
            id="search"
            type="text"
            value={filter}
            onChange={onChange}
            autoComplete="off"
          />
          <SearchIcon />
        </div>
        {isDrawerOpen && (
          <ul className="product-list">
            {filteredOptions().map((name, index) => (
              <li key={index} className="product-option" onClick={(e) => onProductClick(e, index)}>
                <span className="product-name">{name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Search;
