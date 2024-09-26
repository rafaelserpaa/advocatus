from django.db import models
from processes.models import Process

# Create your models here.
class ProcessExpense(models.Model):
    EXPENSE_TYPES = [
        ('judicial_fee', 'Custas processuais'),
        ('attorney_fee', 'Honorários advocatícios'),
        ('operational', 'Despesas operacionais'),
        ('third_party', 'Honorários de terceiros'),
        ('documentation', 'Taxas de documentação'),
        ('penalty', 'Multas ou penalidades'),
        ('notification', 'Notificações e intimações'),
    ]

    process = models.ForeignKey(Process, on_delete=models.CASCADE, related_name='expenses')
    description = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    expense_date = models.DateField()
    expense_type = models.CharField(max_length=100, choices=EXPENSE_TYPES)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def _str_(self):
        return f"{self.description} - {self.amount}"