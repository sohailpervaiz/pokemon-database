# Generated by Django 3.1.1 on 2020-09-19 10:55

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Pokedex',
            fields=[
                ('Id', models.IntegerField(primary_key=True, serialize=False)),
                ('Num', models.CharField(max_length=10, null=True)),
                ('Name', models.CharField(max_length=100, null=True)),
                ('Img', models.CharField(max_length=200, null=True)),
                ('Type', models.CharField(max_length=200, null=True)),
                ('Height', models.CharField(max_length=100, null=True)),
                ('Weight', models.CharField(max_length=100, null=True)),
            ],
        ),
    ]
