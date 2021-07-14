from django.urls import path
from .views import *


app_name = 'analytics'
urlpatterns = [
    path('', analytics, name='analytics'),
    path('/upload', upload, name='upload'),
    path('/pv_select', pv_select, name='pv_select'),
    # path('/allclickmap_detail', allclickmap_detail, name='allclickmap_detail'),
    # path('/allclickmap', allclickmap, name='allclickmap'),
    path('/allclickmap/<str:pk>', allclickmap, name='allclickmap'),
    # path('/read_detail', read_detail, name='read_detail'),
    path('/carefully_read/<str:pk>', carefully_read, name='carefully_read'),
    # path('/masu_heatmap', masu_heatmap, name='masu_heatmap'),
    path('/masu_heatmap/<str:pk>', masu_heatmap, name='masu_heatmap'),
    # path('/masu_heatmap_detail', masu_heatmap_detail, name='masu_heatmap_detail'),
    path('/delete', delete, name='delete'),
]


