import React, { Dispatch, Fragment, SetStateAction } from 'react';
import 'src/pages/Recipes.css';
import { IUser } from 'src/common/types';
import Button from 'src/components/Button';
import PageWrapper from 'src/components/PageWrapper';
interface Props {
  setPage: Dispatch<SetStateAction<string>>;
  setUser: (user: IUser) => void;
  user: IUser;
}

function Recipes({ user, setPage }: Props) {
  return (
    <PageWrapper>
      <>
        <div>
          <h2>Welcome Back {user.given_name}</h2>
          <div>You have no saved recipes</div>
        </div>
        <div className="buttons-wrapper flex-col">
          <Button text="Create new recipe" callback={() => setPage('create')} />
        </div>
      </>
    </PageWrapper>
  );
}

export default Recipes;
