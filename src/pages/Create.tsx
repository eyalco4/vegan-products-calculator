import React, { Fragment } from 'react';
import 'src/pages/Create.css';
import Search from 'src/components/Search';
import SelectedProducts from 'src/components/SelectedProducts';
import { ICategoryListItem, ISelectedProduct } from '../common/types';

interface Props {
  productsByCategory: ICategoryListItem[];
  onProductSelection: (categoryIndex: number, productIndex: number, selected: boolean) => void;
  onTotalsUpdate: (
    productNameToUpdate: string,
    totalProtein: number,
    totalCarbs: number,
    totalCalories: number
  ) => void;
  onProductRemoval: (categoryIndex: number, productIndex: number) => void;
}
function Create({
  productsByCategory,
  onProductSelection,
  onTotalsUpdate,
  onProductRemoval,
}: Props) {
  const getSelectedProducts = (): ISelectedProduct[] | [] => {
    const result = new Array<ISelectedProduct>();
    productsByCategory.map((categoryListItem: ICategoryListItem, categoryIndex: number) => {
      const { products } = categoryListItem;
      products.map((product: ISelectedProduct, productIndex: number) => {
        if (product.selected) {
          result.push({ ...product, categoryIndex, productIndex });
        }
      });
    });
    return result;
  };
  return (
    <Fragment>
      <Search products={productsByCategory} onProductSelection={onProductSelection} />
      <SelectedProducts
        selectedProducts={getSelectedProducts()}
        onTotalsUpdate={onTotalsUpdate}
        onProductRemoval={onProductRemoval}
      />
    </Fragment>
  );
}

export default Create;
