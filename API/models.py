from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

# Create your models here.


class User(AbstractUser):
    # Model of User
    pass


class Room(models.Model):
    # Model of Room
    user = models.ManyToManyField(User, blank=True, related_name='user_room')
    admin = models.ManyToManyField(User, blank=True, related_name='admin_room')
    moder = models.ManyToManyField(User, blank=True, related_name='moder_room')
    name = models.CharField(_("name room"), max_length=150, blank=True)
    description = models.CharField(_("description room"), max_length=150, blank=True)
    invite_code = models.CharField(_("invite_code"), max_length=150, blank=True)


class StatusUser_room(models.Model):
    # Model for status invited User in ROOM access YES or NOT (True or False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    status = models.BooleanField(default=False)
