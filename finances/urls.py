from django.urls import path
from . import views

urlpatterns = [
    path("", views.register_finances, name="register_finances")
]
