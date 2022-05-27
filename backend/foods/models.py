from django.db import models
from authentication.models import User

class Food(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    cal = models.IntegerField()
    fat = models.IntegerField()
    carb = models.IntegerField()
    sugar = models.IntegerField()
    fiber = models.IntegerField()
    protein = models.IntegerField()
    servings = models.IntegerField()
    url = models.CharField(max_length=255, blank=True, default='')
    
