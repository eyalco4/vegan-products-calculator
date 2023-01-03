import React, { useState, useEffect } from 'react';
import Search from 'src/components/Search';
import 'src/App.css';
import Header from 'src/components/Header';
import SelectedProducts from 'src/components/SelectedProducts';

function App() {
  const [allProducts, setAllProducts] = useState<Array<any>>([]);
  const [selectedProducts, setSelectedProducts] = useState<Array<any>>([]);

  useEffect(() => {
    import('src/products.json').then((productsModule) => {
      const products = productsModule.default;
      setAllProducts(products);
    });
  });

  function onProductSelection(product: any) {
    !selectedProducts.includes(product) && setSelectedProducts([...selectedProducts, product]);
  }

  return (
    <div className="app ">
      <Header />
      <Search products={allProducts} onProductSelection={onProductSelection} />
      <SelectedProducts selectedProducts={selectedProducts} />
    </div>
  );
}

export default App;
