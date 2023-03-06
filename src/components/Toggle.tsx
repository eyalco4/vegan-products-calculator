import React, { Fragment } from 'react';
import 'src/components/Toggle.css';

interface Props {
  disabled?: boolean;
  isOn?: boolean;
  setIsOn: (value: boolean) => void;
}
function Toggler({ disabled = true, isOn, setIsOn }: Props) {
  return (
    <Fragment>
      <div
        className={`toggle-wrapper ${disabled ? 'disabled' : isOn ? 'on' : 'off'}`}
        onClick={() => (disabled ? null : setIsOn(!isOn))}
      >
        <div className="off-w">
          <span className={`toggle-circle ${isOn ? 'hidden' : 'visible'}`} />
        </div>
        <div className="on-w">
          <span className={`toggle-circle ${isOn ? 'visible' : 'hidden'}`} />
        </div>
      </div>
    </Fragment>
  );
}

export default Toggler;
