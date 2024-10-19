from django.shortcuts import render, get_object_or_404, redirect
from .models import Process
from django.contrib import messages
from django.contrib.messages import constants
from clients.models import Clients

def process(req):
  user = req.user

  if user.is_authenticated:
    processes = Process.objects.all()
    return render(req, 'processes.html', {
       'processes': processes
    })
  

def register_process(req):
  user = req.user

  if user.is_authenticated:

    if req.method == 'POST':
        tipo = req.POST.get('tipo')
        titulo = req.POST.get('titulo')
        tipo_acao = req.POST.get('tipo_acao')
        cliente = req.POST.get('cliente')
        contrario = req.POST.get('contrario')
        numero_pasta = req.POST.get('numero_pasta')
        numero_cnj = req.POST.get('numero_cnj')
        detalhes_pasta = req.POST.get('detalhes_pasta')
        advogado = req.POST.get('advogado')
        push_andamentos = req.POST.get('push_andamentos')
        comarca = req.POST.get('comarca')
        juiz = req.POST.get('juiz')
        risco = req.POST.get('risco')
        tribunal = req.POST.get('tribunal')
        uf = req.POST.get('uf')
        instancia = req.POST.get('instancia')
        vara = req.POST.get('vara')
        valor_causa = req.POST.get('valor_causa')
        valor_possivel = req.POST.get('valor_possivel')
        valor_provisionado = req.POST.get('valor_provisionado')

        if not tipo or not titulo or not tipo_acao or not cliente or not contrario or not numero_pasta or not numero_cnj or not detalhes_pasta or not advogado or not push_andamentos or not comarca or not juiz or not risco or not tribunal or not uf or not instancia or not vara or not valor_causa or not valor_possivel or not valor_provisionado:
            messages.add_message(req, constants.ERROR, "Todos os campos são obrigatórios.")
            return redirect('/processes/process_register')

        try:
            valor_causa = float(valor_causa)
            valor_possivel = float(valor_possivel)
            valor_provisionado = float(valor_provisionado)
        except ValueError:
            messages.add_message(req, constants.ERROR, "Os valores financeiros devem ser números válidos.")
            return redirect('/processes/process_register')

        if valor_causa < 0 or valor_possivel < 0 or valor_provisionado < 0:
            messages.add_message(req, constants.ERROR, "Os valores financeiros não podem ser negativos.")
            return redirect('/processes/process_register')

        try:
          cliente = Clients.objects.filter(name=cliente).first()
        except Clients.DoesNotExist:
            messages.add_message(req, constants.ERROR, "Cliente nao cadastrado.")
            return redirect('/processes/process_register')

        process = Process.objects.create(
            tipo=tipo,
            titulo=titulo,
            tipo_acao=tipo_acao,
            cliente=cliente,
            contrario=contrario,
            numero_pasta=numero_pasta,
            numero_cnj=numero_cnj,
            detalhes_pasta=detalhes_pasta,
            advogado=advogado,
            push_andamentos=push_andamentos,
            comarca=comarca,
            juiz=juiz,
            risco=risco,
            tribunal=tribunal,
            uf=uf,
            instancia=instancia,
            vara=vara,
            valor_causa=valor_causa,
            valor_possivel=valor_possivel,
            valor_provisionado=valor_provisionado
        )

        messages.add_message(req, constants.SUCCESS, "Processo cadastrado com sucesso!")
        return redirect('/processes')

    if req.method == 'GET':
      riscos_choices = Process.RISCO_CHOICES
      uf_choices = Process.UF_CHOICES
      instancia_choices = Process.INSTANCIA_CHOICES
      clients = Clients.objects.all()

      return render(req, 'process_register.html', {
        'riscos': riscos_choices,
        'ufs': uf_choices,
        'instacias': instancia_choices,
        'clients': clients
      })
      

def edit_process(req, id):
    user = req.user

    if not user.is_authenticated:
        return redirect('/login')  # Redireciona se o usuário não estiver autenticado

    process = get_object_or_404(Process, id=id)

    if req.method == 'POST':
        process.tipo = req.POST.get('tipo')
        process.titulo = req.POST.get('titulo')
        process.tipo_acao = req.POST.get('tipo_acao')
        process.cliente = Clients.objects.filter(name=req.POST.get('cliente')).first()
        process.contrario = req.POST.get('contrario')
        process.numero_pasta = req.POST.get('numero_pasta')
        process.numero_cnj = req.POST.get('numero_cnj')
        process.detalhes_pasta = req.POST.get('detalhes_pasta')
        process.advogado = req.POST.get('advogado')
        process.push_andamentos = req.POST.get('push_andamentos')
        process.comarca = req.POST.get('comarca')
        process.juiz = req.POST.get('juiz')
        process.risco = req.POST.get('risco')
        process.tribunal = req.POST.get('tribunal')
        process.uf = req.POST.get('uf')
        process.instancia = req.POST.get('instancia')
        process.vara = req.POST.get('vara')

        try:
            valor_causa = req.POST.get('valor_causa')
            valor_possivel = req.POST.get('valor_possivel')
            valor_provisionado = req.POST.get('valor_provisionado')
        
            valor_causa = valor_causa.replace(',', '.')
            valor_possivel = valor_possivel.replace(',', '.')
            valor_provisionado = valor_provisionado.replace(',', '.')
        
            valor_causa = float(valor_causa)
            valor_possivel = float(valor_possivel)
            valor_provisionado = float(valor_provisionado)
        
        except ValueError:
            messages.add_message(req, constants.ERROR, "Os valores financeiros devem ser números válidos.")
            return render(req, 'edit_process.html', {
                'process': process,
                'riscos': Process.RISCO_CHOICES,
                'ufs': Process.UF_CHOICES,
                'instacias': Process.INSTANCIA_CHOICES,
                'clients': Clients.objects.all()
            })

        if valor_causa < 0 or valor_possivel < 0 or valor_provisionado < 0:
            messages.add_message(req, constants.ERROR, "Os valores financeiros não podem ser negativos.")
            return render(req, 'edit_process.html', {
                'process': process,
                'riscos': Process.RISCO_CHOICES,
                'ufs': Process.UF_CHOICES,
                'instacias': Process.INSTANCIA_CHOICES,
                'clients': Clients.objects.all()
            })

        # Atualiza os valores financeiros
        process.valor_causa = valor_causa
        process.valor_possivel = valor_possivel
        process.valor_provisionado = valor_provisionado

        process.save()

        messages.add_message(req, constants.SUCCESS, "Processo atualizado com sucesso!")
        return redirect('/processes')

    # Para GET request
    riscos_choices = Process.RISCO_CHOICES
    uf_choices = Process.UF_CHOICES
    instancia_choices = Process.INSTANCIA_CHOICES
    clients = Clients.objects.all()

    return render(req, 'edit_process.html', {
        'process': process,
        'riscos': riscos_choices,
        'ufs': uf_choices,
        'instacias': instancia_choices,
        'clients': clients
    })


def delete_process(req, id):
    user = req.user

    if user.is_authenticated:
        process = get_object_or_404(Process, id=id)
        process.delete()

        messages.add_message(req, constants.SUCCESS, "Processo deletado com sucesso!")
        return redirect('/processes')
