from django.db import models
from authentication.models import User

class DailyTotals(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    calories = models.IntegerField()
    water = models.IntegerField()
    weight = models.IntegerField()
    calories_burned = models.IntegerField()
    date = models.DateField()
