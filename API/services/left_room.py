from API.models import Room


def _LeftRoom(pk_room, user):
    room = Room.objects.get(pk=pk_room)
    room.user.remove(user)
    room.admin.remove(user)
    room.moder.remove(user)
    return True
