from django.shortcuts import render, get_object_or_404, redirect
from django.contrib import messages
from django.contrib.messages import constants
from .models import Process, ProcessExpense

# View para a página principal de finanças
def finances(request):
    processes = Process.objects.all()
    expenses = ProcessExpense.objects.all()
    return render(request, 'finance_home.html', {
        'processes': processes,
        'expenses': expenses,
    })

# View para cadastrar uma nova despesa
def register_finance(request):
    processes = Process.objects.all()
    expense_types = ProcessExpense.EXPENSE_TYPES  # Certifique-se de que esta variável está correta

    if request.method == 'GET':
        return render(request, 'finance_register.html', {
            'processes': processes,
            'expense_types': expense_types,  # Verifique que o nome bate com o template
        })

    elif request.method == 'POST':
        process_title = request.POST.get('process_title')
        description = request.POST.get('description')
        amount = request.POST.get('amount')
        expense_date = request.POST.get('expense_date')
        expense_type = request.POST.get('expense_type')  # Certifique-se de que este nome está correto

        try:
            amount = float(amount)
        except ValueError:
            messages.add_message(request, constants.ERROR, "O valor deve ser um número válido.")
            return redirect('finance_register')

        if amount < 0:
            messages.add_message(request, constants.ERROR, "O valor não pode ser negativo.")
            return redirect('finance_register')

        process = Process.objects.filter(titulo=process_title).first()
        if not process:
            messages.add_message(request, constants.ERROR, "Processo não encontrado.")
            return redirect('finance_register')

        ProcessExpense.objects.create(
            process=process,
            description=description,
            amount=amount,
            expense_date=expense_date,
            expense_type=expense_type
        )

        messages.add_message(request, constants.SUCCESS, "Despesa cadastrada com sucesso!")
        return redirect('finance_home')


# View para editar uma despesa
def edit_finance(request, id):
    expense = get_object_or_404(ProcessExpense, id=id)
    processes = Process.objects.all()
    expense_types = ProcessExpense.EXPENSE_TYPES

    if request.method == 'POST':
        expense.process = get_object_or_404(Process, titulo=request.POST.get('process_title'))
        expense.description = request.POST.get('description')
        expense.amount = request.POST.get('amount')
        expense.expense_date = request.POST.get('expense_date')
        expense.expense_type = request.POST.get('expense_type')

        try:
            expense.amount = float(expense.amount)
            if expense.amount < 0:
                raise ValueError("O valor não pode ser negativo.")
            expense.save()
            messages.add_message(request, constants.SUCCESS, "Despesa editada com sucesso!")
            return redirect('finance_home')
        except ValueError as e:
            messages.add_message(request, constants.ERROR, str(e))
            return redirect('finance_edit', id=id)

    return render(request, 'finances_edit.html', {
        'expense': expense,
        'processes': processes,
        'expense_types': expense_types,
    })


# View para deletar uma despesa
def delete_finance(request, id):
    expense = get_object_or_404(ProcessExpense, id=id)
    if request.method == 'POST':
        expense.delete()
        messages.add_message(request, constants.SUCCESS, "Despesa deletada com sucesso!")
        return redirect('finance_home')
    return render(request, 'finances_delete.html', {'expense': expense})


# View para relatórios de finanças
def reports(request):
    expenses = ProcessExpense.objects.all()
    return render(request, 'reports.html', {
        'expenses': expenses,
    })
