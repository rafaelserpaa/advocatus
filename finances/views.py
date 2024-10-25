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
  

def reports(req):
    expenses = ProcessExpense.objects.all()
    processes = [expense.process.titulo for expense in expenses]
    gastos = [float(expense.amount) for expense in expenses]

    # Inicializa os gastos por risco
    gasto_risco_baixo = 0
    gasto_risco_medio = 0
    gasto_risco_alto = 0

    # Acumula os gastos com base no risco
    for expense in expenses:
        if expense.process.risco == 'B':
            gasto_risco_baixo += float(expense.amount)
        elif expense.process.risco == 'M':
            gasto_risco_medio += float(expense.amount)
        elif expense.process.risco == 'A':
            gasto_risco_alto += float(expense.amount)

    gastos_riscos = [gasto_risco_baixo, gasto_risco_medio, gasto_risco_alto]

    quant_processos = len(expenses)
    media_gastos = sum(gastos) / len(gastos) if gastos else 0  # Evita divisão por zero

    tipos_despesas = dict(ProcessExpense.EXPENSE_TYPES)  # Converte as escolhas para um dicionário
    despesas_totais = {tipo: 0 for tipo in tipos_despesas.keys()}  # Inicializa o dicionário para totalizar os gastos

    # Acumulando os gastos com base no tipo
    for expense in expenses:
        despesas_totais[expense.expense_type] += float(expense.amount)

    # Preparando os dados para o gráfico
    labels_tipos_despesas = list(tipos_despesas.values())  # Obtendo os rótulos das despesas
    valores_despesas_totais = list(despesas_totais.values())  # Obtendo os totais por tipo de despesa

    return render(req, 'reports.html', {
        'processes': processes,
        'gastos': gastos,
        'gastos_riscos': gastos_riscos,
        'quant_processos': quant_processos,
        'media_gastos': media_gastos,
        'labels_tipos_despesas': labels_tipos_despesas,
        'valores_despesas_totais': valores_despesas_totais,
    })
