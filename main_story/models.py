from django.db import models
import uuid

class PartList(models.Model):
    part_title = models.CharField('part', max_length=100, db_index=True, null=True, blank=True)
    part_number = models.IntegerField('part_number', null=True, blank=True)



class MainStory(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    category = models.CharField('category', max_length=100, db_index=True)
    chapter = models.CharField('chapter', max_length=100, db_index=True, null=True, blank=True)
    chapter_number = models.IntegerField('chapter_number', null=True, blank=True)
    part = models.CharField('part', max_length=100, db_index=True, null=True, blank=True)
    part_number = models.IntegerField('part_number', null=True, blank=True)
    sub_part = models.CharField('sub_part', max_length=100, db_index=True, null=True, blank=True)
    sub_part_number = models.IntegerField('sub_part_number', null=True, blank=True)

    title = models.CharField('title', max_length=100, db_index=True)
    sub_title = models.CharField('sub_title', max_length=100, db_index=True, null=True, blank=True)
    context1 = models.TextField('context1', max_length=2600, db_index=True, null=True, blank=True)
    context2 = models.TextField('context2', max_length=2600, db_index=True, null=True, blank=True)

    upload_dt = models.DateTimeField('UPLOAD DATE', auto_now_add=True)
    modify_dt = models.DateTimeField('MODIFY DATE', auto_now=True)

    class Meta:
        ordering = ('chapter_number', 'part_number')


class Image(models.Model):
    product = models.ForeignKey(MainStory, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField('IMAGE', upload_to='static/image/product_image/%Y/%m/%d')
    small_image = models.ImageField('small_image', upload_to='small_image/%Y/%m/%d', null=True, blank=True)

    title = models.CharField('title', max_length=100, db_index=True, null=True, blank=True)
    context = models.TextField('context', max_length=1000, db_index=True, null=True, blank=True)
    alt = models.CharField('alt', max_length=100, db_index=True, null=True, blank=True)

    upload_dt = models.DateTimeField('UPLOAD DATE', auto_now_add=True)
    modify_dt = models.DateTimeField('MODIFY DATE', auto_now=True)


class Video(models.Model):
    product = models.ForeignKey(MainStory, on_delete=models.CASCADE)
    video = models.FileField('video', upload_to='static/image/product_video/%Y/%m/%d')

    title = models.CharField('title', max_length=100, db_index=True, null=True, blank=True)
    context = models.TextField('context', max_length=1000, db_index=True, null=True, blank=True)

    upload_dt = models.DateTimeField('UPLOAD DATE', auto_now_add=True)
    modify_dt = models.DateTimeField('MODIFY DATE', auto_now=True)

    class Meta:
        ordering = ('-upload_dt',)