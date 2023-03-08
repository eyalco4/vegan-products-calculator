import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import BouncingLoader from 'src/components/BouncingLoader';
import 'src/components/Totals.css';
import { isiOS, isSafari, formatNumber } from 'src/common/utils';
interface Props {
  setMeals: Dispatch<SetStateAction<number>>;
  meals: number;
  totalProtein: number;
  totalCarbs: number;
  totalCalories: number;
}

function Totals({ totalProtein, totalCarbs, totalCalories, setMeals, meals }: Props) {
  const [showLoadingEffect, setShowLoadingEffect] = useState(true);
  useEffect(() => {
    setShowLoadingEffect(true);
    setTimeout(() => {
      setShowLoadingEffect(false);
    }, 2000);
  }, [totalCalories, meals]);
  const onSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const {
      target: { value },
    } = e;
    setMeals(Number(value));
  };
  const getContent = (propertyName: string, propertyValue: number) => {
    const calculatedValue = (propertyValue / meals).toFixed(2);
    const formatedValue = formatNumber(Number(calculatedValue));
    return (
      <div className="totals">
        <div className={`total-key ${propertyName}`}>Total {propertyName.toUpperCase()}</div>
        {showLoadingEffect ? (
          <BouncingLoader />
        ) : (
          <div className="total-value">{formatedValue}</div>
        )}
      </div>
    );
  };

  const renderOptions = () => {
    const options = [];
    for (let i = 1; i < 21; i++) {
      options.push(<option value={i}>{i}</option>);
    }
    return options;
  };
  return (
    <div className="totals-w">
      <div className="divid">
        Number of meals
        <select
          name="meals-scale"
          onChange={onSelect}
          value={meals}
          className={isiOS() || isSafari() ? 'select-ios' : ''}
        >
          {renderOptions()}
        </select>
      </div>
      <div className="totals-wrapper">
        {getContent('protein', totalProtein)}
        {getContent('carbs', totalCarbs)}
        {getContent('calories', totalCalories)}
      </div>
    </div>
  );
}

export default Totals;
