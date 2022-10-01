from API.forms import RoomCreationForm, StatusUser_roomForm
import hashlib
import datetime

from API.models import Room


def _CreateRoom(user, data):
    print(3)
    now = datetime.datetime.now()
    form = RoomCreationForm(data)
    f_hash = str(user.username) + str(now)
    invite_code = hashlib.sha256(f_hash.encode('utf-8')).hexdigest()
    form.instance.invite_code = invite_code
    print(form.is_valid())
    if form.is_valid():
        form.save()
        form.instance.admin.add(user)
        data = {
            'user': user,
            'room': Room.objects.get(invite_code=invite_code),
        }
        form = StatusUser_roomForm(data)
        form.instance.status = True
        if form.is_valid():
            form.save()
    return True

