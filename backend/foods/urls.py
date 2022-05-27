from django.urls import *
from foods import views

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<

urlpatterns = [
    path('', views.user_foods),
    path('<int:pk>/', views.edit_food),
]
