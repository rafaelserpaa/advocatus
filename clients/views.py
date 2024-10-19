from django.shortcuts import render, redirect
from django.core.exceptions import ValidationError
from .models import Clients
from django.contrib import messages

def home(request):
    user = request.user

    if user.is_authenticated:
        # Pega todos os clientes do banco de dados
        clients = Clients.objects.all()
        
        # Passa a lista de clientes para o template
        return render(request, "client_home.html", {'clients': clients})

def register(request):
    user = request.user

    if user.is_authenticated:
        if request.method == 'POST':
            # Coletando os dados do formulário
            name = request.POST.get('name')
            number = request.POST.get('number')
            birthdate = request.POST.get('birthdate')
            document_id = request.POST.get('document_id')
            zip_code = request.POST.get('zip_code')
            adress = request.POST.get('adress')
            state = request.POST.get('state')
            city = request.POST.get('city')
            neighborhood = request.POST.get('neighborhood')
            role = request.POST.get('role')

            # Validações básicas de campos obrigatórios
            if not name or not number or not document_id or not zip_code or not adress or not state or not city or not neighborhood or not role:
                messages.error(request, 'Preencha todos os campos obrigatórios.')
                return redirect('/clients/register')

            try:
                # Criação do objeto e salvamento no banco de dados
                Clients.objects.create(
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
                messages.success(request, 'Registro salvo com sucesso!')
                return redirect('/clients')  # Redireciona para a página inicial após o registro
            except ValidationError as e:
                messages.error(request, f"Erro de validação: {e}")
            except Exception as e:
                messages.error(request, f"Ocorreu um erro: {e}")
            return redirect('/clients/register')

        ufs = Clients.UF_CHOICES
        return render(request, "client_register.html", {
            'ufs': ufs
        })
