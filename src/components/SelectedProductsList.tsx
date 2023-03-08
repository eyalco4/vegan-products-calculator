import React, { Fragment } from 'react';
import 'src/components/SelectedProductsList.css';
import SelectedProduct from 'src/components/SelectedProduct';
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
  return (
    <Fragment>
      <div className="list-w">
        {selectedProducts.length > 0 && (
          <table id="selected-table">
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
    </Fragment>
  );
}

export default SelectedProductsList;
