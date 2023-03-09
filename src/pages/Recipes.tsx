import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import 'src/pages/Recipes.css';
import { IStoredRecpie, IUser } from 'src/common/types';
import PageWrapper from 'src/components/PageWrapper';
import Button from 'src/components/Button';
import Delete from 'src/components/icons/Delete';
import { getStoredValues, deleteStoredRecpie } from 'src/common/storage';
import { formatNumber } from 'src/common/utils';
interface Props {
  setPage: Dispatch<SetStateAction<string>>;
  setUser: (user: IUser) => void;
  user: IUser;
}

function Recipes({ user, setPage }: Props) {
  const [storedRecpies, setStoredRecpies] = useState<IStoredRecpie[] | []>([]);
  useEffect(() => {
    const storedData = getStoredValues() || [];
    setStoredRecpies(storedData);
  }, []);

  const clearStoredValue = (stroredRecpie: IStoredRecpie) => {
    console.info(stroredRecpie);
  };
  const deleteStoredRecpieAndUpdateState = (stroredRecpie: IStoredRecpie) => {
    const updatedData: IStoredRecpie[] = deleteStoredRecpie(stroredRecpie);
    setStoredRecpies(updatedData);
  };
  const getContent = () => {
    if (storedRecpies.length === 0) {
      return <div>You have no saved recipes</div>;
    }
    return (
      <div className="recpies-w">
        {storedRecpies.map((stroredRecpie: IStoredRecpie) => {
          const { name, meals, totalProtein, totalCarbs, totalCalories } = stroredRecpie;
          return (
            <div className="recipe flex-col recipe-header-w" key={name}>
              <div className="flex-row">
                <div className="flex-col justify-center">
                  <h4 className="recipe-name">{name}</h4>
                </div>
                <div className="flex-col justify-center">
                  <span
                    className="edit-recipe pointer"
                    onClick={() => clearStoredValue(stroredRecpie)}
                  >
                    Edit
                  </span>
                </div>
                <span
                  className="delete-recipe pointer"
                  onClick={() => deleteStoredRecpieAndUpdateState(stroredRecpie)}
                >
                  <Delete />
                </span>
              </div>
              <div className="flex-row recipe-values">
                <div className="flex-col">
                  <span className="value-header">meals</span>
                  <span>{meals}</span>
                </div>
                <div className="flex-col">
                  <span className="value-header">protein</span>
                  <span>{formatNumber(Number(totalProtein))}</span>
                </div>
                <div className="flex-col">
                  <span className="value-header">carbs</span>
                  <span>{formatNumber(Number(totalCarbs))}</span>
                </div>
                <div className="flex-col">
                  <span className="value-header">calories</span>
                  <span>{formatNumber(Number(totalCalories))}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <PageWrapper>
      <>
        <div className="recpies-top">
          <h2>Your Saved Recipes {user?.given_name}</h2>
          {getContent()}
        </div>
        <div className="recipe-page-btn-w flex-col">
          <Button text="Create new recipe" callback={() => setPage('create')} />
        </div>
      </>
    </PageWrapper>
  );
}

export default Recipes;
