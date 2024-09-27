export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gray-800 text-white p-6 text-center">
        <h1 className="text-3xl font-bold">TradingBot Dashboard</h1>
      </header>

      <main className="p-6">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Portfolio</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">Total Balance</h3>
              <p className="text-xl font-bold"></p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Recent Transactions</h2>
          <div className="bg-white p-4 rounded-lg shadow-md"></div>
        </section>

        {/* Predictions Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Market Predictions</h2>
          <div className="bg-white p-4 rounded-lg shadow-md"></div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4">
        <p>© 2024 TradingBot</p>
      </footer>
    </div>
  );
}
