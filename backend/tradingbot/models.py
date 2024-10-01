from django.db import models

class Transaction(models.Model):
    date = models.DateTimeField()
    action = models.CharField(max_length=10)
    price = models.FloatField()
    balance = models.FloatField()
    holdings = models.IntegerField()

class Portfolio(models.Model):
    balance = models.FloatField()
    holdings = models.IntegerField()
    last_updated = models.DateTimeField(auto_now=True)

class Prediction(models.Model):
    date =models.DateTimeField(auto_now_add=True)
    predicted_price = models.FloatField()
    symbol = models.CharField(max_length=10)
    confidence =models.FloatField(null=True, blank=True)