import pandas as pd
import requests

API_KEY="25IO3T1D8V69J8DM"

symbol="AAPL"

url = f'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol={symbol}&apikey={API_KEY}'

response = requests.get(url)

data = response.json()

print(data)