# Generated by Django 4.1.5 on 2023-12-24 13:55

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tweet',
            name='timestamp',
            field=models.DateTimeField(default=datetime.datetime(2023, 12, 24, 19, 25, 20, 133953)),
        ),
    ]
