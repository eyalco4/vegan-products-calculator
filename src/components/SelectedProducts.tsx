import React, { useState } from 'react';
import 'src/components/SelectedProducts.css';
import SelectedProduct from 'src/components/SelectedProduct';

export interface Product {
  name: string;
  protein: number;
}
interface Props {
  selectedProducts: Array<Product>;
}

export interface totalsItem {
  name: string;
  value: number;
}

function SelectedProducts({ selectedProducts }: Props) {
  const [proteinList, setProteinList] = useState<Array<totalsItem>>([]);
  const [carbsList, setCarbsList] = useState<Array<totalsItem>>([]);
  const getTotalProtein = (): number => {
    return proteinList.reduce((counter, product: totalsItem) => counter + product.value, 0);
  };
  const getTotalCarbs = (): number => {
    return carbsList.reduce((counter, product: totalsItem) => counter + product.value, 0);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Units</th>
          <th>Quantity</th>
          <th>Protein</th>
          <th>Carbs</th>
        </tr>
      </thead>
      <tbody>
        {selectedProducts.map((product: Product, index: number) => {
          // const LazyLoadedIcon: any = import(`src/components/icons/${name}.tsx`);
          return (
            <SelectedProduct
              product={product}
              key={index}
              setproteinList={setProteinList}
              setCarbsList={setCarbsList}
            />
          );
        })}
        {selectedProducts && (
          <tr>
            <td>Total</td>
            <td></td>
            <td></td>
            <td>{getTotalProtein()}</td>
            <td>{getTotalCarbs()}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default SelectedProducts;
