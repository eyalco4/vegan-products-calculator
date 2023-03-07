import React, { Fragment } from 'react';
import 'src/components/SelectedProductsList.css';
import SelectedProduct from 'src/components/SelectedProduct';
import Totals from 'src/components/Totals';
import { ISelectedProduct_temp } from 'src/common/types';
interface Props {
  selectedProducts: Array<ISelectedProduct_temp>;
  onTotalsUpdate: (
    categoryIndex: number,
    productIndex: number,
    totalProtein: number,
    totalCarbs: number,
    totalCalories: number
  ) => void;
  onProductRemoval: (categoryIndex: number, productIndex: number) => void;
}

function SelectedProductsList({ selectedProducts, onTotalsUpdate, onProductRemoval }: Props) {
  const getFormattedValue = (value: 'carbs' | 'protein' | 'calories') => {
    const totalValue: number = selectedProducts.reduce(
      (counter, selectedProduct: ISelectedProduct_temp) => counter + selectedProduct.totals[value],
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
              </tr>
            </thead>
            <tbody>
              {selectedProducts.map((selectedProduct: ISelectedProduct_temp) => {
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
        totalProtein={getFormattedValue('protein')}
        totalCarbs={getFormattedValue('carbs')}
        totalCalories={getFormattedValue('calories')}
      />
    </Fragment>
  );
}

export default SelectedProductsList;
