
from django.core.mail import send_mail
from django.conf import settings


def send_booking_confirmation_email(booking):
    """
    Send booking confirmation email to guest.
    Call this when admin confirms a booking.
    """
    subject = f'Booking Confirmed - {booking.room_type.name}'
    
    message = f"""
Dear {booking.full_name},

Your booking has been confirmed! We're excited to welcome you.

Booking Confirmation Details:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Booking ID: #{booking.id}
Room: {booking.room.number if booking.room else 'TBA'}
Room Type: {booking.room_type.name}

Check-in: {booking.check_in.strftime('%A, %B %d, %Y')}
Check-out: {booking.check_out.strftime('%A, %B %d, %Y')}
Number of Nights: {booking.nights}
Number of Guests: {booking.guests}

Total Amount: ${booking.total_price}

{'Special Requests: ' + booking.special_requests if booking.special_requests else ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Important Information:
- Check-in time: 3:00 PM
- Check-out time: 11:00 AM
- Please bring a valid ID for check-in

If you have any questions or need to make changes to your booking, 
please contact us at {settings.DEFAULT_FROM_EMAIL}

We look forward to hosting you!

Best regards,
Hotel Nyumba Management Team
"""
    
    try:
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[booking.email],
            fail_silently=False,
        )
        return True
    except Exception as e:
        print(f"Failed to send confirmation email: {e}")
        return False


def send_cancellation_email(booking):
    """
    Send cancellation notification to guest.
    Call this when a booking is cancelled.
    """
    subject = f'Booking Cancelled - Confirmation'
    
    message = f"""
Dear {booking.full_name},

Your booking has been cancelled.

Cancelled Booking Details:
- Booking ID: #{booking.id}
- Room Type: {booking.room_type.name}
- Check-in Date: {booking.check_in.strftime('%B %d, %Y')}
- Check-out Date: {booking.check_out.strftime('%B %d, %Y')}

If you did not request this cancellation or have any questions, 
please contact us immediately at {settings.DEFAULT_FROM_EMAIL}

Thank you,
Hotel Nyumba Management Team
"""
    
    try:
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[booking.email],
            fail_silently=True,
        )
        return True
    except Exception as e:
        print(f"Failed to send cancellation email: {e}")
        return False