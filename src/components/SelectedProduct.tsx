import React, { useState, useEffect, ChangeEvent } from 'react';
import 'src/components/SelectedProduct.css';
import { ISelectedProduct_temp, IUnits } from 'src/common/types';
import Toggler from 'src/components/Toggle';
import Delete from 'src/components/icons/Delete';
import { calculateValue, isiOS, isSafari } from 'src/utils';

interface Props {
  selectedProduct: ISelectedProduct_temp;
  onTotalsUpdate: (
    categoryIndex: number,
    productIndex: number,
    totalProtein: number,
    totalCarbs: number,
    totalCalories: number
  ) => void;
  onProductRemoval: (categoryIndex: number, productIndex: number) => void;
}

function SelectedProduct({ selectedProduct, onTotalsUpdate, onProductRemoval }: Props) {
  const { product, categoryIndex, productIndex } = selectedProduct;
  const { name, cookedFactor = 1, gr, ml, kg, tsp, tbsp, cup } = product;
  const [quantity, setQuantity] = useState<string>('100');
  const [units, setUnits] = useState<IUnits>(gr ? 'gr' : 'ml');
  const [isTogglerOn, setIsOn] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    const protein = product[units]?.protein || 0;
    const carbs = product[units]?.carbs || 0;
    const calories = product[units]?.calories || 0;
    const factor = isTogglerOn ? cookedFactor : 1;
    const newTotalProtein = calculateValue(protein, Number(quantity), units, factor);
    const newTotalCarbs = calculateValue(carbs, Number(quantity), units, factor);
    const newTotalCalories = calculateValue(calories, Number(quantity), units, factor);
    onTotalsUpdate(categoryIndex, productIndex, newTotalProtein, newTotalCarbs, newTotalCalories);
  }, [quantity, units, isTogglerOn]);
  const updateValues = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const enforcedValue: string =
      Number(e.target.value) > 1000 ? '1000' : Number(e.target.value) < 0 ? '0' : e.target.value;
    setQuantity(enforcedValue);
    // setSelectedProducts.map(p => p.product !== bb ? p: {product: bb.product, totalProtein:10, totalCarbs: 9})
  };

  const onSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const {
      target: { value },
    } = e;
    switch (value) {
      case 'gr':
      case 'ml':
        setQuantity('100');
        break;
      default:
        setQuantity('1');
        break;
    }
    //@ts-ignore
    setUnits(value);
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
    return ['gr', 'ml'].includes(units) ? formattedQuantity : formattedQuantity.toFixed(2);
  };

  const isToggerDisabled: boolean = cookedFactor && cookedFactor > 1 ? false : true;

  return (
    <tr className="selected-product">
      <td>{name}</td>
      <td className="cooked">
        <Toggler disabled={isToggerDisabled} setIsOn={setIsOn} isOn={isTogglerOn} />
      </td>
      <td id="units">
        <select
          name="units-select"
          onChange={onSelect}
          value={units}
          className={isiOS() || isSafari() ? 'select-ios' : ''}
        >
          {gr && <option value="gr">gr</option>}
          {ml && <option value="ml">ml</option>}
          {kg && <option value="kg">kg</option>}
          {tsp && <option value="tsp">tsp</option>}
          {tbsp && <option value="tbsp">tbsp</option>}
          {cup && <option value="cup">cup</option>}
        </select>
      </td>
      {editMode ? (
        <td className="quantity edit">
          <input
            onFocus={onfocus}
            onBlur={onBlur}
            onMouseLeave={onBlur}
            type="text"
            min={0}
            max={1000}
            value={String(quantity)}
            placeholder="1"
            id="quantity-input"
            autoComplete="off"
            onChange={updateValues}
          />
        </td>
      ) : (
        <td className="quantity">
          <div onFocus={onfocus} onClick={onfocus} onTouchStart={onfocus}>
            {getFormattedQuantity()}
          </div>
        </td>
      )}
      <td>
        <span className="clear" onClick={() => onProductRemoval(categoryIndex, productIndex)}>
          <Delete />
        </span>
        <span></span>
      </td>
    </tr>
  );
}

export default SelectedProduct;
