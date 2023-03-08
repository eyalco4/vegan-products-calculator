import { IStoredRecpie } from 'src/common/types';

export const getStoredValues = (): IStoredRecpie[] | null => {
  const stringifyCurrentStorage: string | null = localStorage.getItem('vegan-recipes');
  //@ts-ignore
  const currentStorage: IStoredRecpie[] | null = JSON.parse(stringifyCurrentStorage);
  return currentStorage;
};
export const saveToDevice = (recpieToStore: IStoredRecpie) => {
  let stringifyValueToStore: string = JSON.stringify([recpieToStore]);
  try {
    const currentStorage = getStoredValues();
    if (currentStorage) {
      currentStorage?.push(recpieToStore);
      stringifyValueToStore = JSON.stringify(currentStorage);
    }
  } catch (e) {
    console.info(`error`, e);
  }
  localStorage.setItem('vegan-recipes', stringifyValueToStore);
};

export const deleteStoredRecpie = (recpieToDelete: IStoredRecpie) => {
  const currentStorage = getStoredValues();
  const updatedStorage = currentStorage?.filter(
    (item: IStoredRecpie) => item.name !== recpieToDelete.name
  );
  console.info(updatedStorage);
  localStorage.setItem('vegan-recipes', JSON.stringify(updatedStorage));
};
