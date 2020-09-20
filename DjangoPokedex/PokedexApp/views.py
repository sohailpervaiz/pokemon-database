from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework.pagination import PageNumberPagination
from rest_framework.generics import ListAPIView
from django.http.response import JsonResponse

from PokedexApp.models import Pokedex
from PokedexApp.serializers import PokedexSerializer


@csrf_exempt
def pokedexApi(request,id=0):
    if request.method=='GET':
        pokedex = Pokedex.objects.all()
        pokedex_serializer = PokedexSerializer(pokedex, many=True)
        return JsonResponse(pokedex_serializer.data, safe=False)
    
    elif request.method=='POST':
        pokedex_data=JSONParser().parse(request)
        pokedex_serializer = PokedexSerializer(data=pokedex_data)
        if pokedex_serializer.is_valid():
            pokedex_serializer.save()
            return JsonResponse("Record Added Successfully!!" , safe=False)
        return JsonResponse("Failed to Add Data.",safe=False)
    
    elif request.method=='PUT':
        pokedex_data = JSONParser().parse(request)
        pokedex = Pokedex.objects.get(Id=pokedex_data['Id'])
        pokedex_serializer=PokedexSerializer(pokedex,data=pokedex_data)
        if pokedex_serializer.is_valid():
            pokedex_serializer.save()
            return JsonResponse("Record Updated Successfully!!", safe=False)
        return JsonResponse("Failed to Update Data.", safe=False)

    elif request.method=='DELETE':
        pokedex = Pokedex.objects.get(Id=id)
        pokedex.delete()
        return JsonResponse("Record Deleted Succeffully!!", safe=False)

class PokedexPaged(ListAPIView):

    serializer_class = PokedexSerializer
    pagination_class = PageNumberPagination

    def get_queryset(self):

        queryset = Pokedex.objects.all()
        filter_pokedex = self.request.query_params.get('name', None)
        if filter_pokedex is not None:
            queryset = [x for x in queryset if filter_pokedex.lower() in x.Name.lower()]
        return queryset


        