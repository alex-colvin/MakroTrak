from django.urls import *
from . import views

urlpatterns = [
    path('', views.user_exercise),
    path('<int:pk>/', views.edit_exercise),
]