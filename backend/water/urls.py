from django.urls import *
from . import views

urlpatterns = [
    path('', views.user_water),
    path('<int:pk>/', views.edit_water),
]