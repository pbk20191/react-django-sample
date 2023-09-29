from django.http.response import JsonResponse
from django.urls import include, path
from django.urls import path, include
from rest_framework import routers

from api.views import *

app_name = 'api'

def myView(request):
    return JsonResponse(data={ "value": True})


# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'answer', AnswerViewSet)
router.register(r'question', QuestionViewSet)



# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.

urlpatterns = [
    path("myView", myView),
    path('', include(router.urls)),
    path('auth/', include('rest_framework.urls', namespace='rest_framework'))
]