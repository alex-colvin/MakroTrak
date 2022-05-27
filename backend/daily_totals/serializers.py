from rest_framework import serializers
from .models import DailyTotals

class DailyTotalsSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyTotals
        fields = ['id','user','calories','water','weight','calories_burned','date']
        depth = 1
