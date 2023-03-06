import React, { Dispatch, Fragment, SetStateAction, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import 'src/pages/Login.css';
import Button from 'src/components/Button';
interface Props {
  setPage: Dispatch<SetStateAction<string>>;
  setUser: (user: any) => void;
}

type LoginResponse = {
  credential: string;
};

function Login({ setPage, setUser }: Props) {
  function handleGoogleLogin(response: LoginResponse) {
    const user = jwt_decode(response.credential);
    console.info(user);
    setUser(user);
    setPage('recipes');
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
        <Button text="Back" callback={() => setPage('Landing')} />
      </div>
    </Fragment>
  );
}

export default Login;
