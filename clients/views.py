from django.shortcuts import render, get_object_or_404, redirect
from .models import Clients
from django.contrib import messages
from django.contrib.messages import constants

def clients(req):
    user = req.user

    if user.is_authenticated:
        clients = Clients.objects.all()
        return render(req, 'client_home.html', {
            'clients': clients
        })

def register_client(req):
    user = req.user

    if user.is_authenticated:
        if req.method == 'POST':
            name = req.POST.get('name')
            number = req.POST.get('number')
            birthdate = req.POST.get('birthdate')
            document_id = req.POST.get('document_id')
            zip_code = req.POST.get('zip_code')
            adress = req.POST.get('adress')
            state = req.POST.get('states')
            city = req.POST.get('city')
            neighborhood = req.POST.get('neighborhood')
            role = req.POST.get('role')

            # Verificação de campos obrigatórios
            if not name or not number or not birthdate or not document_id or not zip_code or not adress or not state or not city or not neighborhood or not role:
                messages.add_message(req, constants.ERROR, "Todos os campos são obrigatórios.")
                return redirect('/clients/clients_register')

            # Verificação se o cliente já existe baseado em campos únicos
            if Clients.objects.filter(name=name).exists():
                messages.add_message(req, constants.ERROR, "O nome já está em uso.")
                return redirect('/clients/clients_register')

            if Clients.objects.filter(number=number).exists():
                messages.add_message(req, constants.ERROR, "O número já está em uso.")
                return redirect('/clients/clients_register')

            if Clients.objects.filter(document_id=document_id).exists():
                messages.add_message(req, constants.ERROR, "O documento de identificação já está em uso.")
                return redirect('/clients/clients_register')

            if Clients.objects.filter(zip_code=zip_code).exists():
                messages.add_message(req, constants.ERROR, "O CEP já está em uso.")
                return redirect('/clients/clients_register')

            # Criação do cliente
            try:
                client = Clients.objects.create(
                    name=name,
                    number=number,
                    birthdate=birthdate,
                    document_id=document_id,
                    zip_code=zip_code,
                    adress=adress,
                    state=state,
                    city=city,
                    neighborhood=neighborhood,
                    role=role
                )

                messages.add_message(req, constants.SUCCESS, "Cliente cadastrado com sucesso!")
                return redirect('/clients')

            except:
                messages.add_message(req, constants.ERROR, "Erro ao cadastrar o cliente. Verifique os dados.")
                return redirect('/clients/clients_register')

        # Renderizando o formulário com as opções de estados
        ufs = Clients.UF_CHOICES
        return render(req, 'client_register.html', {
            'ufs': ufs
        })

def edit_client(req, id):
    user = req.user

    if not user.is_authenticated:
        return redirect('/login')

    client = get_object_or_404(Clients, id=id)

    if req.method == 'POST':
        client.name = req.POST.get('name')
        client.number = req.POST.get('number')
        client.birthdate = req.POST.get('birthdate')
        client.document_id = req.POST.get('document_id')
        client.zip_code = req.POST.get('zip_code')
        client.adress = req.POST.get('adress')
        client.state = req.POST.get('state')
        client.city = req.POST.get('city')
        client.neighborhood = req.POST.get('neighborhood')
        client.role = req.POST.get('role')

        client.save()

        messages.add_message(req, constants.SUCCESS, "Cliente atualizado com sucesso!")
        return redirect('/clients')

    ufs = Clients.UF_CHOICES
    return render(req, 'edit_clients.html', {
        'client': client,
        'ufs': ufs
    })

def delete_client(req, id):
    user = req.user

    if user.is_authenticated:
        client = get_object_or_404(Clients, id=id)
        client.delete()

        messages.add_message(req, constants.SUCCESS, "Cliente deletado com sucesso!")
        return redirect('/clients')
