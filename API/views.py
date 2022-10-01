import json

from django.http import HttpResponse
from requests import Response
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Room
from .serializers import RoomSerializer
from .services.CountUserRoom import CountUserRoom
from .services.chenge_status import _ChengeStatus
from .services.delete_room import _DeleteRoom
from .services.for_controller import _ForControl
from .services.get_user_status_room import GetUserStatusRoom
from .services.left_room import _LeftRoom
from .services.register import Register
from .services.create_room import _CreateRoom
from .services.expel_user import _ExpelUser
from .services.invite_room import _InviteRoom


@api_view(['POST'])
def RegisterUser(request):
    if request.method == 'POST':
        if request.content_type == 'application/json':
            if Register(json.loads(request.body)):
                return HttpResponse({'Great!'})
        else:
            return HttpResponse({'Content-Type not supported!'})
    return HttpResponse({'FATAL ERROR'})


@api_view(['POST'])
def CreateRoom(request):
    if request.method == 'POST':
        if _CreateRoom(request.user, json.loads(request.body)):
            return HttpResponse()
        else:
            return HttpResponse({'Content-Type not supported!'})
    return HttpResponse({'FATAL ERROR'})


@api_view(['POST'])
def ExpelRoom(request, pk_room, pk_user):
    if request.method == 'POST':
        if _ExpelUser(pk_room, pk_user, request.user):
            return HttpResponse({'Great!'})
        return HttpResponse({'FATAL ERROR'})


@api_view(['POST'])
def DeleteRoom(request, pk_room):
    if _DeleteRoom(pk_room, request.user):
        return HttpResponse({'Great!'})
    return HttpResponse({'FATAL ERROR'})


@api_view(['POST'])
def LeftRoom(request, pk_room):
    if _LeftRoom(pk_room, request.user):
        return HttpResponse({'Great!'})
    return HttpResponse({'FATAL ERROR'})


@api_view(['POST'])
def InviteRoom(request, link):
    if _InviteRoom(link, request.user):
        return HttpResponse({'Great!'})
    return HttpResponse({'FATAL ERROR'})


@api_view(['GET'])
def GetDataRoom(request):
    if request.method == 'GET':
        data_admin = Room.objects.filter(admin=request.user)
        data_moder = Room.objects.filter(moder=request.user)
        data_user = Room.objects.filter(user=request.user)
        serializer_admin = RoomSerializer(data_admin, context={'request': request}, many=True)
        serializer_moder = RoomSerializer(data_moder, context={'request': request}, many=True)
        serializer_user = RoomSerializer(data_user, context={'request': request}, many=True)
        return Response({'items': [{'admin_items': serializer_admin.data},
                                   {'moder_items': serializer_moder.data},
                                   {'user_items': serializer_user.data}]}
                        )
    return HttpResponse({'FATAL ERROR'})


@api_view(['GET'])
def GetCountUserRoom(request, pk_room):
    if request.method == 'GET':
        return Response({'count': CountUserRoom(pk_room)})
    return HttpResponse({'FATAL ERROR'})


@api_view(['POST'])
def ChengeStatus(request, pk_room, pk_user):
    if request.method == 'POST':
        if _ChengeStatus(pk_room, pk_user):
            return HttpResponse({'Great!'})
    return HttpResponse({'FATAL ERROR'})


@api_view(['GET'])
def GetUserAndStatusRoom(request, pk_room):
    if request.method == 'GET':
        return Response(GetUserStatusRoom(pk_room, request))
    return HttpResponse({'FATAL ERROR'})


@api_view(['GET'])
def ForControl(request, pk_room, pk_user):
    if request.method == 'GET':
        return Response(_ForControl(request, pk_room, pk_user))
    return HttpResponse({'FATAL ERROR'})
