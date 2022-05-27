from django.db import models
from authentication.models import User

class Water(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ounces = models.IntegerField()
    date =models.DateField()

