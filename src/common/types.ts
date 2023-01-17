type measure = {
  protein: number;
  carbs: number;
  calories: number;
};

export type units = 'gr' | 'ml' | 'kg' | 'tsp' | 'tbsp' | 'cup';
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
