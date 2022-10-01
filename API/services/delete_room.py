from API.models import Room


def _DeleteRoom(pk, user):
    room = Room.objects.get(pk=pk)
    print(user)
    print(room.admin.all())
    for admin in room.admin.all():
        if admin == user:
            room.delete()
            return True
    return False

