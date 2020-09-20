
from rest_framework import serializers
from PokedexApp.models import Pokedex

class PokedexSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pokedex
        fields = ('Id',
                  'Num',
                  'Name',
                  'Img',
                  'Type',
                  'Height',
                  'Weight')