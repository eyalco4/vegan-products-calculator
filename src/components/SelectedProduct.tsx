import React, { Suspense, useState, Dispatch, SetStateAction, ChangeEvent } from 'react';
import './SelectedProduct.css';
import { Product, totalsItem } from 'src/components/SelectedProducts';
interface Props {
  product: Product;
  key: number;
  setproteinList: Dispatch<SetStateAction<totalsItem[]>>;
  setCarbsList: Dispatch<SetStateAction<totalsItem[]>>;
}

function SelectedProducts({ product }: Props) {
  const { name, protein } = product;
  const [quantity, setQuantity] = useState<string>('1');
  const [editMode, setEditMode] = useState<boolean>(false);

  const updateValues = (e: ChangeEvent<HTMLInputElement>) => {
    setQuantity(e.target.value);
  };
  const onfocus = () => {
    setEditMode(true);
  };
  const onBlur = () => {
    setEditMode(false);
  };
  const getFormattedQuantity = (): number => {
    const formattedQuantity: number = isNaN(Number(quantity)) ? 0 : Number(quantity);
    //@ts-ignore
    return formattedQuantity.toFixed(2);
  };

  const getTotalProtein = () => {
    return (getFormattedQuantity() * protein).toFixed(2);
  };
  return (
    <tr className="selected-product">
      <td>
        {/*<Suspense fallback={<span>Loading...</span>}>*/}
        {/*  <LazyLoadedIcon />*/}
        {/*</Suspense>{' '}*/}
        {name}
      </td>
      <td id="units">
        <select name="units-select">
          <option value="gr">gr</option>
          <option value="tsp">tsp</option>
          <option value="tbsp">tbsp</option>
          <option value="cup">cup</option>
        </select>
      </td>
      <td id="quantity">
        {editMode ? (
          <input
            onFocus={onfocus}
            onBlur={onBlur}
            type="number"
            inputMode="decimal"
            min={0}
            value={String(quantity)}
            placeholder="1"
            id="quantity-input"
            autoComplete="off"
            onChange={updateValues}
          />
        ) : (
          <div onFocus={onfocus} onClick={onfocus} onTouchStart={onfocus}>
            {getFormattedQuantity()}
          </div>
        )}
      </td>
      <td className="calculated-protein">{getTotalProtein()}</td>
      <td className="calculated-carbs">{getTotalProtein()}</td>
    </tr>
  );
}

export default SelectedProducts;
