from rest_framework import serializers
from .models import Food

class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = ['id','name','cal','fat','carb','sugar','fiber','protein','servings','url','user_id']
        depth = 1