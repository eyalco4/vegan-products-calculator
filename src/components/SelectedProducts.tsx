import React, { Fragment } from 'react';
import 'src/components/SelectedProducts.css';
import SelectedProduct from 'src/components/SelectedProduct';
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

  if (selectedProducts.length === 0) {
    return <Fragment />;
  }
  return (
    <div className="bottom">
      <table>
        <thead>
          <tr>
            <th>Name</th>
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
      <div className="totals">
        <span className="total-key">Total Protein</span>
        <span className="total-value">{getFormattedValue('totalProtein')}</span>
      </div>
      <div className="totals">
        <span className="total-key">Total Carbs</span>
        <span className="total-value">{getFormattedValue('totalCarbs')}</span>
      </div>
      <div className="totals">
        <span className="total-key">Total Calories</span>
        <span className="total-value">{getFormattedValue('totalCalories')}</span>
      </div>
    </div>
  );
}

export default SelectedProducts;
