from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from core import models


class TweetAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'text')

class UserAdmin(BaseUserAdmin):

    list_display = ['username', 'email', 'name']
    fieldsets = (
        (None, {'fields': ('username', 'email', 'password')}),
        (
            ('Permissions'),
            {
                'fields': (
                    'is_active',
                    'is_staff',
                    'is_superuser',
                )
            }
        ),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (
                'username',
                'email',
                'password1',
                'password2',
                'name',
                'is_active',
                'is_staff',
                'is_superuser',
            )
        }),
    )



admin.site.register(models.Tweet, TweetAdmin)
admin.site.register(models.User, UserAdmin)