type measure = {
  protein: number;
  carbs: number;
  calories: number;
};

export type units = 'gr' | 'kg' | 'tsp' | 'tbsp' | 'cup';
export interface IProduct {
  name: string;
  cookedFactor?: number;
  gr?: measure;
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
