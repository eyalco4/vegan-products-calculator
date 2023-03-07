import React, { Dispatch, Fragment, SetStateAction, useState } from 'react';
import 'src/pages/Create.css';
import Search from 'src/components/Search';
import SelectedProductsList from 'src/components/SelectedProductsList';
import { ICategoryListItem, IProduct, ISelectedProduct_temp, IUnits } from 'src/common/types';
import { calculateValue } from 'src/utils';

interface Props {
  setPage: Dispatch<SetStateAction<string>>;
  productsByCategory: ICategoryListItem[];
  setProductsByCategory: (updatedProducts: ICategoryListItem[]) => void;
}

function Create({ productsByCategory, setProductsByCategory }: Props) {
  const [selectedProducts, setSelectedProducts] = useState<ISelectedProduct_temp[] | []>([]);

  function getSelectedProduct(categoryIndex: number, productIndex: number) {
    const { products } = productsByCategory[categoryIndex];
    const { product } = products[productIndex];
    return product;
  }
  function onProductSelection(categoryIndex: number, productIndex: number) {
    const product: IProduct = getSelectedProduct(categoryIndex, productIndex);
    const { name, gr } = product;
    const isAlreadySelected: boolean =
      selectedProducts.filter(
        (selectedProductTemp: ISelectedProduct_temp) => selectedProductTemp.product.name === name
      ).length > 0;
    if (isAlreadySelected) {
      return;
    }
    const units: IUnits = gr ? 'gr' : 'ml';
    // @ts-ignore
    const protein = calculateValue(product[units]?.protein, 100, units, 1);
    // @ts-ignore
    const carbs = calculateValue(product[units]?.carbs, 100, units, 1);
    // @ts-ignore
    const calories = calculateValue(product[units]?.calories, 100, units, 1);
    const selectedProduct = {
      product,
      productIndex,
      categoryIndex,
      selectedValues: {
        quantity: 100,
        measure: units,
        cooked: false,
      },

      totals: {
        protein,
        carbs,
        calories,
      },
    };
    setSelectedProducts([...selectedProducts, selectedProduct]);
  }

  function onProductRemoval(categoryIndex: number, productIndex: number) {
    const productToRemove: IProduct = getSelectedProduct(categoryIndex, productIndex);
    const selectedProductsUpdated = selectedProducts.filter(
      ({ product }) => product.name !== productToRemove.name
    );
    setSelectedProducts(selectedProductsUpdated);
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
  return (
    <Fragment>
      <Search products={productsByCategory} onProductSelection={onProductSelection} />
      <SelectedProductsList
        selectedProducts={selectedProducts}
        onTotalsUpdate={onTotalsUpdate}
        onProductRemoval={onProductRemoval}
      />
    </Fragment>
  );
}

export default Create;
