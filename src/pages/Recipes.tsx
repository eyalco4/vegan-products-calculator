import React, { Dispatch, Fragment, SetStateAction, useEffect } from 'react';
import 'src/pages/Recipes.css';
import { IUser } from 'src/common/types';
import Button from 'src/components/Button';
interface Props {
  setPage: Dispatch<SetStateAction<string>>;
  setUser: (user: any) => void;
  user: IUser;
}

function Recipes({ user, setPage }: Props) {
  return (
    <Fragment>
      <div className="recipes-w flex-col">
        <h2>Welcome Back {user.given_name}</h2>
        <div>You have no saved recipes</div>
        <div className="buttons-wrapper flex-col">
          <Button text="Create new recipe" callback={() => setPage('create')} />
        </div>
      </div>
    </Fragment>
  );
}

export default Recipes;
