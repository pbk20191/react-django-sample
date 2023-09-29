from rest_framework import serializers
from django.contrib.auth.models import User
from api.models import Answer, Question


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        exclude = ['voter', 'author']
        depth = 1
    
class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        exclude = ['voter', 'author']
        depth = 1

# Serializers define the API representation.
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'is_staff']