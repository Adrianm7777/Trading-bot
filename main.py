import pandas as pd
import requests

API_KEY="25IO3T1D8V69J8DM"

symbol="AAPL"

url = f'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol={symbol}&apikey={API_KEY}'

response = requests.get(url)

data = response.json()

prices = data['Time Series (Daily)']

df = pd.DataFrame.from_dict(prices, orient="index")

df = df.astype(float)

#Obliczanie średniej kroczącej
df['SMA_5'] = df['4. close'].rolling(window=5).mean()

# Dodajemy prostą średnią kroczącą (SMA) dla 10 dni
df['SMA_10'] = df['4. close'].rolling(window=10).mean()

#Defining a trading strategy
def check_signal(df):
    if df['SMA_5'].iloc[-1] > df['SMA_10'].iloc[-1]:
        return 'buy'
    else:
        return 'sell'

signal = check_signal(df)
print(f"Signal: {signal}")