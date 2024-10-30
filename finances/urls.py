from django.urls import path
from . import views

urlpatterns = [
    path("", views.register_finances, name="register_finances"),
    path('edit-expense/<int:expense_id>/', views.edit_expense, name='edit_expense'),
    path('delete-expense/<int:expense_id>/', views.delete_expense, name='delete_expense'),
    path("reports/", views.reports, name="reports")
]
