import React from 'react';
import 'src/components/Button.css';
interface Props {
  callback: () => void;
  text: string;
  margin?: string;
  theme?: string;
  width?: string;
}

/*const saveToThisDevice = (selectedProducts: Array<ISelectedProduct>) => {
  localStorage.setItem('recipe', JSON.stringify(selectedProducts));
};*/
function Button({ callback, text, margin = 'auto', width, theme = 'default' }: Props) {
  return (
    <button onClick={callback} className={`button ${margin} ${theme} ${width}`}>
      {text}
    </button>
  );
}

export default Button;
