import React, { useState, useEffect } from 'react';
import 'src/App.css';
import Landing from 'src/pages/Landing';
import Create from 'src/pages/Create';
import { IProduct, ICategoryListItem } from 'src/common/types';
import Login from 'src/pages/Login';

function App() {
  const [productsByCategory, setProductsByCategory] = useState<ICategoryListItem[]>([]);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [page, setPage] = useState<string>('landing');

  useEffect(() => {
    ['grains', 'legumes', 'liquids', 'nuts', 'seeds', 'soy', 'spreads', 'vegetables', 'wheat'].map(
      (category, categoryIndex) => {
        import(`src/assets/${category}.json`).then((productsModule) => {
          const fetchedProducts: Array<IProduct> = productsModule.default;
          const products = fetchedProducts.map((product: IProduct, productIndex) => {
            return {
              product,
              selected: false,
              totalProtein: 0,
              totalCarbs: 0,
              totalCalories: 0,
              categoryIndex,
              productIndex,
            };
          });
          const newAllProducts = productsByCategory;
          newAllProducts.push({ category, products });
          setProductsByCategory(newAllProducts);
        });
      }
    );
    const newAllProducts = productsByCategory;
    newAllProducts.sort((item1, item2) => item2.category.localeCompare(item1.category));
    setProductsByCategory(newAllProducts);
  }, []);

  function getPage() {
    switch (page) {
      case 'login':
        return <Login setPage={setPage} setIsSignedIn={setIsSignedIn} />;
        break;
      case 'create':
        return (
          <Create
            setPage={setPage}
            productsByCategory={productsByCategory}
            setProductsByCategory={setProductsByCategory}
          />
        );
        break;
      case 'landing':
      default:
        return <Landing isSignedIn={isSignedIn} setPage={setPage} />;
        break;
    }
  }

  return <div className="app ">{getPage()}</div>;
}

export default App;
