"use client";
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  getPortfolio,
  getTransaction,
  getPredictions,
  getRunBot,
} from "./services/getServerSideProps";
import { ITransaction, IPortfolio, IPrediction } from "./types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [portfolio, setPortfolio] = useState<IPortfolio[]>([]);
  const [predictions, setPredictions] = useState<IPrediction[]>([]);
  const [botStatus, setBotStatus] = useState<string>("");

  const fetchTransactions = async () => {
    const transactionsData = await getTransaction();
    setTransactions(transactionsData);
  };

  const fetchPortfolio = async () => {
    const portfolioData = await getPortfolio();
    setPortfolio(portfolioData);
  };

  const fetchPredictions = async () => {
    const predictionsData = await getPredictions();
    setPredictions(predictionsData);
  };
  const runBot = async () => {
    try {
      const response = await getRunBot();
      if (response) {
        setBotStatus("Bot started successfully!");
      } else {
        setBotStatus("Failed to start the bot.");
      }
    } catch (error) {
      setBotStatus("An error occurred while starting the bot.");
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchPortfolio();
    fetchPredictions();

    const interval = setInterval(() => {
      fetchTransactions();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Chart data
  const chartData = {
    labels: predictions.map((_, index) => `Prediction ${index + 1}`),
    datasets: [
      {
        label: "Real Price",
        data: predictions.map((prediction) => prediction.real),
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
      {
        label: "Predicted Price",
        data: predictions.map((prediction) => prediction.predicted_price),
        fill: false,
        borderColor: "rgba(255,99,132,1)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 relative">
      <header className="bg-gray-800 text-white p-6 text-center">
        <h1 className="text-3xl font-bold">TradingBot Dashboard</h1>
      </header>

      <main className="p-6">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Start Trading Bot</h2>
          <div className="bg-white p-4 rounded-lg shadow-md flex justify-center flex-col items-center">
            <button
              onClick={runBot}
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 w-[10%]"
            >
              Play
            </button>
            {botStatus && <p className="mt-4">{botStatus}</p>}
          </div>
        </section>
        {/* Portfolio Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Portfolio</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {portfolio.length > 0 ? (
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold">Total Balance</h3>
                <p className="text-xl font-bold">${portfolio[0].balance}</p>
                <p>Holdings: {portfolio[0].holdings}</p>
              </div>
            ) : (
              <p>Loading portfolio data...</p>
            )}
          </div>
        </section>

        {/* Recent Transactions Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Recent Transactions</h2>
          <div className="bg-white p-4 rounded-lg shadow-md">
            {transactions.length > 0 ? (
              <ul>
                {transactions.map((transaction) => (
                  <li key={transaction.id}>
                    {transaction.action}: ${transaction.price?.toFixed(2) || 0}{" "}
                    at {transaction.date}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No recent transactions.</p>
            )}
          </div>
        </section>

        {/* Predictions Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Price Predictions</h2>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <Line data={chartData} />
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
