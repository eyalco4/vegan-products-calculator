import React, { useState, useEffect } from 'react';
import Search from 'src/components/Search';
import 'src/App.css';
import Leaf from 'src/components/icons/Leaf';

function App() {
  const [text, setText] = useState('');
  const [allProducts, setAllProducts] = React.useState<Array<any>>([]);
  const [selectedProducts, setSelectedProducts] = React.useState<Array<any>>([]);

  useEffect(() => {
    import('./products.json').then((productsModule) => {
      const products = productsModule.default;
      setAllProducts(products);
    });
  });
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setText(event.target.value);
  }
  return (
    <div className="app ">
      <header className="header">
        <Leaf />
        Vegan Products Calculator
      </header>
      <Search value={text} onChange={handleChange} />
      <p>You typed: {text ? text : '...'}</p>
      <p>Options are: {allProducts.length ? allProducts[0].name : 'Loading..'}</p>
      <p>
        Selected Products:{' '}
        {selectedProducts.map((product: any, index: number) => {
          return <span key={index}>{product.name}</span>;
        })}
      </p>
    </div>
  );
}

export default App;
