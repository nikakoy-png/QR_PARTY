from API.models import Room


def CountUserRoom(pk):
    room = Room.objects.get(pk=pk)
    admin = room.admin.count()
    moder = room.moder.count()
    user = room.user.count()
    count = admin + moder + user

    return count
