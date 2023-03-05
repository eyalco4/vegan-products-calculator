import React from 'react';
import 'src/components/Button.css';
interface Props {
  callback: () => void;
  text: string;
  margin?: string;
  theme?: string;
}

/*const saveToThisDevice = (selectedProducts: Array<ISelectedProduct>) => {
  localStorage.setItem('recipe', JSON.stringify(selectedProducts));
};*/
function Button({ callback, text, margin = 'auto', theme = 'default' }: Props) {
  return (
    <button onClick={callback} className={`button ${margin} ${theme}`}>
      {text}
    </button>
  );
}

export default Button;
