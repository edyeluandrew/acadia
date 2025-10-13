from django.shortcuts import render

from rest_framework import generics
from .models import HotelInfo
from .serializers import HotelInfoSerializer

class HotelInfoDetail(generics.RetrieveAPIView):
    queryset = HotelInfo.objects.all()
    serializer_class = HotelInfoSerializer
