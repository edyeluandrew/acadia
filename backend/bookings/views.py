
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.core.mail import send_mail
from django.conf import settings
from .models import Booking
from .serializers import PublicBookingSerializer
from rooms.models import RoomType
from datetime import datetime
import threading
import logging

logger = logging.getLogger(__name__)


def send_email_async(subject, message, recipient_list):
    """Send email in a background thread to avoid blocking"""
    def send():
        try:
            send_mail(
                subject=subject,
                message=message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=recipient_list,
                fail_silently=False,
            )
            logger.info(f"Email sent successfully to {recipient_list}")
        except Exception as e:
            logger.error(f"Failed to send email: {e}")
    
    thread = threading.Thread(target=send)
    thread.daemon = True  # Thread will close when main program exits
    thread.start()


class PublicBookingCreateView(generics.CreateAPIView):
    """
    Create a new booking request (public endpoint)
    """
    permission_classes = [AllowAny]
    queryset = Booking.objects.all()
    serializer_class = PublicBookingSerializer
    
    def perform_create(self, serializer):
        """Save with pending status and send notification to admin"""
        booking = serializer.save(status='pending')
        
        # Send email notification to admin asynchronously
        self._send_admin_notification(booking)
    
    def _send_admin_notification(self, booking):
        """Send email notification to admin about new booking (non-blocking)"""
        subject = f'New Booking Request from {booking.full_name}'
        
        message = f"""
New Booking Request Received

Guest Details:
- Name: {booking.full_name}
- Email: {booking.email}
- Phone: {booking.phone}

Booking Details:
- Room Type: {booking.room_type.name}
- Check-in: {booking.check_in.strftime('%B %d, %Y')}
- Check-out: {booking.check_out.strftime('%B %d, %Y')}
- Nights: {booking.nights}
- Guests: {booking.guests}
- Total Price: ${booking.total_price}

Special Requests:
{booking.special_requests if booking.special_requests else 'None'}

Please log in to the admin panel to confirm this booking and assign a room.

Booking ID: #{booking.id}
"""
        
        # Send email asynchronously using threading
        send_email_async(
            subject=subject,
            message=message,
            recipient_list=[settings.ADMIN_EMAIL]
        )
    
    def create(self, request, *args, **kwargs):
        """Override to provide custom response"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        return Response({
            'success': True,
            'message': 'Booking request submitted successfully! You will receive a confirmation email once approved.',
            'booking_id': serializer.data.get('id')
        }, status=status.HTTP_201_CREATED)


class CheckAvailabilityView(APIView):
    """
    Check room availability for given dates
    """
    permission_classes = [AllowAny]
    
    def post(self, request):
        room_type_id = request.data.get('room_type_id')
        check_in = request.data.get('check_in')
        check_out = request.data.get('check_out')
        
        if not all([room_type_id, check_in, check_out]):
            return Response(
                {'error': 'room_type_id, check_in, and check_out required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            room_type = RoomType.objects.get(id=room_type_id)
            check_in_date = datetime.strptime(check_in, '%Y-%m-%d').date()
            check_out_date = datetime.strptime(check_out, '%Y-%m-%d').date()
            
            # Validate dates
            if check_out_date <= check_in_date:
                return Response(
                    {'error': 'Check-out must be after check-in'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Get available rooms
            available = Booking.objects.get_available_rooms(
                room_type, check_in_date, check_out_date
            )
            
            nights = (check_out_date - check_in_date).days
            total_price = room_type.base_price * nights
            
            return Response({
                'available': available.exists(),
                'available_count': available.count(),
                'room_type': room_type.name,
                'room_type_id': room_type.id,
                'nights': nights,
                'total_price': str(total_price),
                'price_per_night': str(room_type.base_price),
                'check_in': check_in_date.strftime('%Y-%m-%d'),
                'check_out': check_out_date.strftime('%Y-%m-%d'),
                
            })
            
        except RoomType.DoesNotExist:
            return Response(
                {'error': 'Room type not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        except ValueError:
            return Response(
                {'error': 'Invalid date format. Use YYYY-MM-DD'},
                status=status.HTTP_400_BAD_REQUEST
            )






























# from rest_framework import generics, status
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from rest_framework.permissions import AllowAny
# from django.core.mail import send_mail
# from django.conf import settings
# from .models import Booking
# from .serializers import PublicBookingSerializer
# from rooms.models import RoomType
# from datetime import datetime


# class PublicBookingCreateView(generics.CreateAPIView):
   
#     permission_classes = [AllowAny]
#     queryset = Booking.objects.all()
#     serializer_class = PublicBookingSerializer
    
#     def perform_create(self, serializer):
#         """Save with pending status and send notification to admin"""
#         booking = serializer.save(status='pending')
        
#         # Send email notification to admin
#         self._send_admin_notification(booking)
    
#     def _send_admin_notification(self, booking):
#         """Send email notification to admin about new booking"""
#         subject = f'New Booking Request from {booking.full_name}'
        
#         message = f"""
# New Booking Request Received

