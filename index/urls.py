from django.urls import path
from .views import *


app_name = 'index'
urlpatterns = [
    path('', Index, name='index'),
    # path(r'^like/$', post_input, name='post_input'),
    path(r'^like/$', post_input, name='post_input'),
]