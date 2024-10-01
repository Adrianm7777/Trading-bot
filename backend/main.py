import os
import pandas as pd
import requests
import time
from dotenv import load_dotenv
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
import matplotlib.pyplot as plt

# Funkcja do pobierania danych giełdowych
def get_stock_data(symbol):
    load_dotenv()
    API_KEY = os.getenv("API_KEY")
    symbol = "AAPL"
    url = f'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol={symbol}&apikey={API_KEY}'
    response = requests.get(url)
    data = response.json()
    prices = data['Time Series (Daily)']
    df = pd.DataFrame.from_dict(prices, orient="index")
    df = df.astype(float)
    return df

# Funkcja do dodawania wskaźników technicznych
def add_technical_indicators(df):
    df['SMA_5'] = df['4. close'].rolling(window=5).mean()
    df['SMA_10'] = df['4. close'].rolling(window=10).mean()
    df.dropna(inplace=True)
    return df

# Funkcja do generowania sygnału kupna/sprzedaży
def check_signal(df):
    if df["SMA_5"].iloc[-1] > df["SMA_10"].iloc[-1]:
        return 'buy'
    else:
        return 'sell'

# Funkcja do symulacji transakcji
def trade(signal, stock_price, balance, holdings):
    if signal == "buy" and balance >= stock_price:
        holdings += 1
        balance -= stock_price
        print(f"Bought 1 stock at {stock_price}, new balance: {balance}, holdings: {holdings}")
    elif signal == "sell" and holdings > 0:
        holdings -= 1
        balance += stock_price
        print(f"Sold 1 stock at {stock_price}, new balance: {balance}, holdings: {holdings}")
    else:
        print("No trade executed")
    return balance, holdings

# Funkcja do logowania transakcji
def log_transaction(transaction, date, signal, stock_price, balance, holdings):
    transaction.append({
        "Date": date,
        "Action": signal,
        "Price": stock_price,
        "Balance": balance,
        "Holdings": holdings
    })

    payload = {
         "Date": date,
        "Action": signal,
        "Price": stock_price,
        "Balance": balance,
        "Holdings": holdings

    }

    response = requests.post("http://localhost:8000/transactions/", json=payload)
    if response.status_code == 201:
        print("Transaction logged successfully")
    else:
        print("Failed to log transaction")
    return pd.DataFrame(transaction)

# Funkcja do trenowania modelu RandomForest
def train_model(df):
    X = df[["SMA_5", "SMA_10"]]
    y = df["4. close"].shift(-1)
    X = X[:-1]
    y = y.dropna()
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    score = model.score(X_test, y_test)
    
    predictions = model.predict(X_test)
    
    print(f"Model accuracy: {score:.2f}")
    plot_predictions(y_test, predictions)
    
    return {
        "real": y_test.tolist(),
        "predicted": predictions.tolist(),
        "accuracy": score
    }

# Funkcja do tworzenia wykresu
def plot_predictions(y_test, predictions):
    plt.figure(figsize=(10, 6))
    plt.plot(y_test.values, label="Real Price")
    plt.plot(predictions, label="Predicted Price")
    plt.legend()
    plt.title("Comparison of Real and Predicted Prices")
    plt.show()

# Główna funkcja realizująca strategię tradingową i prognozy
def main():
    symbol = "AAPL"
    stock_price = 150
    balance = 1000
    holdings = 0
    transaction = []
    
    df = get_stock_data(symbol)
    df = add_technical_indicators(df)
    
    while True:
        signal = check_signal(df)
        balance, holdings = trade(signal, stock_price, balance, holdings)
        df_transaction = log_transaction(transaction, time.strftime("%Y-%m-%d %H:%M:%S"), signal, stock_price, balance, holdings)
        
        train_model(df)
        
        time.sleep(60)

# Uruchomienie głównej funkcji
if __name__ == "__main__":
    main()