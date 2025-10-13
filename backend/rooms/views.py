from django.shortcuts import render
from rest_framework import generics
from .models import RoomType, Room
from .serializers import RoomTypeSerializer, RoomSerializer

class RoomTypeListView(generics.ListAPIView):
    queryset = RoomType.objects.all()
    serializer_class = RoomTypeSerializer
    
class RoomTypeDetailView(generics.RetrieveAPIView):
    queryset = RoomType.objects.all()
    serializer_class = RoomTypeSerializer
    
class RoomListView(generics.ListAPIView):
    queryset = Room.objects.select_related("room_type").all()
    serializer_class = RoomSerializer

    
