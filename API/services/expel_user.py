from API.models import User, Room


def _ExpelUser(room, user_e, user):
    _user_e = User.objects.get(pk=user_e)
    _room = Room.objects.get(pk=room)
    for admin in _room.admin.all():
        if user == admin:
            for _admin in _room.admin.all():
                if _admin == _user_e:
                    return False
                else:
                    for moder in _room.moder.all():
                        if user == moder:
                            for __user in _room.user.all():
                                if __user == _user_e:
                                    _room.user.remove(_user_e)
                                    return True
            for moder in _room.moder.all():
                if moder == _user_e:
                    _room.moder.remove(_user_e)
                    return True
            for __user in _room.user.all():
                if __user == _user_e:
                    _room.user.remove(_user_e)
                    return True
    return False