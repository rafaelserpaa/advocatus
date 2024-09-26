from django.shortcuts import render

# Create your views here.
def register_finances(req):
  return render(req, 'register-finances.html')