import React from 'react';
import 'src/components/Button.css';
interface Props {
  callback: () => void;
  text: string;
  margin?: string;
  theme?: string;
  size?: string;
}

/*const saveToThisDevice = (selectedProducts: Array<ISelectedProduct>) => {
  localStorage.setItem('recipe', JSON.stringify(selectedProducts));
};*/
function Button({ callback, text, size = 'large', theme = 'default' }: Props) {
  return (
    <button onClick={callback} className={`button ${size} ${theme}`}>
      {text}
    </button>
  );
}

export default Button;
