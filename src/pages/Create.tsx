import React, { Dispatch, SetStateAction, useState } from 'react';
import 'src/pages/Create.css';
import { ICategoryListItem, IProduct, ISelectedProduct_temp, IUnits } from 'src/common/types';
import PageWrapper from 'src/components/PageWrapper';
import { calculateValue } from 'src/utils';
import Search from 'src/components/Search';
import SelectedProductsList from 'src/components/SelectedProductsList';
import Totals from 'src/components/Totals';
import Button from 'src/components/Button';

interface Props {
  setPage: Dispatch<SetStateAction<string>>;
  productsByCategory: ICategoryListItem[];
}

function Create({ productsByCategory, setPage }: Props) {
  const [selectedProducts, setSelectedProducts] = useState<ISelectedProduct_temp[] | []>([]);

  function getSelectedProduct(categoryIndex: number, productIndex: number) {
    const { products } = productsByCategory[categoryIndex];
    const { product } = products[productIndex];
    return product;
  }
  const getFormattedValue = (value: 'carbs' | 'protein' | 'calories') => {
    //@ts-ignore
    const totalValue: number = selectedProducts.reduce(
      (counter: number, selectedProduct: ISelectedProduct_temp) =>
        counter + selectedProduct.totals[value],
      0
    );
    return totalValue;
  };
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
    categoryIndex: number,
    productIndex: number,
    protein: number,
    carbs: number,
    calories: number
  ) {
    const productToUpdate: IProduct = getSelectedProduct(categoryIndex, productIndex);
    const selectedProductsUpdated = selectedProducts.map(
      (selectedProduct: ISelectedProduct_temp) => {
        const { product } = selectedProduct;
        if (product.name === productToUpdate.name) {
          return {
            ...selectedProduct,
            totals: {
              protein,
              carbs,
              calories,
            },
          };
        }
        return selectedProduct;
      }
    );
    setSelectedProducts(selectedProductsUpdated);
  }
  return (
    <PageWrapper>
      <>
        <div className="selected-w">
          <Search products={productsByCategory} onProductSelection={onProductSelection} />
          <SelectedProductsList
            selectedProducts={selectedProducts}
            onTotalsUpdate={onTotalsUpdate}
            onProductRemoval={onProductRemoval}
          />
        </div>
        <div className="bottom-w">
          <Totals
            totalProtein={getFormattedValue('protein')}
            totalCarbs={getFormattedValue('carbs')}
            totalCalories={getFormattedValue('calories')}
          />
          <div className="flex-col btn-w">
            <Button text="Save to this device" callback={() => setPage('Landing')} />
            <Button text="Back" callback={() => setPage('Landing')} />
          </div>
        </div>
      </>
    </PageWrapper>
  );
}

export default Create;
