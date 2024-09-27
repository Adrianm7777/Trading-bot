export interface IPortfolio {
  total_balance: number;
}

export interface ITransaction {
  id: number;
  description: string;
  amount: number;
}

export interface IDashboardProps {
  portfolio: IPortfolio;
  transactions: ITransaction[];
  predictions: Array<{
    id: number;
    prediction: string;
  }>;
}
