from rest_framework.urls import *
from consumed_foods import views
from rest_framework.urlpatterns import format_suffix_patterns


urlpatterns = [
    path('', views.user_consumed_foods),
    path('<int:pk>/', views.edit_consumed_food),
]

urlpatterns = format_suffix_patterns(urlpatterns)