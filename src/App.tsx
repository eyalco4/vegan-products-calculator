import React, { useState } from 'react';
import Search from './components/Search';
import './App.css';

function App() {
  const [text, setText] = useState('');
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setText(event.target.value);
  }
  return (
    <div className="App ">
      <header className="App-header">Vegan Products calculator</header>
      <Search value={text} onChange={handleChange} />
      <p>You typed: {text ? text : '...'}</p>
    </div>
  );
}

export default App;
