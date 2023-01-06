import React, { useState, useEffect, ChangeEvent } from 'react';
import './SelectedProduct.css';
import { ISelectedProduct, units } from 'src/common/types';
interface Props {
  selectedProduct: ISelectedProduct;
  onTotalsUpdate: (productNameToUpdate: string, totalProtein: number, totalCarbs: number) => void;
}

function SelectedProducts({ selectedProduct, onTotalsUpdate }: Props) {
  const { product, totalProtein, totalCarbs } = selectedProduct;
  const { name, gr, tsp, tbsp, cup } = product;
  const [quantity, setQuantity] = useState<string>('1');
  const [units, setUnits] = useState<units>('gr');
  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    const protein = product[units]?.protein || 0;
    const carbs = product[units]?.carbs || 0;
    const newTotalProtein = Number((getFormattedQuantity() * protein).toFixed(2));
    const newTotalCarbs = Number((getFormattedQuantity() * carbs).toFixed(2));
    onTotalsUpdate(name, newTotalProtein, newTotalCarbs);
    // setTotalProtein(newTotalProtein); // 👈️ this causes infinite loop
    // setTotalCarbs(newTotalCarbs); // 👈️ this causes infinite loop
  }, [quantity, units]);
  const updateValues = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setQuantity(e.target.value);
    // setSelectedProducts.map(p => p.product !== bb ? p: {product: bb.product, totalProtein:10, totalCarbs: 9})
  };

  const onSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    //@ts-ignore
    setUnits(e.target.value);
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

  return (
    <tr className="selected-product">
      <td>
        {/*<Suspense fallback={<span>Loading...</span>}>*/}
        {/*  <LazyLoadedIcon />*/}
        {/*</Suspense>{' '}*/}
        {name}
      </td>
      <td id="units">
        <select name="units-select" onChange={onSelect} value={units}>
          {gr && <option value="gr">gr</option>}
          {tsp && <option value="tsp">tsp</option>}
          {tbsp && <option value="tbsp">tbsp</option>}
          {cup && <option value="cup">cup</option>}
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
      <td className="protein">{totalProtein}</td>
      <td className="carbs">{totalCarbs}</td>
    </tr>
  );
}

export default SelectedProducts;
