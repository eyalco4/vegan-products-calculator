type measure = {
  protein: number;
  carbs: number;
};

export type units = 'gr' | 'tsp' | 'tbsp' | 'cup';
export interface IProduct {
  name: string;
  gr?: measure;
  tsp?: measure;
  tbsp?: measure;
  cup?: measure;
}

export interface ISelectedProduct {
  product: IProduct;
  selected: boolean;
  totalProtein: number;
  totalCarbs: number;
}
