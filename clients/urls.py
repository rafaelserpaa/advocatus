from django.contrib import admin
from . import views
from django.urls import path, include

urlpatterns = [
    path('', views.home, name='clients_home'),
    path('register/', views.register, name='clients_register')
]
