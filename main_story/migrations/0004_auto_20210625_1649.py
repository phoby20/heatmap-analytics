# Generated by Django 3.2.3 on 2021-06-25 16:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main_story', '0003_auto_20210618_1029'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='mainstory',
            options={'ordering': ('chapter_number', 'part_number')},
        ),
        migrations.AlterModelOptions(
            name='video',
            options={'ordering': ('-upload_dt',)},
        ),
    ]