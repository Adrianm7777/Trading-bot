# Generated by Django 5.1.1 on 2024-09-26 14:10

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Portfolio',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('balance', models.FloatField()),
                ('holdings', models.IntegerField()),
                ('last_updated', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField()),
                ('action', models.CharField(max_length=10)),
                ('price', models.FloatField()),
                ('blance', models.FloatField()),
                ('holdings', models.IntegerField()),
            ],
        ),
    ]
