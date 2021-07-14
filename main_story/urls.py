from django.urls import path
from .views import *


app_name = 'main_story'
urlpatterns = [
    path('/chapter/<str:pk>', mainStory, name='main_story'),
]