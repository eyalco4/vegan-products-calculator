import React, { useState, useEffect, useRef, Ref } from 'react';
import './Search.css';
import SearchIcon from './icons/Search';
interface SearchProps {
  children?: React.ReactNode;
  products: Array<any>;
  onProductSelection: any;
}

function Search({ children, products, onProductSelection }: SearchProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>('');
  const ref: Ref<any> = useRef(null);

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
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

  const onProductClick = (e: any, product: any) => {
    e.preventDefault();
    setIsDrawerOpen(false);
    onProductSelection(product);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);
  function filteredOptions() {
    return products.filter(({ name }) => {
      const filterLowerCase = filter.toLowerCase();
      return name.includes(filterLowerCase);
    });
  }

  return (
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
          {filteredOptions().map((product, index) => (
            <li key={index} className="product-option" onClick={(e) => onProductClick(e, product)}>
              <span className="product-name">{product.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;
