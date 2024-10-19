from django.urls import path
from . import views

urlpatterns = [
  path('', views.view_calendar, name='agenda'),  # http://127.0.0.1:8000/agenda/
  path('adicionar_compromisso/', views.add_commitment, name='adicionar_compromisso'), # http://127.0.0.1:8000/agenda/adicionar_compromisso/
]
