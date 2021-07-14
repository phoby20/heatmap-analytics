from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
import index.views as websocket_view
from django.conf.urls import url

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('index.urls')),
    path('analytics', include('analytics.urls')),
    path('main_story', include('main_story.urls')),
    # url(r'^websocket/', websocket_view.WebsocketView.as_view())
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)