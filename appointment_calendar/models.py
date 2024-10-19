from django.db import models

class Commitment(models.Model):
    time_start = models.DateTimeField()
    time_end = models.DateTimeField()
    processes = models.CharField(max_length=200, default="My default process")  # Definir um valor padrão
    location = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.processes
