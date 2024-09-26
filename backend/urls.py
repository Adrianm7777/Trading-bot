from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .tradingbot.views import TransactionViewSet, PortfolioViewSet
router = DefaultRouter()
router.register(r'transactions', TransactionViewSet)
router.register(r'portfolio', PortfolioViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
