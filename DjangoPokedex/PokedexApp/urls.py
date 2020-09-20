from django.conf.urls import url
from PokedexApp import views

from PokedexApp.views import PokedexPaged

from django.conf.urls.static import static
from django.conf import settings

urlpatterns=[
    url(r'^pokedex/$',views.pokedexApi),
    url(r'^pokedex/([0-9]+)$',views.pokedexApi),
    url(r'^pokedex/list_paged/$',PokedexPaged.as_view(),name = 'list_paged')
]