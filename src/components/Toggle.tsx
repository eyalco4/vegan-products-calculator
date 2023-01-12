import React, { Fragment, useState } from 'react';
import 'src/components/Toggle.css';

interface Props {
  disabled?: boolean;
  isOn?: boolean;
  setIsOn: (value: boolean) => void;
}
function Toggler({ disabled = true, isOn, setIsOn }: Props) {
  return (
    <Fragment>
      <div className={`toggle-wrapper ${disabled ? 'disabled' : isOn ? 'on' : 'off'}`}>
        <div id="off-btn" onClick={() => (disabled ? null : setIsOn(false))}>
          <span className={`toggle-circle ${isOn ? 'hidden' : 'visible'}`} />
        </div>
        <div id="on-btn" onClick={() => (disabled ? null : setIsOn(true))}>
          <span className={`toggle-circle ${isOn ? 'visible' : 'hidden'}`} />
        </div>
      </div>
    </Fragment>
  );
}

export default Toggler;
