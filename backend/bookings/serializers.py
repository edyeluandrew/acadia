

from rest_framework import serializers
from .models import Booking


class BookingSerializer(serializers.ModelSerializer):
    """Simple booking serializer"""
    nights = serializers.IntegerField(read_only=True)
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    
    class Meta:
        model = Booking
        fields = [
            'id', 'full_name', 'email', 'phone',
            'room_type', 'room', 
            'check_in', 'check_out', 'guests',
            'status', 'status_display',
            'nights', 'total_price',
            'special_requests', 'created_at'
        ]
        read_only_fields = ['id', 'room', 'status', 'created_at']
    
    def validate(self, data):
        """Validate dates"""
        if data.get('check_out') and data.get('check_in'):
            if data['check_out'] <= data['check_in']:
                raise serializers.ValidationError(
                    "Check-out must be after check-in"
                )
        return data
    
    
class PublicBookingSerializer(serializers.ModelSerializer):
    """
    Public serializer for creating bookings (frontend)
    Hides sensitive fields like room assignment
    """
    nights = serializers.IntegerField(read_only=True)
    total_price = serializers.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        read_only=True
    )
    
    class Meta:
        model = Booking
        fields = [
            'id',
            'full_name',
            'email',
            'phone',
            'room_type',
            'check_in',
            'check_out',
            'guests',
            'special_requests',
            'nights',
            'total_price',
            'created_at'
        ]
        read_only_fields = ['id', 'created_at']
    
    def validate(self, data):
        """Validate booking dates and availability"""
        check_in = data.get('check_in')
        check_out = data.get('check_out')
        
        # Validate dates
        if check_out and check_in:
            if check_out <= check_in:
                raise serializers.ValidationError({
                    'check_out': 'Check-out must be after check-in'
                })
        
        # Validate capacity
        room_type = data.get('room_type')
        guests = data.get('guests', 1)
        
        if room_type and guests > room_type.capacity:
            raise serializers.ValidationError({
                'guests': f'Room type "{room_type.name}" has maximum capacity of {room_type.capacity} guests'
            })
        
        # Check availability
        if room_type and check_in and check_out:
            available_rooms = Booking.objects.get_available_rooms(
                room_type, check_in, check_out
            )
            
            if not available_rooms.exists():
                raise serializers.ValidationError(
                    f'No rooms of type "{room_type.name}" are available for the selected dates'
                )
        
        return data





















