import datetime
from django.conf import settings
from django.db import models
from pytz import timezone

from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin
)


class UserManager(BaseUserManager):
    """Manager for users."""

    def create_user(self, username, password, **kwargs):
        if not username:
            raise ValueError("User must have an username.")

        user = self.model(username=username, **kwargs)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, username, password):
        user = self.create_user(username,  password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user




class User(AbstractBaseUser, PermissionsMixin):
    """User in the system."""
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(max_length = 255, unique=True)
    contact = models.CharField(max_length=10, blank=True, default='')
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default = True)
    is_staff = models.BooleanField(default = False)

    objects = UserManager()

    USERNAME_FIELD = 'username'

    def __str__(self):
        return self.username








class Tweet(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,)
    id = models.AutoField(primary_key=True)
    timestamp = models.DateTimeField(default=datetime.datetime.now())
    likes = models.IntegerField(default = 0)
    text = models.TextField()

    def __str__(self):
        return self.text
