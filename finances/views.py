from django.shortcuts import render,redirect
from processes.models import Process
from .models import ProcessExpense
from django.contrib import messages
from django.contrib.messages import constants

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
    process_title = req.POST.get('process_title')  
    description = req.POST.get('description')
    amount = req.POST.get('amount')
    expense_date = req.POST.get('expense_date')
    expense_type = req.POST.get('expense_type')

    if not process_title or not description or not amount or not expense_date or not expense_type:
        messages.add_message(req, constants.ERROR, "Todos os campos são obrigatórios.")
        return redirect('/finances')

    try:
        amount = float(amount)  
    except ValueError:
        messages.add_message(req, constants.ERROR, "O valor deve ser um número válido.")
        return redirect('/finances')  

    if amount < 0:
        messages.add_message(req, constants.ERROR, "O valor não pode ser negativo.")
        return redirect('/finances') 
    process = Process.objects.filter(titulo=process_title).first()
    if not process:
        messages.add_message(req, constants.ERROR, "Processo não encontrado.")
        return redirect('/finances')

    expense = ProcessExpense.objects.create(
        process=process,
        description=description,
        amount=amount,
        expense_date=expense_date,
        expense_type=expense_type
    )

    messages.add_message(req, constants.SUCCESS, "Despesa cadastrada com sucesso!")
    return redirect('/finances')  