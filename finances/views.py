from django.shortcuts import render,redirect, get_object_or_404
from django.db.models import Sum
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
  

def edit_expense(req, expense_id):
    expense = get_object_or_404(ProcessExpense, id=expense_id)
    processes = Process.objects.all()
    
    if req.method == 'POST':
        process_title = req.POST.get('process_title')
        description = req.POST.get('description')
        amount = req.POST.get('amount')
        expense_date = req.POST.get('expense_date')
        expense_type = req.POST.get('expense_type')

        print(f'Valores recebidos - Processo: {process_title}, Descrição: {description}, Valor: {amount}, Data: {expense_date}, Tipo: {expense_type}')  # Debugging

        try:
            amount = float(amount)
        except ValueError:
            messages.add_message(req, constants.ERROR, "O valor deve ser um número válido.")
            return redirect('edit_expense', expense_id=expense.id)

        # Atualiza os campos
        expense.process = Process.objects.get(titulo=process_title)
        expense.description = description
        expense.amount = amount
        expense.expense_date = expense_date
        expense.expense_type = expense_type
        expense.save()

        messages.add_message(req, constants.SUCCESS, "Despesa atualizada com sucesso!")
        return redirect('register_finances')
    
    return render(req, 'edit_expense.html', {
        'expense': expense,
        'processes': processes,
        'expense_types': ProcessExpense.EXPENSE_TYPES
    })



# finances/views.py
def delete_expense(request, expense_id):
    # Retrieve the expense by ID or return a 404 if it doesn't exist
    expense = get_object_or_404(ProcessExpense, id=expense_id)
    
    # Delete the expense
    expense.delete()
    
    # Display a success message
    messages.add_message(request, constants.SUCCESS, "Despesa excluída com sucesso!")
    
    # Redirect to the main finances page
    return redirect('register_finances')

from django.shortcuts import render
from django.db.models import Sum
from .models import ProcessExpense  # Certifique-se de importar o modelo corretamente

def reports(req):
    # Consulta todos os gastos e armazena o título do processo e o valor de cada gasto
    expenses = ProcessExpense.objects.select_related('process').all()
    
    # Armazenando os títulos dos processos e os gastos
    processes = [expense.process.titulo for expense in expenses]
    gastos = [float(expense.amount) for expense in expenses]

    # Calcula o total dos gastos por risco
    gastos_riscos = {
        'Baixo': expenses.filter(process__risco='B').aggregate(total=Sum('amount'))['total'] or 0,
        'Médio': expenses.filter(process__risco='M').aggregate(total=Sum('amount'))['total'] or 0,
        'Alto': expenses.filter(process__risco='A').aggregate(total=Sum('amount'))['total'] or 0,
    }

    # Quantidade de processos e média de gastos
    quant_processos = expenses.count()
    media_gastos = sum(gastos) / len(gastos) if gastos else 0  # Evita divisão por zero

    # Totais de despesas por tipo
    despesas_totais = expenses.values('expense_type').annotate(total=Sum('amount'))
    
    # Extrai os rótulos e valores das despesas totais
    labels_tipos_despesas = [dict(ProcessExpense.EXPENSE_TYPES).get(d['expense_type'], d['expense_type']) for d in despesas_totais]
    valores_despesas_totais = [d['total'] for d in despesas_totais]

    # Cria um dicionário para o total de cada tipo de despesa
    total_despesas_por_tipo = {label: total for label, total in zip(labels_tipos_despesas, valores_despesas_totais)}

    # Imprime ou armazena o resultado
    print({
        'processes': processes,
        'gastos': gastos,
        'gastos_riscos': list(gastos_riscos.values()),
        'gastos_riscos_k': list(gastos_riscos.keys()),
        'quant_processos': quant_processos,
        'media_gastos': media_gastos,
        'labels_tipos_despesas': labels_tipos_despesas,
        'valores_despesas_totais': valores_despesas_totais,
        'total_despesas_por_tipo': total_despesas_por_tipo,  # Adiciona o dicionário de totais
        'total_despesas_por_tipo_k': list(total_despesas_por_tipo.keys()),  # Passa o dicionário para o template
        'total_despesas_por_tipo_v': list(float(v) for v in total_despesas_por_tipo.values()),  # Passa o dicionário para o template
    })

    return render(req, 'reports.html', {
        'processes': processes,
        'gastos': gastos,
        'gastos_riscos_values': list([float(v) for v in gastos_riscos.values()]),
        'gastos_riscos_keys': list(gastos_riscos.keys()),
        'quant_processos': quant_processos,
        'media_gastos': media_gastos,
        'labels_tipos_despesas': labels_tipos_despesas,
        'valores_despesas_totais': valores_despesas_totais,
        'total_despesas_por_tipo': total_despesas_por_tipo,  # Passa o dicionário para o template
        'total_despesas_por_tipo_k': list(total_despesas_por_tipo.keys()),  # Passa o dicionário para o template
        'total_despesas_por_tipo_v': list(float(v) for v in total_despesas_por_tipo.values()),  # Passa o dicionário para o template
    })
