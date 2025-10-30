

from django.db import models
from django.db.models import Q
from django.core.exceptions import ValidationError
from django.utils import timezone
from rooms.models import Room, RoomType


class BookingManager(models.Manager):
    """Custom manager for booking queries"""
    
    def get_available_rooms(self, room_type, check_in, check_out):
        """
        Get available rooms for a room type during the specified period.
        Returns a queryset of available Room objects.
        
        IMPORTANT: Only looks at confirmed/checked-in bookings that have a room assigned.
        Pending bookings are ignored since they don't have rooms assigned yet.
        """
        # Find all bookings that:
        # 1. Are confirmed or checked in (not pending)
        # 2. Have a room assigned (room is not null)
        # 3. Overlap with the requested dates
        overlapping_bookings = self.filter(
            status__in=['confirmed', 'checked_in'],  # Only active bookings
            room__room_type=room_type,  # Filter by room type through the room relationship
            room__isnull=False,  # Must have a room assigned
            # Date overlap check: booking overlaps if check_in < requested check_out AND check_out > requested check_in
            check_in__lt=check_out,
            check_out__gt=check_in
        ).values_list('room_id', flat=True).distinct()
        
        # Get all active rooms of this type that are NOT in overlapping bookings
        available_rooms = Room.objects.filter(
            room_type=room_type,
            is_active=True
        ).exclude(
            id__in=overlapping_bookings
        )
        
        return available_rooms

    
    
    
    
    # def get_available_rooms(self, room_type, check_in, check_out):
    #     """Get available rooms for given dates"""
    #     booked_room_ids = self.filter(
    #         room__room_type=room_type,
    #         status__in=['confirmed', 'checked_in'],
    #         check_in__lt=check_out,
    #         check_out__gt=check_in
    #     ).values_list('room_id', flat=True)
        
    #     return Room.objects.filter(
    #         room_type=room_type,
    #         is_active=True
    #     ).exclude(id__in=booked_room_ids)


class Booking(models.Model):
    """Single booking model - handles both requests and confirmations"""
    
    STATUS_CHOICES = [
        ('pending', 'Pending Review'),
        ('confirmed', 'Confirmed'),
        ('checked_in', 'Checked In'),
        ('checked_out', 'Checked Out'),
        ('cancelled', 'Cancelled'),
    ]
    
    # Guest info
    full_name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=50, blank=True)
    
    # Booking details
    room_type = models.ForeignKey(RoomType, on_delete=models.CASCADE)
    room = models.ForeignKey(
        Room, 
        on_delete=models.CASCADE, 
        related_name='bookings',
        null=True, 
        blank=True,
        help_text="Auto-assigned when booking is confirmed"
    )
    check_in = models.DateField()
    check_out = models.DateField()
    guests = models.PositiveIntegerField(default=1)
    
    # Status and notes
    status = models.CharField(
        max_length=20, 
        choices=STATUS_CHOICES, 
        default='pending'
    )
    special_requests = models.TextField(blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    objects = BookingManager()
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['room', 'room_type', 'check_in', 'check_out']),
            models.Index(fields=['status']),
        ]
    
    def clean(self):
        """Validate booking"""
        if self.check_out <= self.check_in:
            raise ValidationError("Check-out must be after check-in")
        
        if self.check_in < timezone.now().date():
            raise ValidationError("Check-in cannot be in the past")
        
        if self.guests > self.room_type.capacity:
            raise ValidationError(
                f"Room type '{self.room_type.name}' has max capacity of {self.room_type.capacity}"
            )
        
        if self.room and self.status in ['confirmed', 'checked_in']:
            overlapping = Booking.objects.filter(
                room=self.room,
                status__in=['confirmed', 'checked_in']
            )
            
            if self.pk:
                overlapping = overlapping.exclude(pk=self.pk)
            
            overlapping = overlapping.filter(
                Q(check_in__lt=self.check_out) & Q(check_out__gt=self.check_in)
            )
            
            if overlapping.exists():
                raise ValidationError(
                    f"Room {self.room.number} is already booked for these dates"
                )
    
    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)
    
    def __str__(self):
        room_info = f"Room {self.room.number}" if self.room else "No room assigned"
        return f"{self.full_name} - {room_info} ({self.get_status_display()})"
    
    @property
    def nights(self):
        """Calculate number of nights"""
        if self.check_in and self.check_out:
            return (self.check_out - self.check_in).days
        return 0
    
    @property
    def total_price(self):
        """Calculate total price"""
        if self.nights and self.room_type:
            return self.room_type.base_price * self.nights
        return 0
    
    def confirm(self, room=None):
        """Confirm booking and assign room"""
        if self.status != 'pending':
            raise ValidationError("Only pending bookings can be confirmed")
        
        if not room:
            available = Booking.objects.get_available_rooms(
                self.room_type, self.check_in, self.check_out
            )
            if not available.exists():
                raise ValidationError("No rooms available")
            room = available.first()
        
        self.room = room
        self.status = 'confirmed'
        self.save()
    
    def cancel(self):
        """Cancel booking"""
        if self.status == 'checked_out':
            raise ValidationError("Cannot cancel completed booking")
        self.status = 'cancelled'
        self.save()
    
    def mark_check_in(self):
        """Mark as checked in"""
        if self.status != 'confirmed':
            raise ValidationError("Only confirmed bookings can be checked in")
        self.status = 'checked_in'
        self.save()
    
    def mark_check_out(self):
        """Mark as checked out"""
        if self.status != 'checked_in':
            raise ValidationError("Only checked-in bookings can be checked out")
        self.status = 'checked_out'
        self.save()























