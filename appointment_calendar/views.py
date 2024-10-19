from django.shortcuts import render, redirect
from django.contrib import messages
from .models import Commitment
from datetime import datetime

def view_calendar(req):
    return render(req, 'appointment_calendar/calendar_page.html')

def add_commitment(req):
    if req.method == "POST":
        time_start = req.POST.get('hora_inicio')
        time_end = req.POST.get('hora_fim')
        processes = req.POST.get('processo')
        location = req.POST.get('local')
        description = req.POST.get('observacoes')  # Pode ser None se não for preenchido

        if time_start and time_end and processes and location:
            # Combinar a data atual com os horários fornecidos
            data_atual = datetime.now().date()
            time_start_completo = datetime.combine(data_atual, datetime.strptime(time_start, '%H:%M').time())
            time_end_completo = datetime.combine(data_atual, datetime.strptime(time_end, '%H:%M').time())

            # Criar e salvar o compromisso no banco de dados
            compromisso = Commitment(
                time_start=time_start_completo,
                time_end=time_end_completo,
                processes=processes,
                location=location,
                description=description
            )
            compromisso.save()
            messages.success(req, 'Compromisso adicionado com sucesso!')
            return redirect('agenda')  # Altere para o nome da URL definido no seu arquivo urls.py
        else:
            messages.error(req, 'Por favor, preencha todos os campos obrigatórios.')
    
    return render(req, 'appointment_calendar/add_commitment_page.html')