import React, { useState, useEffect } from 'react';
import Search from 'src/components/Search';
import 'src/App.css';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import SelectedProducts from 'src/components/SelectedProducts';
import { ISelectedProduct, IProduct, ICategoryListItem } from 'src/common/types';

function App() {
  const [productsByCategory, setProductsByCategory] = useState<ICategoryListItem[]>([]);

  const getSelectedProducts = (): ISelectedProduct[] | [] => {
    const result = new Array<ISelectedProduct>();
    productsByCategory.map((categoryListItem: ICategoryListItem) => {
      const { products } = categoryListItem;
      products.map((product: ISelectedProduct) => {
        if (product.selected) {
          result.push(product);
        }
      });
    });
    return result;
  };
  useEffect(() => {
    ['grains', 'legumes', 'nuts', 'seeds', 'soy', 'spreads', 'vegetables', 'wheat'].map(
      (category) => {
        import(`src/assets/${category}.json`).then((productsModule) => {
          const fetchedProducts: Array<IProduct> = productsModule.default;
          const products = fetchedProducts.map((product: IProduct) => {
            return { product, selected: false, totalProtein: 0, totalCarbs: 0, totalCalories: 0 };
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

  function onProductSelection(categoryIndex: number, productIndex: number) {
    const { products } = productsByCategory[categoryIndex];
    const product = products[productIndex];
    const updatedList = [...productsByCategory];
    updatedList[categoryIndex].products[productIndex] = { ...product, selected: true };
    setProductsByCategory(updatedList);
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
      <Header />
      <Search products={productsByCategory} onProductSelection={onProductSelection} />
      <SelectedProducts selectedProducts={getSelectedProducts()} onTotalsUpdate={onTotalsUpdate} />
      <Footer />
    </div>
  );
}

export default App;
