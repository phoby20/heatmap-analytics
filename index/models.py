from django.db import models

# Create your models here.
class pointCount(models.Model):
    id = models.AutoField(primary_key=True)
    ip = models.CharField('ip_address', max_length=30, db_index=True, default='default')
    pointX = models.DecimalField('PointX', decimal_places=15, max_digits=30, db_index=True)
    pointY = models.DecimalField('PointY', decimal_places=15, max_digits=30, db_index=True)
    width = models.IntegerField('Width', db_index=True, default=0)
    height = models.IntegerField('Height', db_index=True, default=0)
    device_name = models.CharField('device_name', max_length=30, db_index=True, default='default')
    path = models.CharField('path', max_length=100, db_index=True, default='default')
    cursor_id = models.CharField('cursor_id', max_length=100, db_index=True, default='default')
    title = models.CharField('title', max_length=100, db_index=True, default='default')
    device_os = models.CharField('device_os', max_length=30, db_index=True, default='default')
    upload_dt = models.DateTimeField('UPLOAD DATE', auto_now_add=True)
    modify_dt = models.DateTimeField('MODIFY DATE', auto_now=True)


class moveHistory(models.Model):
    id = models.AutoField(primary_key=True)
    ip = models.CharField('ip_address', max_length=30, db_index=True, default='default')
    path = models.CharField('path', max_length=100, db_index=True, default='default')
    cursor_id = models.CharField('cursor_id', max_length=100, db_index=True, default='default')

    layerX = models.IntegerField('layerX')
    layerY = models.IntegerField('layerY')
    offsetX = models.IntegerField('offsetX', default=0)
    offsetY = models.IntegerField('offsetY', default=0)

    width = models.IntegerField('Width', db_index=True, default=0)
    height = models.IntegerField('Height', db_index=True, default=0)

    clientX = models.DecimalField('clientX', decimal_places=15, max_digits=30, db_index=True)
    clientY = models.DecimalField('clientY', decimal_places=15, max_digits=30, db_index=True)
    record_dt = models.DateTimeField('record DATE', auto_now_add=True)
    modify_dt = models.DateTimeField('MODIFY DATE', auto_now=True)