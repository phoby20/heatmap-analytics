from django.contrib import admin
from .models import *

# Register your models here.
@admin.register(accessHistory)
class AccessHistory(admin.ModelAdmin):
    list_display = ['ip', 'title', 'path', 'browser_name', 'browser_version', 'device_name', 'device_os', 'access_dt']
    # list_editable = ['pointX', 'pointY', 'count', 'upload_dt', 'modify_dt']

