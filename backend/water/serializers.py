from rest_framework import serializers
from .models import Water

class WaterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Water
        fields = ['id','user','ounces','date']
        depth = 1