from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('users.urls')),
    path("processes/", include('processes.urls')),
    path('clients/', include('clients.urls')),
    path('agenda/', include('appointment_calendar.urls')),
    path('finances/', include('finances.urls')),
    path('juiz/', include('juiz.urls')),
]
