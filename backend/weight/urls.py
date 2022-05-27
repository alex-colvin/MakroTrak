from django.urls import *
from . import views

urlpatterns = [
    path('', views.user_weight),
    path('<int:pk>/', views.edit_weight),
]