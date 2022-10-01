from API import serializers
from API.models import User, Room, StatusUser_room


def _ForControl(request, pk_room, pk_user):
    print(pk_user)
    user = User.objects.get(pk=pk_user)
    room = Room.objects.get(pk=pk_room)
    status = StatusUser_room.objects.get(user=pk_user, room=pk_room)
    data_user = serializers.UserSerializer(user, many=False)
    data_room = serializers.RoomSerializer(room, many=False)
    data_status = serializers.StatusSerializer(status, many=False)
    print(data_user)
    print(data_room)
    print(data_status)
    return (
        {'items': [
                {'room': data_room.data},
                {'user': data_user.data},
                {'status': data_status.data},
            ]}
    )
