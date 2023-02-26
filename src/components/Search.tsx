import React, { useState, useEffect, useRef, Ref, MouseEvent, ChangeEvent, Fragment } from 'react';
import './Search.css';
import SearchIcon from 'src/components/icons/Search';
import Delete from 'src/components/icons/Delete';
import { ICategoryListItem, IFilteredSearchItem, names } from 'src/common/types';
interface SearchProps {
  children?: React.ReactNode;
  products: ICategoryListItem[];
  onProductSelection: (categoryIndex: number, productIndex: number, selected: boolean) => void;
}

function Search({ children, products, onProductSelection }: SearchProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>('');
  const ref: Ref<HTMLDivElement> = useRef(null);
  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setFilter(event.target.value);
    filter && setIsDrawerOpen(true);
  }

  function closeDrawer() {
    setIsDrawerOpen(false);
  }
  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsDrawerOpen(false);
      setFilter('');
    }
  };

  const onProductClick = (
    e: MouseEvent<HTMLElement>,
    categoryIndex: number,
    productIndex: number
  ) => {
    e.preventDefault();
    setIsDrawerOpen(false);
    onProductSelection(categoryIndex, productIndex, true);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);
  function filteredOptions(): IFilteredSearchItem[] {
    const filterLowerCase = filter.toLowerCase();
    const filteredOptions = products.reduce(
      (fileredProducts: IFilteredSearchItem[], entry: ICategoryListItem, categoryIndex: number) => {
        const { category, products } = entry;
        const names = products.map(({ product }, productIndex: number) => {
          return { name: product.name, categoryIndex, productIndex };
        });
        let filteredNames = new Array<names>();
        if (names.length > 0) {
          filteredNames = names.filter((item: names) => {
            const { name = '' } = item;
            return name.includes(filterLowerCase);
          });
        }
        if (filteredNames.length > 0) {
          return [...fileredProducts, { category, names: filteredNames }];
        }
        return fileredProducts;
      },
      []
    );
    return filteredOptions;
  }

  return (
    <div className="top">
      <div className="search-wrapper top" ref={ref}>
        <div
          className="search-box"
          onClick={() => (isDrawerOpen ? closeDrawer() : setIsDrawerOpen(true))}
        >
          <label htmlFor="search">{children}</label>
          <input
            placeholder="Tap to search"
            id="search"
            type="text"
            value={filter}
            onChange={onChange}
            autoComplete="off"
          />
          <SearchIcon />
          <hr />
        </div>
        {isDrawerOpen && (
          <ul className="product-list">
            {filteredOptions().map(({ category, names }) => (
              <Fragment key={category}>
                <div className="category">{category}</div>
                {names.map((item: names) => {
                  const { name, categoryIndex, productIndex } = item;
                  return (
                    <li
                      key={`${categoryIndex}-${productIndex}`}
                      className="product-option"
                      onClick={(e) => onProductClick(e, categoryIndex, productIndex)}
                    >
                      {name}
                    </li>
                  );
                })}
              </Fragment>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Search;
