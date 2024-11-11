from django.urls import path
from . import views

urlpatterns = [
    path("", views.finances, name="finance_home"),  # Página principal de finanças
    path("finance_register/", views.register_finance, name="finance_register"),  # Página para cadastrar despesas
    path("finances_edit/<int:id>/", views.edit_finance, name="finance_edit"),  # Página para editar uma despesa
    path("finances_delete/<int:id>/", views.delete_finance, name="finance_delete"),  # Página para deletar uma despesa
    path("reports/", views.reports, name="reports")  # Página de relatórios
]
