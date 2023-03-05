import React, { Dispatch, Fragment, SetStateAction } from 'react';
import 'src/pages/Create.css';
import Search from 'src/components/Search';
import SelectedProducts from 'src/components/SelectedProducts';
import { ICategoryListItem, ISelectedProduct } from '../common/types';

interface Props {
  setPage: Dispatch<SetStateAction<string>>;
  productsByCategory: ICategoryListItem[];
  setProductsByCategory: (updatedProducts: ICategoryListItem[]) => void;
}

function Create({ productsByCategory, setProductsByCategory }: Props) {
  function onProductSelection(categoryIndex: number, productIndex: number, selected: boolean) {
    const { products } = productsByCategory[categoryIndex];
    const product = products[productIndex];
    const updatedList = [...productsByCategory];
    updatedList[categoryIndex].products[productIndex] = { ...product, selected };
    setProductsByCategory(updatedList);
  }

  function onProductRemoval(categoryIndex: number, productIndex: number) {
    onProductSelection(categoryIndex, productIndex, false);
  }
  function onTotalsUpdate(
    productNameToUpdate: string,
    totalProtein: number,
    totalCarbs: number,
    totalCalories: number
  ) {
    const updatedProducts: ICategoryListItem[] = productsByCategory.map((item) => {
      const { category, products } = item;
      return {
        category,
        products: products.map((selectedProduct) => {
          const {
            product: { name },
          } = selectedProduct;
          return name === productNameToUpdate
            ? { ...selectedProduct, totalProtein, totalCarbs, totalCalories }
            : selectedProduct;
        }),
      };
    });
    setProductsByCategory(updatedProducts);
  }
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
