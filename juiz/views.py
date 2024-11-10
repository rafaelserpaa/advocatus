from django.shortcuts import render, get_object_or_404, redirect
from .models import Juizes
from django.contrib import messages
from django.contrib.messages import constants
from datetime import datetime

def juizes(req):
    user = req.user

    if user.is_authenticated:
        juizes = Juizes.objects.all()
        return render(req, 'juiz_home.html', {
            'juizes': juizes
        })

def register_juiz(req):
    user = req.user

    if user.is_authenticated:
        if req.method == 'POST':
            name = req.POST.get('name')
            number = req.POST.get('number')
            date = req.POST.get('date')
            date2 = req.POST.get('date2')
            state = req.POST.get('states')
            city = req.POST.get('city')

            if len(number) != 11:
                messages.add_message(req, constants.ERROR, "O telefone deve conter exatamente 11 dígitos.")
                return redirect('juizes_register')

            date_obj = datetime.strptime(date, '%Y-%m-%d')
            date2_obj = datetime.strptime(date2, '%Y-%m-%d')

            if date2_obj <= date_obj:
                messages.add_message(req, constants.ERROR, "A data de fim deve ser posterior à data de início.")
                return redirect('juizes_register')

            if Juizes.objects.filter(name=name).exists():
                messages.add_message(req, constants.ERROR, "O nome já está em uso.")
                return redirect('juiz_home')

            if Juizes.objects.filter(number=number).exists():
                messages.add_message(req, constants.ERROR, "O número já está em uso.")
                return redirect('juiz_home')

            try:
                Juizes.objects.create(
                    name=name,
                    number=number,
                    date=date,
                    date2=date2,
                    state=state,
                    city=city,
                )

                messages.add_message(req, constants.SUCCESS, "Juiz cadastrado com sucesso!")
                return redirect('juiz_home')

            except:
                messages.add_message(req, constants.ERROR, "Erro ao cadastrar o juiz. Verifique os dados.")
                return redirect('juiz_home')

        ufs = Juizes.UF_CHOICES
        return render(req, 'juizes_register.html', {
            'ufs': ufs
        })

def edit_juiz(req, id):
    user = req.user

    if not user.is_authenticated:
        return redirect('/login')

    juiz = get_object_or_404(Juizes, id=id)

    if req.method == 'POST':
        name = req.POST.get('name')
        number = req.POST.get('number')
        date = req.POST.get('date')
        date2 = req.POST.get('date2')
        state = req.POST.get('state')
        city = req.POST.get('city')

        if len(number) != 11:
            messages.add_message(req, constants.ERROR, "O telefone deve conter exatamente 11 dígitos.")
            return redirect('juizes_edit', id=id)

        date_obj = datetime.strptime(date, '%Y-%m-%d')
        date2_obj = datetime.strptime(date2, '%Y-%m-%d')

        if date2_obj <= date_obj:
            messages.add_message(req, constants.ERROR, "A data de fim deve ser posterior à data de início.")
            return redirect('juizes_edit', id=id)

        juiz.name = name
        juiz.number = number
        juiz.date = date
        juiz.date2 = date2
        juiz.state = state
        juiz.city = city

        juiz.save()

        messages.add_message(req, constants.SUCCESS, "Juiz atualizado com sucesso!")
        return redirect('juiz_home')

    ufs = Juizes.UF_CHOICES
    return render(req, 'juizes_edit.html', {
        'juiz': juiz,
        'ufs': ufs
    })


def delete_juiz(req, id):
    user = req.user

    if user.is_authenticated:
        juiz = get_object_or_404(Juizes, id=id)
        juiz.delete()

        messages.add_message(req, constants.SUCCESS, "Juiz deletado com sucesso!")
        return redirect('juiz_home')
