import React, { useEffect, useState } from 'react';
import BouncingLoader from 'src/components/BouncingLoader';
import 'src/components/Totals.css';
interface Props {
  totalProtein: string;
  totalCarbs: string;
  totalCalories: string;
}

function Totals({ totalProtein, totalCarbs, totalCalories }: Props) {
  const [showLoadingEffect, setShowLoadingEffect] = useState(true);
  useEffect(() => {
    setShowLoadingEffect(true);
    setTimeout(() => {
      setShowLoadingEffect(false);
    }, 2000);
  }, [totalCalories]);

  const getContent = (propertyName: string, propertyValue: string) => {
    return (
      <div className={`totals ${propertyName}`}>
        <div className="total-key">Total {propertyName.toUpperCase()}</div>
        {showLoadingEffect ? (
          <BouncingLoader />
        ) : (
          <div className="total-value">{propertyValue}</div>
        )}
      </div>
    );
  };
  return (
    <div className="fixed-bottom">
      <div className="totals-wrapper">
        {getContent('protein', totalProtein)}
        {getContent('carbs', totalCarbs)}
        {getContent('calories', totalCalories)}
      </div>
    </div>
  );
}

export default Totals;
