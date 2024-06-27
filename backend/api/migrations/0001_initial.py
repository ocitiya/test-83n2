# Generated by Django 4.2.13 on 2024-06-27 03:03

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Person',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('identity_number', models.CharField(max_length=16, validators=[django.core.validators.RegexValidator(message='Identity number must be a number and contain 16 characters!', regex='^\\d{16}$')])),
                ('email', models.EmailField(max_length=254)),
                ('date_of_birth', models.DateField()),
            ],
            options={
                'db_table': 'persons',
            },
        ),
    ]