from django.db import models

class accessHistory(models.Model):
    ip = models.CharField('ip_address', max_length=30, db_index=True)
    browser_name = models.CharField('browser_name', max_length=50, db_index=True)
    browser_version = models.CharField('browser_version', max_length=30, db_index=True)
    accesscount = models.IntegerField('Access Count', blank=True)
    device_name = models.CharField('device_name', max_length=30, db_index=True)
    path = models.CharField('path', max_length=100, db_index=True)
    title = models.CharField('title', max_length=100, db_index=True)
    device_os = models.CharField('device_os', max_length=30, db_index=True)
    access_dt = models.DateTimeField('Access Date', auto_now_add=True)

    class Meta:
        ordering = ('-access_dt',)