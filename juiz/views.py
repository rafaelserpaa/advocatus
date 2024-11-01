from django.shortcuts import render, get_object_or_404, redirect
from .models import Juizes
from django.contrib import messages
from django.contrib.messages import constants

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

            # Verificação se o juiz já existe baseado em campos únicos
            if Juizes.objects.filter(name=name).exists():
                messages.add_message(req, constants.ERROR, "O nome já está em uso.")
                return redirect('juiz_home')

            if Juizes.objects.filter(number=number).exists():
                messages.add_message(req, constants.ERROR, "O número já está em uso.")
                return redirect('juiz_home')

            # Criação do juiz
            try:
                juizes = Juizes.objects.create(
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

        # Renderizando o formulário com as opções de estados
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
        juiz.name = req.POST.get('name')
        juiz.number = req.POST.get('number')
        juiz.date = req.POST.get('date')
        juiz.date2 = req.POST.get('date2')
        juiz.state = req.POST.get('state')
        juiz.city = req.POST.get('city')

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
