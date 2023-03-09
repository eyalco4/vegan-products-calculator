import React, { Dispatch, SetStateAction } from 'react';
import 'src/pages/Landing.css';
import Button from 'src/components/Button';
import Leaf from 'src/components/icons/Leaf';
import NumberOne from 'src/components/icons/NumberOne';
import KeepTrack from 'src/components/icons/KeepTrack';
import StayFit from 'src/components/icons/StayFit';
import PageWrapper from '../components/PageWrapper';

interface Props {
  user: undefined | object;
  setPage: Dispatch<SetStateAction<string>>;
}
function Landing({ user, setPage }: Props) {
  return (
    <PageWrapper>
      <>
        <div className="header flex-col">
          <Leaf />
          <h1>Vegan Producs</h1>
        </div>
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
            <div className="icon-text">Stay Fit</div>
            <StayFit />
          </div>
        </div>
        <div className="buttons-w flex-col">
          {user ? (
            <Button text="View saved recipes" callback={() => setPage('recipes')} />
          ) : (
            <Button text="View saved recipes" callback={() => setPage('recipes')} />
          )}
          <span className="or flex-row">
            <hr />
            OR
            <hr />
          </span>
          <Button text="Create New recipe" callback={() => setPage('create')} />
        </div>
      </>
    </PageWrapper>
  );
}

export default Landing;
