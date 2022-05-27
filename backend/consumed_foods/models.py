from django.db import models
from authentication.models import User
from foods.models import Food

class ConsumedFood(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    food = models.ForeignKey(Food, on_delete=models.CASCADE)
    date = models.DateField()
