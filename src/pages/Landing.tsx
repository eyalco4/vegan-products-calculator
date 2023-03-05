import React, { Dispatch, SetStateAction, useEffect } from 'react';
import 'src/pages/Landing.css';
import Button from 'src/components/Button';
import Leaf from 'src/components/icons/Leaf';
import NumberOne from 'src/components/icons/NumberOne';
import KeepTrack from 'src/components/icons/KeepTrack';

interface Props {
  isSignedIn: boolean;
  setPage: Dispatch<SetStateAction<string>>;
  setIsSignedIn: (isSignedIn: boolean) => void;
}
function Landing({ setIsSignedIn, isSignedIn, setPage }: Props) {
  function handleGoogleLogin(response: any) {
    console.info(response.credential);
    setIsSignedIn(true);
    setPage('create');
  }

  useEffect(() => {
    window.onload = function () {
      // @ts-ignore
      if (typeof google !== undefined) {
        // @ts-ignore
        google.accounts.id.initialize({
          client_id: '191353798101-ltkev9lo0kr3uqo4iuipq7b4p9croagc.apps.googleusercontent.com',
          callback: handleGoogleLogin,
        });

        // @ts-ignore
        typeof google !== undefined &&
          // @ts-ignore
          google.accounts.id.renderButton(document.getElementById('sign-in-with-google'), {
            theme: 'filled_black',
            size: 'large',
            width: '340px',
            locale: 'en_us',
          });
      }

      // @ts-ignore
      // google.accounts.id.prompt();
    };
  }, []);
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
        {isSignedIn ? (
          <Button text="View saved recipes" callback={() => console.info('hey', 2)} />
        ) : (
          <Button text="Sign in to view saved recipes" callback={() => console.info('hey', 2)} />
        )}
        <span className="or flex-row">
          <hr />
          OR
          <hr />
        </span>
        {/*<div id="sign-in-with-google"></div>*/}
        <Button text="Create new recpie" callback={() => setPage('create')} />
      </div>
    </div>
  );
}

export default Landing;
