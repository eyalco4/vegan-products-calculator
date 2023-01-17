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
}

function SelectedProducts({ selectedProducts, onTotalsUpdate }: Props) {
  const getFormattedValue = (value: 'totalCarbs' | 'totalProtein' | 'totalCalories') => {
    const formatNumber = (num: number) => {
      const roundedNum = num.toFixed(2);
      //@ts-ignore
      return roundedNum < 1000
        ? roundedNum.toString()
        : roundedNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };
    const totalValue = selectedProducts.reduce(
      (counter, selectedProduct: ISelectedProduct) => counter + selectedProduct[value],
      0
    );
    return formatNumber(totalValue);
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
