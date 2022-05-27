from rest_framework import serializers
from .models import ConsumedFood

class ConsumedFoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConsumedFood
        fields = ['id','user','food','date','food_id']
        depth = 2
        food_id = serializers.IntegerField(write_only=True)
        # user_id = serializers.IntegerField(write_only=True)