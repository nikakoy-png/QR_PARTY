from qrcode.image.styledpil import StyledPilImage
from qrcode.image.styles.colormasks import RadialGradiantColorMask

from API.forms import StatusUser_roomForm
from API.models import Room, StatusUser_room, User
import qrcode


def SavePNGQR(room, user):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )

    qr.add_data(f'http://localhost:3000/qr_code/{room}/{user}')
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white", image_factory=StyledPilImage,
                        color_mask=RadialGradiantColorMask())
    img.save(f'frontend/src/components/image/{room}_{user}.png')
    qr.clear()


def _InviteRoom(link, user):
    room = Room.objects.get(invite_code=link)
    data = {
        'user': user,
        'room': room,
        'status': False,
    }
    form = StatusUser_roomForm(data)
    if form.is_valid():
        try:
            StatusUser_room.objects.get(user_id=user.pk, room_id=room.pk)
        except:
            form.save()
            room.user.add(user)
        finally:
            SavePNGQR(user.pk, room.pk)
            return True
    return False
