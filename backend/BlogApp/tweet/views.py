from django.shortcuts import render
from tweet import serializers
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework.decorators import action

from core.models import Tweet

# Create your views here.

class TweetViewSet(viewsets.ModelViewSet):

    serializer_class = serializers.TweetSerializer
    queryset = Tweet.objects.all()
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    # def list(self, request):
    #     user = request.user.username
    #     queryset = Tweet.objects.all().exclude(user=user).order_by('-date')
    #     serializer = serializers.TweetSerializer(queryset, many=True)
    #     # print(type(JsonResponse(serializer.data, safe=False)))
    #     return Response(serializer.data)


    # def destroy(self, request, pk=None):
    #     instance = self.get_object()
    #     self.perform_destroy(instance=instance)
    #     return Response(status=status.HTTP_204_NO_CONTENT)

    # @action(detail=False)
    # def user_tweets(self, request, **kwargs):
    #     user = request.GET.get('username')
    #     print(user)
    #     queryset = Tweet.objects.filter(user=user)
    #     serializer = serializers.TweetSerializer(queryset, many = True)
    #     return Response(serializer.data)

    def get_queryset(self):
        """Retrieve tweets for the authenticated user."""
        return self.queryset.filter(user=self.request.user).order_by('-date')

    def perform_create(self, serializer):
        print(self.request.user)
        serializer.save(user=self.request.user)







