import React, { useState, useEffect } from 'react';
import 'src/App.css';
import Landing from 'src/pages/Landing';
import Create from 'src/pages/Create';
import { IProduct, ICategoryListItem, IUser, ISelectedProduct } from 'src/common/types';
import Login from 'src/pages/Login';
import Recipes from './pages/Recipes';

function App() {
  const [productsByCategory, setProductsByCategory] = useState<ICategoryListItem[]>([]);
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const [page, setPage] = useState<string>('landing');
  const [initialSelectedProducts, setInitialSelectedProducts] = useState<ISelectedProduct[] | []>(
    []
  );

  useEffect(() => {
    ['grains', 'legumes', 'liquids', 'nuts', 'seeds', 'soy', 'spreads', 'vegetables', 'wheat'].map(
      (category, categoryIndex) => {
        import(`src/assets/${category}.json`).then((productsModule) => {
          const fetchedProducts: Array<IProduct> = productsModule.default;
          const products = fetchedProducts.map((product: IProduct, productIndex) => {
            return {
              product,
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
      case 'create':
        return (
          <Create
            setPage={setPage}
            productsByCategory={productsByCategory}
            initialSelectedProducts={initialSelectedProducts}
          />
        );
        break;
      case 'login':
        return <Login setPage={setPage} setUser={setUser} />;
        break;
      case 'recipes':
        //@ts-ignore
        return (
          <Recipes
            setPage={setPage}
            setUser={setUser}
            setInitialSelectedProducts={setInitialSelectedProducts}
          />
        );
        break;
      case 'landing':
      default:
        return <Landing user={user} setPage={setPage} />;
        break;
    }
  }

  return <div className="app ">{getPage()}</div>;
}

export default App;
