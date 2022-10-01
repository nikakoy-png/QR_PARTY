import json

from requests import Response

from API import serializers
from API.models import Room, StatusUser_room, User


def getStatus(room):
    data = StatusUser_room.objects.filter(room_id=room.pk)
    data = serializers.StatusSerializer(data, many=True)
    data = {'statuses': [{'status': data.data}]}
    return data


def GetUserStatusRoom(pk_room, request):
    room = Room.objects.get(pk=pk_room)
    users = [room.admin.all(), room.moder.all(), room.user.all()]
    data_admin = serializers.UserSerializer(users[0], context={'request': request}, many=True)
    data_moder = serializers.UserSerializer(users[1], context={'request': request}, many=True)
    data_user = serializers.UserSerializer(users[2], context={'request': request}, many=True)
    data_user = {'users': [{'admin': data_admin.data},
                           {'moder': data_moder.data},
                           {'user': data_user.data}]}
    data_status = getStatus(room)

    data = {'items': [
        {'user': data_user},
        {'status': data_status}
    ]}

    return data
