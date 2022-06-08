from django.urls import *
from foods import views
from rest_framework.urlpatterns import format_suffix_patterns



# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<

urlpatterns = [
    path('', views.user_foods),
    path('<int:pk>/', views.edit_food),
]

urlpatterns = format_suffix_patterns(urlpatterns)