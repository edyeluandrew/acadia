


from django.db import transaction
from django.db.models import Q
from django.core.exceptions import ValidationError
from rooms.models import Room, RoomType
from .models import BookingRequest, Booking
from decimal import Decimal

class RoomUnavailableError(Exception):
    """Raised when no rooms are available for the requested dates"""
    pass

class BookingService:
    """Service class for handling booking operations"""
    
    @staticmethod
    def get_available_rooms(room_type, check_in, check_out):
        """
        Get all available rooms of a specific type for given dates.
        Returns queryset of available Room objects.
        """
        # Get all rooms of this type that are active
        all_rooms = Room.objects.filter(
            room_type=room_type,
            is_active=True
        )
        
        # Find rooms that have conflicting bookings
        booked_room_ids = Booking.objects.filter(
            room__room_type=room_type,
            status__in=[Booking.STATUS_CONFIRMED, Booking.STATUS_CHECKED_IN],
            check_in__lt=check_out,
            check_out__gt=check_in
        ).values_list('room_id', flat=True)
        
        # Return rooms that are NOT in the booked list
        available_rooms = all_rooms.exclude(id__in=booked_room_ids)
        return available_rooms
    
    @staticmethod
    def is_room_available(room, check_in, check_out):
        """Check if a specific room is available for given dates"""
        overlapping_bookings = Booking.objects.filter(
            room=room,
            status__in=[Booking.STATUS_CONFIRMED, Booking.STATUS_CHECKED_IN],
            check_in__lt=check_out,
            check_out__gt=check_in
        )
        return not overlapping_bookings.exists()
    
    @staticmethod
    def calculate_total_price(room_type, check_in, check_out):
        """Calculate total price based on number of nights"""
        nights = (check_out - check_in).days
        return room_type.base_price * nights
    
    @staticmethod
    @transaction.atomic
    def create_booking_request(full_name, email, phone, room_type, check_in, check_out, guests, message=''):
        """
        Create a booking request (not yet confirmed).
        Admin will approve and assign a room later.
        """
        # Check if there are any rooms available at all
        available_rooms = BookingService.get_available_rooms(room_type, check_in, check_out)
        
        if not available_rooms.exists():
            raise RoomUnavailableError(
                f"No rooms of type '{room_type.name}' are available for the selected dates"
            )
        
        # Check capacity
        if guests > room_type.capacity:
            raise ValidationError(
                f"Room type '{room_type.name}' has maximum capacity of {room_type.capacity} guests"
            )
        
        # Create the booking request
        booking_request = BookingRequest.objects.create(
            full_name=full_name,
            email=email,
            phone=phone,
            room_type=room_type,
            check_in=check_in,
            check_out=check_out,
            guests=guests,
            message=message
        )
        
        return booking_request
    
    @staticmethod
    @transaction.atomic
    def approve_booking_request(booking_request_id, room_id=None):
        """
        Approve a booking request and create a confirmed booking.
        If room_id is not provided, automatically assign an available room.
        """
        booking_request = BookingRequest.objects.select_for_update().get(id=booking_request_id)
        
        if booking_request.status != BookingRequest.STATUS_PENDING:
            raise ValidationError("Only pending booking requests can be approved")
        
        # Auto-assign room if not specified
        if room_id is None:
            available_rooms = BookingService.get_available_rooms(
                booking_request.room_type,
                booking_request.check_in,
                booking_request.check_out
            )
            
            if not available_rooms.exists():
                raise RoomUnavailableError("No rooms available for this booking")
            
            room = available_rooms.first()
        else:
            room = Room.objects.get(id=room_id)
            
            # Verify the room is of the correct type
            if room.room_type != booking_request.room_type:
                raise ValidationError("Selected room does not match requested room type")
            
            # Verify the room is available
            if not BookingService.is_room_available(room, booking_request.check_in, booking_request.check_out):
                raise RoomUnavailableError(f"Room {room.number} is not available for these dates")
        
        # Calculate total price
        total_price = BookingService.calculate_total_price(
            booking_request.room_type,
            booking_request.check_in,
            booking_request.check_out
        )
        
        # Create confirmed booking
        booking = Booking.objects.create(
            booking_request=booking_request,
            room=room,
            full_name=booking_request.full_name,
            email=booking_request.email,
            phone=booking_request.phone,
            check_in=booking_request.check_in,
            check_out=booking_request.check_out,
            guests=booking_request.guests,
            total_price=total_price,
            special_requests=booking_request.message,
            status=Booking.STATUS_CONFIRMED
        )
        
        # Update booking request status
        booking_request.status = BookingRequest.STATUS_APPROVED
        booking_request.save()
        
        return booking
    
    @staticmethod
    @transaction.atomic
    def decline_booking_request(booking_request_id, reason=''):
        """Decline a booking request"""
        booking_request = BookingRequest.objects.get(id=booking_request_id)
        
        if booking_request.status != BookingRequest.STATUS_PENDING:
            raise ValidationError("Only pending booking requests can be declined")
        
        booking_request.status = BookingRequest.STATUS_DECLINED
        if reason:
            booking_request.message = f"{booking_request.message}\n\nDeclined: {reason}"
        booking_request.save()
        
        return booking_request
    
    @staticmethod
    @transaction.atomic
    def cancel_booking(booking_id):
        """Cancel a confirmed booking"""
        booking = Booking.objects.get(id=booking_id)
        
        if booking.status == Booking.STATUS_CANCELLED:
            raise ValidationError("Booking is already cancelled")
        
        if booking.status == Booking.STATUS_CHECKED_OUT:
            raise ValidationError("Cannot cancel a completed booking")
        
        booking.status = Booking.STATUS_CANCELLED
        booking.save()
        
        return booking





















# from django.db import transaction
# from django.db.models import Q
# from rooms.models import Room
# from .models import BookingRequest

# class RoomUnavailableError(Exception):
#     pass

# def is_room_available(room, check_in, check_out):
#     # If you decide to create a concrete Booking model later, check overlapping confirmed bookings here.
#     # For now, this function is a placeholder.
#     return True

# def create_booking_request(full_name, email, phone, room_type, check_in, check_out, guests, message):
#     b = BookingRequest.objects.create(
#         full_name=full_name,
#         email=email,
#         phone=phone,
#         room_type=room_type,
#         check_in=check_in,
#         check_out=check_out,
#         guests=guests,
#         message=message
#     )
#     return b
