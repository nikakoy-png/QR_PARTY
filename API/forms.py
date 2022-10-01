from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm
from django import forms
from django.contrib.contenttypes.fields import GenericRelation
from django.forms import ModelForm
from django.utils.translation import gettext_lazy as _

from API.models import Room, StatusUser_room

User = get_user_model()


class RoomCreationForm(ModelForm):
    name = forms.CharField(max_length=150)
    description = forms.TextInput()

    class Meta:
        model = Room
        fields = ['name', 'description']


class StatusUser_roomForm(ModelForm):
    user = forms.ModelChoiceField(queryset=User.objects.all())
    room = forms.ModelChoiceField(queryset=Room.objects.all())

    class Meta:
        model = StatusUser_room
        fields = ['user', 'room']


class UserCreationForm(UserCreationForm):
    email = forms.EmailField(
        label=_("Email"),
        max_length=254,
        widget=forms.EmailInput(attrs={'autocomplete': 'email'})
    )

    class Meta(UserCreationForm.Meta):
        model = User
        fields = ("username", "email")
