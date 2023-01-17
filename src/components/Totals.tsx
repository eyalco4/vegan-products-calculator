import React, { useEffect, useState } from 'react';
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
  return (
    <div className="fixed-bottom">
      <div className="totals-wrapper">
        <div className="totals protein">
          <div className="total-key">Total Protein</div>
          {showLoadingEffect ? (
            <div className="dot-elastic"></div>
          ) : (
            <div className="total-value">{totalProtein}</div>
          )}
        </div>
        <div className="totals carbs">
          <div className="total-key">Total Carbs</div>
          {showLoadingEffect ? (
            <div className="dot-elastic"></div>
          ) : (
            <div className="total-value">{totalCarbs}</div>
          )}{' '}
        </div>
        <div className="totals calories">
          <div className="total-key">Total Calories</div>
          {showLoadingEffect ? (
            <div className="dot-elastic"></div>
          ) : (
            <div className="total-value">{totalCalories}</div>
          )}{' '}
        </div>
      </div>
    </div>
  );
}

export default Totals;
