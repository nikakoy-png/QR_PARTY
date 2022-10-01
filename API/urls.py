from django.urls import include, re_path, path
from API import views

urlpatterns = [
    re_path(r'auth/', include('djoser.urls')),
    re_path(r'auth/', include('djoser.urls.jwt')),
    re_path(r'register/', views.RegisterUser),
    re_path(r'room/create', views.CreateRoom),
    re_path(r'room/get_room', views.GetDataRoom),
    path('room/get_user_for_control/<slug:pk_room>/user/<int:pk_user>', views.ForControl),
    re_path(r'room/get_count_user/(?P<pk_room>[0-9]+)$', views.GetCountUserRoom),
    re_path(r'room/get_user_status/(?P<pk_room>[0-9]+)$', views.GetUserAndStatusRoom),
    path('room/chenge_status/<slug:pk_room>/user/<int:pk_user>', views.ChengeStatus),
    path('room/get_user_from_room_for_qr/<slug:pk_room>/user/<int:pk_user>', views.ChengeStatus),
    re_path(r'room/delete/(?P<pk_room>[0-9]+)$', views.DeleteRoom),
    path('room/expel/<slug:pk_room>/user/<int:pk_user>', views.ExpelRoom),
    path('room/invite/<slug:link>', views.InviteRoom),
    re_path(r'room/left/(?P<pk_room>[0-9]+)$', views.LeftRoom),
]
