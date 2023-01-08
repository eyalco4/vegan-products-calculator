import React, { Fragment } from 'react';
import 'src/components/SelectedProducts.css';
import SelectedProduct from 'src/components/SelectedProduct';
import { ISelectedProduct } from 'src/common/types';
interface Props {
  selectedProducts: Array<ISelectedProduct>;
  onTotalsUpdate: (productNameToUpdate: string, totalProtein: number, totalCarbs: number) => void;
}

function SelectedProducts({ selectedProducts, onTotalsUpdate }: Props) {
  const getTotalProtein = (): number => {
    return selectedProducts.reduce(
      (counter, selectedProduct: ISelectedProduct) => counter + selectedProduct.totalProtein,
      0
    );
  };
  const getTotalCarbs = (): number => {
    return selectedProducts.reduce(
      (counter, selectedProduct: ISelectedProduct) => counter + selectedProduct.totalCarbs,
      0
    );
  };

  if (selectedProducts.length === 0) {
    return <Fragment />;
  }
  return (
    <div className="bottom">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Units</th>
            <th>Quantity</th>
            {/*<th>Protein</th>*/}
            {/*<th>Carbs</th>*/}
          </tr>
        </thead>
        <tbody>
          {selectedProducts.map((selectedProduct: ISelectedProduct, index: number) => {
            // const LazyLoadedIcon: any = import(`src/components/icons/${name}.tsx`);
            return (
              <SelectedProduct
                selectedProduct={selectedProduct}
                key={index}
                onTotalsUpdate={onTotalsUpdate}
              />
            );
          })}

          <tr className="totals">
            <td>Total Protein</td>
            <td />
            <td className="protein">{getTotalProtein()}</td>
          </tr>
          <tr className="totals">
            <td>Total Carbs</td>
            <td />
            <td>{getTotalCarbs()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default SelectedProducts;
