# Generated by Django 3.2.3 on 2021-06-17 15:10

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='MainStory',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('category', models.CharField(db_index=True, max_length=100, verbose_name='category')),
                ('chapter', models.CharField(blank=True, db_index=True, max_length=100, null=True, verbose_name='chapter')),
                ('chapter_number', models.IntegerField(blank=True, null=True, verbose_name='chapter_number')),
                ('part', models.CharField(blank=True, db_index=True, max_length=100, null=True, verbose_name='part')),
                ('part_number', models.IntegerField(blank=True, null=True, verbose_name='part_number')),
                ('sub_part', models.CharField(blank=True, db_index=True, max_length=100, null=True, verbose_name='sub_part')),
                ('sub_part_number', models.IntegerField(blank=True, null=True, verbose_name='sub_part_number')),
                ('title', models.CharField(db_index=True, max_length=100, verbose_name='title')),
                ('sub_title', models.CharField(blank=True, db_index=True, max_length=100, null=True, verbose_name='sub_title')),
                ('context1', models.TextField(blank=True, db_index=True, max_length=1000, null=True, verbose_name='context1')),
                ('context2', models.TextField(blank=True, db_index=True, max_length=1000, null=True, verbose_name='context2')),
                ('upload_dt', models.DateTimeField(auto_now_add=True, verbose_name='UPLOAD DATE')),
                ('modify_dt', models.DateTimeField(auto_now=True, verbose_name='MODIFY DATE')),
            ],
        ),
        migrations.CreateModel(
            name='Video',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('video', models.FileField(upload_to='video/%Y/%m/%d', verbose_name='video')),
                ('title', models.CharField(blank=True, db_index=True, max_length=100, null=True, verbose_name='title')),
                ('context', models.TextField(blank=True, db_index=True, max_length=1000, null=True, verbose_name='context')),
                ('upload_dt', models.DateTimeField(auto_now_add=True, verbose_name='UPLOAD DATE')),
                ('modify_dt', models.DateTimeField(auto_now=True, verbose_name='MODIFY DATE')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main_story.mainstory')),
            ],
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='image/%Y/%m/%d', verbose_name='IMAGE')),
                ('small_image', models.ImageField(upload_to='small_image/%Y/%m/%d', verbose_name='small_image')),
                ('title', models.CharField(blank=True, db_index=True, max_length=100, null=True, verbose_name='title')),
                ('context', models.TextField(blank=True, db_index=True, max_length=1000, null=True, verbose_name='context')),
                ('alt', models.CharField(blank=True, db_index=True, max_length=100, null=True, verbose_name='alt')),
                ('upload_dt', models.DateTimeField(auto_now_add=True, verbose_name='UPLOAD DATE')),
                ('modify_dt', models.DateTimeField(auto_now=True, verbose_name='MODIFY DATE')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main_story.mainstory')),
            ],
        ),
    ]
