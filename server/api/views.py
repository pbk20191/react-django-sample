
from django.contrib.auth.models import User
from django.http.request import HttpRequest
from rest_framework import viewsets
from api.models import Question, Answer
from api.serializers import *
from rest_framework import status
from rest_framework.response import Response

# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    
    def perform_create(self, serializer: QuestionSerializer):
       serializer.save(author=self.request.user)
    #    super().perform_create(serializer)
    

class AnswerViewSet(viewsets.ModelViewSet):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    def perform_create(self, serializer: QuestionSerializer):
        serializer.save(author=self.request.user)