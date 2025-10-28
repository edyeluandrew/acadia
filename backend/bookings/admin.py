


from django.contrib import admin
from django.utils.html import format_html
from django.contrib import messages
from .models import Booking
from .tasks import send_booking_confirmation_email, send_cancellation_email


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = [
        'id', 'full_name', 'room_type', 'room_display', 
        'check_in', 'check_out', 'nights', 
        'status_badge', 'total_price', 'created_at'
    ]
    list_filter = ['status', 'room_type']
    search_fields = ['full_name', 'email', 'phone', 'room__number']
    readonly_fields = ['created_at', 'updated_at', 'nights', 'total_price']
    date_hierarchy = 'check_in'
    
    fieldsets = (
        ('Guest Information', {
            'fields': ('full_name', 'email', 'phone')
        }),
        ('Booking Details', {
            'fields': (
                'room_type', 'room', 
                'check_in', 'check_out', 
                'guests', 'special_requests'
            )
        }),
        ('Status & Pricing', {
            'fields': ('status', 'nights', 'total_price', 'created_at', 'updated_at')
        }),
    )
    
    actions = [
        'confirm_bookings', 
        'cancel_bookings',
        'mark_checked_in',
        'mark_checked_out'
    ]
    
    def room_display(self, obj):
        """Display room number or pending"""
        if obj.room:
            return f"Room {obj.room.number}"
        return "Not assigned yet"
    room_display.short_description = 'Room'
    room_display.admin_order_field = 'room__number'
    
    def status_badge(self, obj):
        """Colored status badge"""
        colors = {
            'pending': '#ff9800',
            'confirmed': '#2196f3',
            'checked_in': '#4caf50',
            'checked_out': '#9e9e9e',
            'cancelled': '#f44336',
        }
        return format_html(
            '<span style="background: {}; color: white; padding: 3px 10px; '
            'border-radius: 3px; font-weight: bold;">{}</span>',
            colors.get(obj.status, '#9e9e9e'),
            obj.get_status_display()
        )
    status_badge.short_description = 'Status'
    
    def confirm_bookings(self, request, queryset):
        """Confirm selected pending bookings"""
        success = 0
        for booking in queryset.filter(status='pending'):
            try:
                booking.confirm()
                success += 1
                
                # Send confirmation email to guest asynchronously
                send_booking_confirmation_email.delay(booking.id)
                
            except Exception as e:
                self.message_user(
                    request, 
                    f"Failed to confirm booking #{booking.id}: {e}", 
                    messages.ERROR
                )
        
        if success:
            self.message_user(
                request, 
                f"Confirmed {success} booking(s). Confirmation emails are being sent.", 
                messages.SUCCESS
            )
    confirm_bookings.short_description = "Confirm selected bookings"
    
    def cancel_bookings(self, request, queryset):
        """Cancel selected bookings"""
        success = 0
        for booking in queryset.exclude(status__in=['cancelled', 'checked_out']):
            try:
                booking.cancel()
                success += 1
                
                # Send cancellation email to guest asynchronously
                send_cancellation_email.delay(booking.id)
                
            except Exception as e:
                self.message_user(
                    request, 
                    f"Failed to cancel booking #{booking.id}: {e}", 
                    messages.ERROR
                )
        
        if success:
            self.message_user(
                request, 
                f"Cancelled {success} booking(s). Cancellation emails are being sent.", 
                messages.SUCCESS
            )
    cancel_bookings.short_description = "Cancel selected bookings"
    
    def mark_checked_in(self, request, queryset):
        """Mark as checked in"""
        success = 0
        for booking in queryset.filter(status='confirmed'):
            try:
                booking.mark_checked_in()
                success += 1
            except Exception as e:
                self.message_user(
                    request, 
                    f"Failed to check in booking #{booking.id}: {e}", 
                    messages.ERROR
                )
        
        if success:
            self.message_user(
                request, 
                f"Marked {success} booking(s) as checked in", 
                messages.SUCCESS
            )
    mark_checked_in.short_description = "Mark as checked in"
    
    def mark_checked_out(self, request, queryset):
        """Mark as checked out"""
        success = 0
        for booking in queryset.filter(status='checked_in'):
            try:
                booking.mark_checked_out()
                success += 1
            except Exception as e:
                self.message_user(
                    request, 
                    f"Failed to check out booking #{booking.id}: {e}", 
                    messages.ERROR
                )
        
        if success:
            self.message_user(
                request, 
                f"Marked {success} booking(s) as checked out", 
                messages.SUCCESS
            )
    mark_checked_out.short_description = "Mark as checked out"
    
    def get_queryset(self, request):
        """Optimize queries"""
        return super().get_queryset(request).select_related(
            'room', 
            'room_type'
        )





























# from django.contrib import admin
# from django.utils.html import format_html
# from django.contrib import messages
# from .models import Booking
# from .emails import send_booking_confirmation_email, send_cancellation_email


# @admin.register(Booking)
# class BookingAdmin(admin.ModelAdmin):
#     list_display = [
#         'id', 'full_name', 'room_type', 'room_display', 
#         'check_in', 'check_out', 'nights', 
#         'status_badge', 'total_price', 'created_at'
#     ]
#     list_filter = ['status', 'room_type']
#     search_fields = ['full_name', 'email', 'phone', 'room__number']
#     readonly_fields = ['created_at', 'updated_at', 'nights', 'total_price']
#     date_hierarchy = 'check_in'
    
