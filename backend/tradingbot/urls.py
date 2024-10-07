from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TransactionViewSet, PortfolioViewSet, PredictionViewSet, run_trading_bot

router = DefaultRouter()
router.register(r'transactions', TransactionViewSet)
router.register(r'portfolio', PortfolioViewSet)
router.register(r'predictions',PredictionViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/run-bot/', run_trading_bot, name='ru_bot')
]