# Generated by Django 3.2.3 on 2021-07-08 10:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('index', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='movehistory',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='pointcount',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
