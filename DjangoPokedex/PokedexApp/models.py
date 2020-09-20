from django.db import models

# Create your models here.

class Pokedex(models.Model):
    Id = models.IntegerField(primary_key = True)
    Num = models.CharField(max_length = 10,null=True)
    Name = models.CharField(max_length = 100,null=True)
    Img = models.CharField(max_length = 200,null=True)
    Type = models.CharField(max_length = 200,null=True)
    Height = models.CharField(max_length = 100,null=True)
    Weight = models.CharField(max_length = 100,null=True)
    