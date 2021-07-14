from django.contrib import admin
from .models import *

# Register your models here.
@admin.register(pointCount)
class PointCount(admin.ModelAdmin):
    list_display = ['id', 'title', 'ip', 'pointX', 'pointY', 'width', 'height', 'device_name', 'path', 'cursor_id', 'device_os', 'upload_dt', 'modify_dt']
    # list_editable = ['pointX', 'pointY', 'count', 'upload_dt', 'modify_dt']


@admin.register(moveHistory)
class MoveHistory(admin.ModelAdmin):
    list_display = ['id', 'ip', 'path', 'cursor_id', 'width', 'height', 'clientX', 'clientY', 'layerX', 'layerY', 'offsetX', 'offsetY']