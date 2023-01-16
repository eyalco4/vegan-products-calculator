import React from 'react';
import 'src/components/Totals.css';
interface Props {
  totalProtein: string;
  totalCarbs: string;
  totalCalories: string;
}

function SelectedProducts({ totalProtein, totalCarbs, totalCalories }: Props) {
  return (
    <div className="fixed-bottom">
      <div className="totals-wrapper">
        <div className="totals protein">
          <div className="total-key">Total Protein</div>
          <div className="total-value">{totalProtein}</div>
        </div>
        <div className="totals carbs">
          <div className="total-key">Total Carbs</div>
          <div className="total-value">{totalCarbs}</div>
        </div>
        <div className="totals calories">
          <div className="total-key">Total Calories</div>
          <div className="total-value">{totalCalories}</div>
        </div>
      </div>
    </div>
  );
}

export default SelectedProducts;
