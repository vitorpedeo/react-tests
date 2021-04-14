import { useState } from 'react';

import './App.css';

export const replaceCamelWithSpaces = colorName => {
  return colorName.replace(/\B([A-Z])\B/g, ' $1');
};

const App = () => {
  const [color, setColor] = useState('MediumVioletRed');
  const [disabled, setDisabled] = useState(false);

  const changeButtonStyle = () => {
    if (color === 'MediumVioletRed') {
      setColor('MidnightBlue');
    } else {
      setColor('MediumVioletRed');
    }
  }; 

  const buttonText = `Change to ${color === 'MediumVioletRed' ? 'MidnightBlue' : 'MediumVioletRed'}`; 

  return (
    <div className="App" >
      <button type="button" onClick={changeButtonStyle} style={{ background: disabled ? 'gray' : color }} disabled={disabled} >
        {replaceCamelWithSpaces(buttonText)}
      </button>
      <div>
        <input type="checkbox" id="disable-button" checked={disabled} aria-checked={disabled} onChange={() => setDisabled(!disabled)} />
        <label htmlFor="disable-button" >Disable button</label>
      </div>
    </div>
  );
}

export default App;
