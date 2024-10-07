from django.shortcuts import render
from rest_framework import viewsets
from .models import Portfolio, Transaction, Prediction
from .serializers import PortfolioSerializer, TransactionSerializer, PredictionSerializer
import subprocess
from rest_framework.decorators import api_view
from rest_framework.response import Response


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

class PortfolioViewSet(viewsets.ModelViewSet):
    queryset  = Portfolio.objects.all()
    serializer_class = PortfolioSerializer

class PredictionViewSet(viewsets.ModelViewSet):
    queryset = Prediction.objects.all()
    serializer_class = PredictionSerializer

@api_view(["POST"])
def run_trading_bot(request):
    try:
        subprocess.Popen(["python", r"C:\Users\acer\Trading-bot\backend\main.py"])
        return Response({"message": "Trading bot started successfully!"}, status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=500)