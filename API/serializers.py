from rest_framework import serializers

from API.forms import User
from API.models import Room, StatusUser_room


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("pk", "username", "email")


class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = StatusUser_room
        fields = ('user', 'room', 'status')


class StatusUserSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True, many=True)
    status = StatusSerializer(read_only=True, many=True)

    class Meta:
        model = User
        fields = ("user", "status")


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ("pk", "name", "description", "invite_code")
