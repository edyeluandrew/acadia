
from rest_framework import serializers
from .models import RoomType, Room

class RoomTypeSerializer(serializers.ModelSerializer):
    available_rooms_count = serializers.SerializerMethodField()
    image = serializers.ImageField(required=False, allow_null=True)
    
    class Meta:
        model = RoomType
        fields = ['id', 'name', 'slug', 'describtion', 'base_price', 'capacity', 'available_rooms_count', 'image']
    
    def get_available_rooms_count(self, obj):
        """Get count of available rooms for this type (for given dates if provided)"""
        # Import here to avoid circular import
        from bookings.models import Booking
        
        request = self.context.get('request')
        if not request:
            return obj.rooms.filter(is_active=True).count()
        
        check_in = request.query_params.get('check_in')
        check_out = request.query_params.get('check_out')
        
        if not check_in or not check_out:
            return obj.rooms.filter(is_active=True).count()
        
        try:
            from datetime import datetime
            check_in_date = datetime.strptime(check_in, '%Y-%m-%d').date()
            check_out_date = datetime.strptime(check_out, '%Y-%m-%d').date()
            
            # Get rooms of this type that are NOT booked
            all_rooms = obj.rooms.filter(is_active=True)
            booked_room_ids = Booking.objects.filter(
                room__room_type=obj,
                # status__in=[Booking.STATUS_CONFIRMED, Booking.STATUS_CHECKED_IN],
                status__in=['confirmed', 'checked_in'],
                check_in__lt=check_out_date,
                check_out__gt=check_in_date
            ).values_list('room_id', flat=True)
            
            available_count = all_rooms.exclude(id__in=booked_room_ids).count()
            return available_count
        except (ValueError, TypeError):
            return obj.rooms.filter(is_active=True).count()


class RoomSerializer(serializers.ModelSerializer):
    room_type = RoomTypeSerializer(read_only=True)
    room_type_id = serializers.IntegerField(write_only=True, required=False)
    availability_status = serializers.SerializerMethodField()
    is_available = serializers.SerializerMethodField()
    
    class Meta:
        model = Room
        fields = [
            'id', 'number', 'room_type', 'room_type_id', 
            'is_active', 'availability_status', 'is_available', 
            'created_at'
        ]
    
    def get_availability_status(self, obj):
        """Return 'available' or 'booked' for display"""
        # Import here to avoid circular import
        from bookings.models import Booking
        
        request = self.context.get('request')
        if not request:
            return 'available' if obj.is_active else 'inactive'
        
        check_in = request.query_params.get('check_in')
        check_out = request.query_params.get('check_out')
        
        if not check_in or not check_out:
            return 'available' if obj.is_active else 'inactive'
        
        try:
            from datetime import datetime
            check_in_date = datetime.strptime(check_in, '%Y-%m-%d').date()
            check_out_date = datetime.strptime(check_out, '%Y-%m-%d').date()
            
            # Check if room has overlapping bookings
            has_booking = Booking.objects.filter(
                room=obj,
                # status__in=[Booking.STATUS_CONFIRMED, Booking.STATUS_CHECKED_IN],
                status__in=['confirmed', 'checked_in'],
                check_in__lt=check_out_date,
                check_out__gt=check_in_date
            ).exists()
            
            return 'booked' if has_booking else 'available'
        except (ValueError, TypeError):
            return 'available' if obj.is_active else 'inactive'
    
    def get_is_available(self, obj):
        """Boolean version of availability"""
        return self.get_availability_status(obj) == 'available'








