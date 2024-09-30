// import { IPortfolio, ITransaction } from "../types";

export async function getTransaction() {
  // Fetch transactions
  const transactionsRes = await fetch("http://localhost:8000/transactions/");
  if (!transactionsRes.ok) {
    throw new Error("Failed to fetch data");
  }
  console.log(transactionsRes);

  return transactionsRes.json();
}
// Fetch portfolio
export async function getPortfolio() {
  const portfolioRes = await fetch("http://localhost:8000/portfolio/");
  if (!portfolioRes.ok) {
    throw new Error("Failed to fetch data");
  }
  console.log(portfolioRes);

  return portfolioRes.json();
}
