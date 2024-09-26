from django.shortcuts import render
from processes.models import Process
from .models import ProcessExpense
from django.http import HttpResponse

# Create your views here.
def register_finances(req):
  processes = Process.objects.all()
  expenses = ProcessExpense.objects.all()
  expense_types = ProcessExpense.EXPENSE_TYPES

  if req.method == 'GET':
    return render(req, 'register-finances.html', {
      'processes': processes,
      'expense_types': expense_types,
      'expenses': expenses
    })
  
  elif req.method == 'POST':
    return HttpResponse("Ok")