#     fieldsets = (
#         ('Guest Information', {
#             'fields': ('full_name', 'email', 'phone')
#         }),
#         ('Booking Details', {
#             'fields': (
#                 'room_type', 'room', 
#                 'check_in', 'check_out', 
#                 'guests', 'special_requests'
#             )
#         }),
#         ('Status & Pricing', {
#             'fields': ('status', 'nights', 'total_price', 'created_at', 'updated_at')
#         }),
#     )
    
#     actions = [
#         'confirm_bookings', 
#         'cancel_bookings',
#         'mark_checked_in',
#         'mark_checked_out'
#     ]
    
#     def room_display(self, obj):
#         """Display room number or pending"""
#         if obj.room:
#             return f"Room {obj.room.number}"
#         return "Not assigned yet"
#     room_display.short_description = 'Room'
#     room_display.admin_order_field = 'room__number'
    
#     def status_badge(self, obj):
#         """Colored status badge"""
#         colors = {
#             'pending': '#ff9800',
#             'confirmed': '#2196f3',
#             'checked_in': '#4caf50',
#             'checked_out': '#9e9e9e',
#             'cancelled': '#f44336',
#         }
#         return format_html(
#             '<span style="background: {}; color: white; padding: 3px 10px; '
#             'border-radius: 3px; font-weight: bold;">{}</span>',
#             colors.get(obj.status, '#9e9e9e'),
#             obj.get_status_display()
#         )
#     status_badge.short_description = 'Status'
    
#     def confirm_bookings(self, request, queryset):
#         """Confirm selected pending bookings"""
#         from django.core.mail import send_mail
#         from django.conf import settings
        
#         success = 0
#         for booking in queryset.filter(status='pending'):
#             try:
#                 booking.confirm()
#                 success += 1
                
#                 # Send confirmation email to guest
#                 self._send_guest_confirmation(booking)
                
#             except Exception as e:
#                 self.message_user(
#                     request, 
#                     f"Failed to confirm booking #{booking.id}: {e}", 
#                     messages.ERROR
#                 )
        
#         if success:
#             self.message_user(
#                 request, 
#                 f"Confirmed {success} booking(s) and sent confirmation emails", 
#                 messages.SUCCESS
#             )
#     confirm_bookings.short_description = "Confirm selected bookings"
    
#     def _send_guest_confirmation(self, booking):
#         """Send booking confirmation email to guest"""
#         from django.core.mail import send_mail
#         from django.conf import settings
        
#         subject = f'Booking Confirmed - {booking.room_type.name}'
        
#         message = f"""
# Dear {booking.full_name},

# Your booking has been confirmed! We're excited to welcome you.

# Booking Confirmation Details:
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# Booking ID: #{booking.id}
# Room: {booking.room.number if booking.room else 'TBA'}
# Room Type: {booking.room_type.name}

# Check-in: {booking.check_in.strftime('%A, %B %d, %Y')}
# Check-out: {booking.check_out.strftime('%A, %B %d, %Y')}
# Number of Nights: {booking.nights}
# Number of Guests: {booking.guests}

# Total Amount: ${booking.total_price}

# {'Special Requests: ' + booking.special_requests if booking.special_requests else ''}

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# Important Information:
# - Check-in time: 3:00 PM
# - Check-out time: 11:00 AM
# - Please bring a valid ID for check-in

# If you have any questions, please contact us at {settings.DEFAULT_FROM_EMAIL}

# We look forward to hosting you!

# Best regards,
# Hotel Management Team
# """
        
#         try:
#             send_mail(
#                 subject=subject,
#                 message=message,
#                 from_email=settings.DEFAULT_FROM_EMAIL,
#                 recipient_list=[booking.email],
#                 fail_silently=True,
#             )
#         except Exception as e:
#             print(f"Failed to send guest confirmation: {e}")
    
#     def cancel_bookings(self, request, queryset):
#         """Cancel selected bookings"""
#         success = 0
#         for booking in queryset.exclude(status__in=['cancelled', 'checked_out']):
#             try:
#                 booking.cancel()
#                 success += 1
#             except Exception as e:
#                 self.message_user(
#                     request, 
#                     f"Failed to cancel booking #{booking.id}: {e}", 
#                     messages.ERROR
#                 )
        
#         if success:
#             self.message_user(
#                 request, 
#                 f"Cancelled {success} booking(s)", 
#                 messages.SUCCESS
#             )
#     cancel_bookings.short_description = "Cancel selected bookings"
    
#     def mark_checked_in(self, request, queryset):
#         """Mark as checked in"""
#         success = 0
#         for booking in queryset.filter(status='confirmed'):
#             try:
#                 booking.mark_checked_in()
#                 success += 1
#             except Exception as e:
#                 self.message_user(
#                     request, 
#                     f"Failed to check in booking #{booking.id}: {e}", 
#                     messages.ERROR
#                 )
        
#         if success:
#             self.message_user(
#                 request, 
#                 f"Marked {success} booking(s) as checked in", 
#                 messages.SUCCESS
#             )
#     mark_checked_in.short_description = "Mark as checked in"
    
#     def mark_checked_out(self, request, queryset):
#         """Mark as checked out"""
#         success = 0
#         for booking in queryset.filter(status='checked_in'):
#             try:
#                 booking.mark_checked_out()
#                 success += 1
#             except Exception as e:
#                 self.message_user(
#                     request, 
#                     f"Failed to check out booking #{booking.id}: {e}", 
#                     messages.ERROR
#                 )
        
#         if success:
#             self.message_user(
#                 request, 
#                 f"Marked {success} booking(s) as checked out", 
#                 messages.SUCCESS
#             )
#     mark_checked_out.short_description = "Mark as checked out"
    
#     def get_queryset(self, request):
#         """Optimize queries"""
#         return super().get_queryset(request).select_related(
#             'room', 
#             'room_type'
#         )








