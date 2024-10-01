from django.shortcuts import render
from rest_framework import viewsets
from .models import Portfolio, Transaction, Prediction
from .serializers import PortfolioSerializer, TransactionSerializer, PredictionSerializer


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

class PortfolioViewSet(viewsets.ModelViewSet):
    queryset  = Portfolio.objects.all()
    serializer_class = PortfolioSerializer

class PredictionViewSet(viewsets.ModelViewSet):
    queryset = Prediction.objects.all()
    serializer_class = PredictionSerializer