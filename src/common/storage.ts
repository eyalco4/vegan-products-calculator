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
