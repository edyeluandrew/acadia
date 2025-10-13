from django.shortcuts import render

from rest_framework import generics
from .models import Service
from .serializers import ServiceSerializer

class ServiceList(generics.ListAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    
