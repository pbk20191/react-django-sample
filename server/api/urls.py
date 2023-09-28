from django.http.response import JsonResponse
from django.urls import path

app_name = 'api'

def myView(request):
    return JsonResponse(data={ "value": True})

urlpatterns = [
    path("myView", myView)
]