from django.shortcuts import render
from rest_framework import viewsets
from .models import Portfolio, Transaction
from serializers import PortfolioSerializer, TransactionSerializer


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

class PortfolioViewSet(viewsets.ModelViewSet):
    queryset  = Portfolio.objects.all()
    serializer_class = PortfolioSerializer

