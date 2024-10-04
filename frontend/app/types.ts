export interface IPortfolio {
  balance: number;
  holdings: number;
}

export interface ITransaction {
  id: number;
  action: string;
  price: number;
  date: string;
  balance: number;
  holdings: number;
}

export interface IDashboardProps {
  portfolio: IPortfolio;
  transactions: ITransaction[];
  predictions: IPrediction[];
}

export interface IPrediction {
  id: number;
  real: number;
  predicted_price: number;
  accuracy: number;
}
