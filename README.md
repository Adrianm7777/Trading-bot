Trading Bot
A Python-based trading bot that automatically buys and sells stocks based on a predefined trading strategy and machine learning predictions.

Features
Fetches daily stock prices using the Alpha Vantage API.
Implements a simple trading strategy based on moving averages.
Logs transactions and maintains a history of trades.
Utilizes a Random Forest model to predict future stock prices based on historical data.
Visualizes predicted prices versus actual prices.
Technologies Used
Python 3.x: Main programming language.
Pandas: Data manipulation and analysis.
Scikit-learn: Machine learning library for model training and evaluation.
Matplotlib: Visualization of predictions against actual prices.
Requests: API calls to fetch stock market data.
dotenv: Manage environment variables.
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/Adrianm7777/trading-bot.git
cd trading-bot
Install required packages:

bash
Copy code
pip install pandas requests scikit-learn matplotlib python-dotenv
Create a .env file in the root directory and add your Alpha Vantage API key:

makefile
Copy code
API_KEY=your_alpha_vantage_api_key
Usage
Run the bot:

bash
Copy code
python trading_bot.py
The bot will:

Fetch stock price data for the specified symbol.
Calculate moving averages and check trading signals.
Execute trades based on the trading strategy.
Train the machine learning model and predict future prices.
Visualize the results.
Configuration
You can customize the trading symbol by changing the symbol variable in the code (e.g., symbol = "AAPL").
Adjust trading parameters and strategy in the check_signal function.
Contributing
Feel free to submit issues or pull requests if you want to contribute to the project!

License
This project is licensed under the MIT License. See the LICENSE file for more details.
