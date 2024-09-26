from rest_framework import serializers
from .models import Transaction, Portfolio

class TransactionSerializer(serializers.ModelSerialaizer):
    class Meta:
        model = Transaction
        fiels = "_all_"

class PortfolioSerializer(serializers.ModelSerializers):
    class Meta:
        model = Portfolio
        fields = "_all_"