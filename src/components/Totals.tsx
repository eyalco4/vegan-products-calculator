import React, { ChangeEvent, useEffect, useState } from 'react';
import BouncingLoader from 'src/components/BouncingLoader';
import 'src/components/Totals.css';
interface Props {
  totalProtein: string;
  totalCarbs: string;
  totalCalories: string;
}

function Totals({ totalProtein, totalCarbs, totalCalories }: Props) {
  const [showLoadingEffect, setShowLoadingEffect] = useState(true);
  const [meals, setMeals] = useState('1');
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
    setMeals(value);
  };
  const getContent = (propertyName: string, propertyValue: string) => {
    const calculatedValue = (Number(propertyValue) / Number(meals)).toFixed(2);
    return (
      <div className={`totals ${propertyName}`}>
        <div className="total-key">Total {propertyName.toUpperCase()}</div>
        {showLoadingEffect ? (
          <BouncingLoader />
        ) : (
          <div className="total-value">{calculatedValue}</div>
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
    <div className="fixed-bottom">
      <div className="divid">
        Number of meals
        <select name="meals-scale" onChange={onSelect} value={meals}>
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
