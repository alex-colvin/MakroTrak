from rest_framework.urls import *
from consumed_foods import views

urlpatterns = [
    path('', views.user_consumed_foods),
    path('<int:pk>/', views.edit_consumed_food),
]