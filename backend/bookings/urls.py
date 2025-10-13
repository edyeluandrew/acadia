

from django.urls import path
from .views import (
    # Public endpoints
    PublicBookingCreateView,
    CheckAvailabilityView,
    
)

app_name = 'bookings'




urlpatterns = [
    path('create/', PublicBookingCreateView.as_view(), name='booking-create'),
    path('check-availability/', CheckAvailabilityView.as_view(), name='check-availability'),
]



























