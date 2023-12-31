from django.urls import path, include

from rest_framework.routers import DefaultRouter

from tweet import views

router = DefaultRouter()
router.register('tweet', views.TweetViewSet)

app_name = 'tweet'

urlpatterns = [
    path('', include(router.urls)),
]