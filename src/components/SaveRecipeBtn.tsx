import React from 'react';
import 'src/components/SaveRecipeBtn.css';
import { ISelectedProduct } from '../common/types';
interface Props {
  selectedProducts: Array<ISelectedProduct>;
}

const saveToThisDevice = (selectedProducts: Array<ISelectedProduct>) => {
  localStorage.setItem('recipe', JSON.stringify(selectedProducts));
};
function SaveRecipeBtn({ selectedProducts }: Props) {
  return (
    <button onClick={() => saveToThisDevice(selectedProducts)} className="save-recipe">
      Save this recepie
    </button>
  );
}

export default SaveRecipeBtn;
