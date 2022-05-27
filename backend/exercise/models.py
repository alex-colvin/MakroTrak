from django.db import models
from authentication.models import User

class Exercise(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    type = models.CharField(max_length=255)
    date = models.DateField()
    calories = models.IntegerField()
