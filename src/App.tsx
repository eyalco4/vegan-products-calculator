import React, { useState, useEffect, Fragment } from 'react';
import 'src/App.css';
import Landing from 'src/pages/Landing';
import Create from 'src/pages/Create';
import { ISelectedProduct, IProduct, ICategoryListItem } from 'src/common/types';

function App() {
  const [productsByCategory, setProductsByCategory] = useState<ICategoryListItem[]>([]);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(true);

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

  function onProductSelection(categoryIndex: number, productIndex: number, selected: boolean) {
    const { products } = productsByCategory[categoryIndex];
    const product = products[productIndex];
    const updatedList = [...productsByCategory];
    updatedList[categoryIndex].products[productIndex] = { ...product, selected };
    setProductsByCategory(updatedList);
  }

  function onProductRemoval(categoryIndex: number, productIndex: number) {
    onProductSelection(categoryIndex, productIndex, false);
  }

  function onTotalsUpdate(
    productNameToUpdate: string,
    totalProtein: number,
    totalCarbs: number,
    totalCalories: number
  ) {
    const updatedProducts: ICategoryListItem[] = productsByCategory.map((item) => {
      const { category, products } = item;
      return {
        category,
        products: products.map((selectedProduct) => {
          const {
            product: { name },
          } = selectedProduct;
          return name === productNameToUpdate
            ? { ...selectedProduct, totalProtein, totalCarbs, totalCalories }
            : selectedProduct;
        }),
      };
    });
    setProductsByCategory(updatedProducts);
  }

  return (
    <div className="app ">
      {isSignedIn ? (
        <Landing />
      ) : (
        <Create
          productsByCategory={productsByCategory}
          onProductSelection={onProductSelection}
          onProductRemoval={onProductRemoval}
          onTotalsUpdate={onTotalsUpdate}
        />
      )}
    </div>
  );
}

export default App;
