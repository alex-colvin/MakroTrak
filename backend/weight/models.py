from django.db import models
from authentication.models import User

class Weight(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    weight = models.IntegerField()
    date = models.DateField()