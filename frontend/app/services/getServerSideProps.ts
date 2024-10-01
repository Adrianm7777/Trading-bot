export async function getTransaction() {
  const transactionsRes = await fetch("http://localhost:8000/transactions/");
  if (!transactionsRes.ok) {
    throw new Error("Failed to fetch transactions");
  }
  const transactions = await transactionsRes.json();
  return transactions;
}

export async function getPortfolio() {
  const portfolioRes = await fetch("http://localhost:8000/portfolio/");
  if (!portfolioRes.ok) {
    throw new Error("Failed to fetch portfolio");
  }
  const portfolio = await portfolioRes.json();
  return portfolio;
}
