import React, { Dispatch, Fragment, SetStateAction, useEffect } from 'react';
import 'src/pages/Login.css';
interface Props {
  setPage: Dispatch<SetStateAction<string>>;
  setIsSignedIn: (isSignedIn: boolean) => void;
}

function Create({ setPage, setIsSignedIn }: Props) {
  function handleGoogleLogin(response: any) {
    console.info(response.credential);
    setIsSignedIn(true);
    setPage('Landing');
  }
  useEffect(() => {
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
          theme: 'filled_blue',
          size: 'large',
          width: '340px',
          locale: 'en_us',
        });
    }

    // @ts-ignore
    // google.accounts.id.prompt();
  }, []);
  return (
    <Fragment>
      <div className="login-wrapper flex-col">
        <div id="sign-in-with-google"></div>
      </div>
    </Fragment>
  );
}

export default Create;
