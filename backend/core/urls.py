

from django.urls import path
from .views import HotelInfoDetail

urlpatterns = [
    path('', HotelInfoDetail.as_view(), name='hotel-info'),
]
