from django.db import models
from authentication.models import User

class Food(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    cal = models.FloatField()
    fat = models.FloatField()
    carb = models.FloatField()
    sugar = models.FloatField()
    fiber = models.FloatField()
    protein = models.FloatField()
    servings = models.FloatField()
    url = models.CharField(max_length=255, blank=True, default='')
    
