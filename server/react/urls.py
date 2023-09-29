from django.urls import path, re_path
from django.conf.urls.static import static
from django.views.static import serve
from django.views.generic import RedirectView

urlpatterns = [
    path('', RedirectView.as_view(url='./app', permanent=True)),
    re_path(r'^app', serve, { 'path': '/index.html', 'document_root': '../client/dist/'}),
] + static('/', document_root= '../client/dist/')