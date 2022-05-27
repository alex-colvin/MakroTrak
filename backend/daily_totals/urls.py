from django.urls import *
from daily_totals import views

urlpatterns = [
    path('', views.user_totals),
    path('<int:pk>/', views.edit_totals),
]