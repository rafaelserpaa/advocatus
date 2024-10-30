from django.urls import path
from . import views

urlpatterns = [
    path("", views.juizes, name="juiz_home"),
    path("juizes_register", views.register_juiz, name="juizes_register"),
    path('juizes_edit/<int:id>/', views.edit_juiz, name='juizes_edit'),
    path('juizes_delete/<int:id>/', views.delete_juiz, name='juizes_delete'),
]