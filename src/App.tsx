import React, { useState, useEffect } from 'react';
import Search from 'src/components/Search';
import 'src/App.css';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import SelectedProducts from 'src/components/SelectedProducts';
import { ISelectedProduct, IProduct } from 'src/common/types';

function App() {
  const [products, setProducts] = useState<ISelectedProduct[]>([]);
  const selectedProducts = products.filter((product: ISelectedProduct) => product.selected);

  useEffect(() => {
    import('src/products.json').then((productsModule) => {
      //@ts-ignore
      const fetchedProducts: Array<IProduct> = productsModule.default;
      const selectedProducts = fetchedProducts.map((product: IProduct) => {
        return { product, selected: false, totalProtein: 0, totalCarbs: 0, totalCalories: 0 };
        //@ts-ignore
      });
      setProducts(selectedProducts);
    });
  }, []);

  function onProductSelection(index: number) {
    const product = products[index];
    const newProducts = [...products];
    newProducts[index] = { ...product, selected: true };
    setProducts(newProducts);
  }

  function onTotalsUpdate(
    productNameToUpdate: string,
    totalProtein: number,
    totalCarbs: number,
    totalCalories: number
  ) {
    const updatedProducts: ISelectedProduct[] = products.map((selectedProduct) => {
      const {
        product: { name },
      } = selectedProduct;
      return name === productNameToUpdate
        ? { ...selectedProduct, totalProtein, totalCarbs, totalCalories }
        : selectedProduct;
    });
    setProducts(updatedProducts);
  }

  return (
    <div className="app ">
      <Header />
      <Search products={products} onProductSelection={onProductSelection} />
      <SelectedProducts selectedProducts={selectedProducts} onTotalsUpdate={onTotalsUpdate} />
      <Footer />
    </div>
  );
}

export default App;
