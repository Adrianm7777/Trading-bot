export async function getTransaction() {
  const transactionsRes = await fetch(
    "http://localhost:8000/api/transactions/"
  );
  if (!transactionsRes.ok) {
    throw new Error("Failed to fetch transactions");
  }
  const transactions = await transactionsRes.json();
  return transactions;
}

export async function getPortfolio() {
  const portfolioRes = await fetch("http://localhost:8000/api/portfolio/");
  if (!portfolioRes.ok) {
    throw new Error("Failed to fetch portfolio");
  }
  const portfolio = await portfolioRes.json();
  return portfolio;
}
export async function getPredictions() {
  const predictionsRes = await fetch("http://localhost:8000/api/predictions/");
  if (!predictionsRes.ok) {
    throw new Error("Failed to fetch predictions");
  }
  const predictions = await predictionsRes.json();
  console.log(predictions);

  return predictions;
}
