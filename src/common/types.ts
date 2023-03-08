type measure = {
  protein: number;
  carbs: number;
  calories: number;
};

export type IUnits = 'gr' | 'ml' | 'kg' | 'tsp' | 'tbsp' | 'cup';
export interface IProduct {
  name: string;
  type: string;
  cookedFactor?: number;
  gr?: measure;
  ml?: measure;
  kg?: measure;
  tsp?: measure;
  tbsp?: measure;
  cup?: measure;
}

export interface ISelectedProduct {
  product: IProduct;
  selected: boolean;
  totalProtein: number;
  totalCarbs: number;
  totalCalories: number;
  categoryIndex: number;
  productIndex: number;
}
export interface ICategoryListItem {
  category: string;
  products: ISelectedProduct[];
}
export interface names {
  name: string;
  categoryIndex: number;
  productIndex: number;
}

export interface IFilteredSearchItem {
  category: string;
  names: names[];
}

export interface IUser {
  given_name: string;
}

export interface ISelectedProduct_temp {
  product: IProduct;
  categoryIndex: number;
  productIndex: number;
  selectedValues: {
    quantity: number;
    measure: IUnits;
    cooked: boolean;
  };

  totals: {
    protein: number;
    carbs: number;
    calories: number;
  };
}

export interface IStoredRecpie {
  name: string;
  selectedProducts: ISelectedProduct_temp[] | [];
  meals: number;
  totalProtein: number;
  totalCarbs: number;
  totalCalories: number;
}
