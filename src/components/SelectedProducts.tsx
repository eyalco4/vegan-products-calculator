import React, { Fragment } from 'react';
import 'src/components/SelectedProducts.css';
import SelectedProduct from 'src/components/SelectedProduct';
import Totals from 'src/components/Totals';
import { ISelectedProduct } from 'src/common/types';
interface Props {
  selectedProducts: Array<ISelectedProduct>;
  onTotalsUpdate: (
    productNameToUpdate: string,
    totalProtein: number,
    totalCarbs: number,
    totalCalories: number
  ) => void;
  onProductRemoval: (categoryIndex: number, productIndex: number) => void;
}

function SelectedProducts({ selectedProducts, onTotalsUpdate, onProductRemoval }: Props) {
  const getFormattedValue = (value: 'totalCarbs' | 'totalProtein' | 'totalCalories') => {
    const totalValue = selectedProducts.reduce(
      (counter, selectedProduct: ISelectedProduct) => counter + selectedProduct[value],
      0
    );
    return totalValue;
  };

  return (
    <Fragment>
      <div className="bottom">
        {selectedProducts.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Cooked</th>
                <th>Units</th>
                <th>Quantity</th>
                {/*<th>Protein</th>*/}
                {/*<th>Carbs</th>*/}
              </tr>
            </thead>
            <tbody>
              {selectedProducts.map((selectedProduct: ISelectedProduct) => {
                // const LazyLoadedIcon: any = import(`src/components/icons/${name}.tsx`);
                return (
                  <SelectedProduct
                    selectedProduct={selectedProduct}
                    key={selectedProduct.product.name}
                    onTotalsUpdate={onTotalsUpdate}
                    onProductRemoval={onProductRemoval}
                  />
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      <Totals
        totalProtein={getFormattedValue('totalProtein')}
        totalCarbs={getFormattedValue('totalCarbs')}
        totalCalories={getFormattedValue('totalCalories')}
      />
    </Fragment>
  );
}

export default SelectedProducts;
