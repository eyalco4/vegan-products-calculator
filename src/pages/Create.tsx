import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import 'src/pages/Create.css';
import { ICategoryListItem, IProduct, ISelectedProduct, IUnits } from 'src/common/types';
import { saveToDevice } from 'src/common/storage';
import PageWrapper from 'src/components/PageWrapper';
import { calculateValue, getFormattedValue } from 'src/common/utils';
import Search from 'src/components/Search';
import SelectedProductsList from 'src/components/SelectedProductsList';
import Totals from 'src/components/Totals';
import Button from 'src/components/Button';

interface Props {
  setPage: Dispatch<SetStateAction<string>>;
  productsByCategory: ICategoryListItem[];
  initialSelectedProducts?: ISelectedProduct[] | [];
}

function Create({ productsByCategory, setPage, initialSelectedProducts = [] }: Props) {
  const [selectedProducts, setSelectedProducts] = useState<ISelectedProduct[] | []>([]);
  const [meals, setMeals] = useState(1);
  const [open, setOpen] = useState(false);
  const [recpieName, setRecpieName] = useState<string>('');

  useEffect(() => {
    setSelectedProducts(initialSelectedProducts);
  }, []);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  function getSelectedProduct(categoryIndex: number, productIndex: number) {
    const { products } = productsByCategory[categoryIndex];
    const { product } = products[productIndex];
    return product;
  }
  const totalProtein = getFormattedValue(selectedProducts, 'protein');
  const totalCarbs = getFormattedValue(selectedProducts, 'carbs');
  const totalCalories = getFormattedValue(selectedProducts, 'calories');
  function onProductSelection(categoryIndex: number, productIndex: number) {
    const product: IProduct = getSelectedProduct(categoryIndex, productIndex);
    const { name, gr } = product;
    const isAlreadySelected: boolean =
      selectedProducts.filter(
        (selectedProductTemp: ISelectedProduct) => selectedProductTemp.product.name === name
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
    const selectedProductsUpdated = selectedProducts.map((selectedProduct: ISelectedProduct) => {
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
    });
    setSelectedProducts(selectedProductsUpdated);
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setRecpieName(event.target.value);
  }

  const save = () => {
    if (recpieName.length > 0) {
      const recpieToStore = {
        name: recpieName,
        meals,
        selectedProducts,
        totalProtein,
        totalCarbs,
        totalCalories,
      };
      saveToDevice(recpieToStore);
      setPage('recipes');
    }
  };

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
            setMeals={setMeals}
            meals={meals}
            totalProtein={totalProtein}
            totalCarbs={totalCarbs}
            totalCalories={totalCalories}
          />
          <div className="flex-col btn-w">
            <Button text="Save to this device" callback={onOpenModal} />
            <Button text="Home" callback={() => setPage('Landing')} />
          </div>
          <Modal open={open} onClose={onCloseModal} closeOnEsc={true} center>
            <div className="modal-input-wrapper flex-col">
              <input
                type="text"
                placeholder="Enter you recipe name"
                id="recipe-name-input"
                value={recpieName}
                onChange={onChange}
                autoComplete="off"
              />
              <Button size="small" text="Save" callback={save} />
            </div>
          </Modal>
        </div>
      </>
    </PageWrapper>
  );
}

export default Create;
