# Generated by Django 5.1 on 2024-11-01 16:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('juiz', '0003_juizes_date2'),
    ]

    operations = [
        migrations.AlterField(
            model_name='juizes',
            name='date2',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
