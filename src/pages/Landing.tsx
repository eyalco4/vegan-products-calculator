import React from 'react';
import 'src/pages/Landing.css';
import Button from 'src/components/Button';
import Leaf from 'src/components/icons/Leaf';
import NumberOne from 'src/components/icons/NumberOne';
import KeepTrack from 'src/components/icons/KeepTrack';

function Landing() {
  return (
    <div className="Landing-wrapper flex-col">
      <div className="header flex-col">
        <Leaf />
        <h1>Vegan Producs</h1>
        <div className="icons-wrapper flex-row">
          <div className="motto flex-col">
            <div className="icon-text">Your health comes first</div>
            <NumberOne />
          </div>
          <div className="motto flex-col">
            <div className="icon-text">Keep track of what you eat</div>
            <KeepTrack />
          </div>{' '}
          <div className="motto flex-col">
            <div className="icon-text">Stay Strong</div>
            <NumberOne />
          </div>
        </div>
      </div>
      <div className="buttons-wrapper flex-col">
        <Button text="Login to view saved recipes" callback={() => console.info('hey', 1)} />
        <Button text="Create new recpie" callback={() => console.info('hey', 2)} />
      </div>
    </div>
  );
}

export default Landing;
