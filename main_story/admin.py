from django.contrib import admin
from .models import *


@admin.register(MainStory)
class MainStoryProducts(admin.ModelAdmin):
    list_display = ['title', 'id', 'category', 'chapter', 'part', 'sub_part', 'sub_title', 'upload_dt', 'modify_dt']


@admin.register(Image)
class ProductsImages(admin.ModelAdmin):
    list_display = ['product', 'image', 'small_image', 'title', 'context', 'alt', 'upload_dt', 'modify_dt']


@admin.register(Video)
class ProductsVideos(admin.ModelAdmin):
    list_display = ['product', 'video', 'title', 'context', 'upload_dt', 'modify_dt']