# Guest Details:
# - Name: {booking.full_name}
# - Email: {booking.email}
# - Phone: {booking.phone}

# Booking Details:
# - Room Type: {booking.room_type.name}
# - Check-in: {booking.check_in.strftime('%B %d, %Y')}
# - Check-out: {booking.check_out.strftime('%B %d, %Y')}
# - Nights: {booking.nights}
# - Guests: {booking.guests}
# - Total Price: ${booking.total_price}

# Special Requests:
# {booking.special_requests if booking.special_requests else 'None'}

# Please log in to the admin panel to confirm this booking and assign a room.

# Booking ID: #{booking.id}
# """
        
#         try:
#             send_mail(
#                 subject=subject,
#                 message=message,
#                 from_email=settings.DEFAULT_FROM_EMAIL,
#                 recipient_list=[settings.ADMIN_EMAIL],
#                 fail_silently=True,
#             )
#         except Exception as e:
#             print(f"Failed to send admin notification: {e}")


# class CheckAvailabilityView(APIView):
    
#     permission_classes = [AllowAny]
    
#     def post(self, request):
#         room_type_id = request.data.get('room_type_id')
#         check_in = request.data.get('check_in')
#         check_out = request.data.get('check_out')
        
#         if not all([room_type_id, check_in, check_out]):
#             return Response(
#                 {'error': 'room_type_id, check_in, and check_out required'},
#                 status=status.HTTP_400_BAD_REQUEST
#             )
        
#         try:
#             room_type = RoomType.objects.get(id=room_type_id)
#             check_in_date = datetime.strptime(check_in, '%Y-%m-%d').date()
#             check_out_date = datetime.strptime(check_out, '%Y-%m-%d').date()
            
#             # Validate dates
#             if check_out_date <= check_in_date:
#                 return Response(
#                     {'error': 'Check-out must be after check-in'},
#                     status=status.HTTP_400_BAD_REQUEST
#                 )
            
#             # Get available rooms
#             available = Booking.objects.get_available_rooms(
#                 room_type, check_in_date, check_out_date
#             )
            
#             nights = (check_out_date - check_in_date).days
#             total_price = room_type.base_price * nights
            
#             return Response({
#                 'available': available.exists(),
#                 'available_count': available.count(),
#                 'room_type': room_type.name,
#                 'nights': nights,
#                 'total_price': str(total_price),
#                 'price_per_night': str(room_type.base_price)
#             })
            
#         except RoomType.DoesNotExist:
#             return Response(
#                 {'error': 'Room type not found'},
#                 status=status.HTTP_404_NOT_FOUND
#             )
#         except ValueError:
#             return Response(
#                 {'error': 'Invalid date format. Use YYYY-MM-DD'},
#                 status=status.HTTP_400_BAD_REQUEST
#             )










# from rest_framework import generics, status
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from rest_framework.permissions import AllowAny
# from .models import Booking
# from .serializers import PublicBookingSerializer
# from .tasks import send_admin_notification_email
# from rooms.models import RoomType
# from datetime import datetime
# import logging

# logger = logging.getLogger(__name__)


# class PublicBookingCreateView(generics.CreateAPIView):
   
#     permission_classes = [AllowAny]
#     queryset = Booking.objects.all()
#     serializer_class = PublicBookingSerializer
    
#     def perform_create(self, serializer):
#         """Save with pending status and send notification to admin asynchronously"""
#         booking = serializer.save(status='pending')
        
#         # Send email notification to admin asynchronously
#         try:
#             send_admin_notification_email.delay(booking.id)
#             logger.info(f"Booking #{booking.id} created, admin notification email queued")
#         except Exception as e:
#             # Log error but don't fail the booking creation
#             logger.error(f"Failed to queue admin notification for booking #{booking.id}: {str(e)}")
    
#     def create(self, request, *args, **kwargs):
#         """Override to provide better response messaging"""
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         self.perform_create(serializer)
        
#         headers = self.get_success_headers(serializer.data)
        
#         return Response(
#             {
#                 'status': 'success',
#                 'message': 'Booking request submitted successfully! You will receive a confirmation email once your booking is confirmed.',
#                 'data': serializer.data
#             },
#             status=status.HTTP_201_CREATED,
#             headers=headers
#         )










