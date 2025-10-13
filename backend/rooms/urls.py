from django.urls import path
from .views import RoomTypeListView, RoomTypeDetailView, RoomListView

urlpatterns = [
    path('room-types/', RoomTypeListView.as_view(), name='roomtype-list'),
    path('room-types/<int:pk>/', RoomTypeDetailView.as_view(), name='roomtype-detail'),
    path('rooms/', RoomListView.as_view(), name='room-list'),
]
