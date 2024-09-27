export async function getServerSideProps() {
  const [portfolioRes, transactionsRes, predictionsRes] = await Promise.all([
    fetch("http://localhost:8000/api/portfolio/"),
    fetch("http://localhost:8000/api/transactions/"),
    fetch("http://localhost:8000/api/predictions/"),
  ]);

  const portfolio = await portfolioRes.json();
  const transactions = await transactionsRes.json();
  const predictions = await predictionsRes.json();

  return {
    props: {
      portfolio: portfolio[0] || { total_balance: 0 }, // Default if portfolio is empty
      transactions,
      predictions,
    },
  };
}
