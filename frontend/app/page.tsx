"use server";

import { getPortfolio, getTransaction } from "./services/getServerSideProps";
import { ITransaction } from "./types";

const Dashboard = async () => {
  const portfolio = await getPortfolio();
  const transactions = await getTransaction();
  console.log(portfolio);
  console.log(transactions);
  return (
    <div className="min-h-screen bg-gray-100 relative">
      <header className="bg-gray-800 text-white p-6 text-center">
        <h1 className="text-3xl font-bold">TradingBot Dashboard</h1>
      </header>

      <main className="p-6">
        {/* Portfolio Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Portfolio</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">Total Balance</h3>
              <p className="text-xl font-bold">${portfolio?.balance}</p>
              <p>Holdings: {portfolio?.holdings}</p>
            </div>
          </div>
        </section>

        {/* Recent Transactions Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Recent Transactions</h2>
          <div className="bg-white p-4 rounded-lg shadow-md">
            {transactions?.length > 0 ? (
              <ul>
                {transactions.map((transaction: ITransaction) => (
                  <li key={transaction.id}>
                    {transaction?.action}: $
                    {transaction?.price?.toFixed(2) || 0} at {transaction?.date}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No recent transactions.</p>
            )}
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white text-center p-4 absolute bottom-0 w-full">
        <p>© 2024 TradingBot</p>
      </footer>
    </div>
  );
};

export default Dashboard;
