from API.models import StatusUser_room


def _ChengeStatus(pk_room, pk_user):
    obj = StatusUser_room.objects.get(user=pk_user, room=pk_room)
    if obj.status:
        obj.status = False
    else:
        obj.status = True
    obj.save()
    return True
