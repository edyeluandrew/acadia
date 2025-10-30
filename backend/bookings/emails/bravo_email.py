
import json
import requests
from django.core.mail.backends.base import BaseEmailBackend
from django.conf import settings

class BrevoEmailBackend(BaseEmailBackend):
    
    #Custom Django email backend to send emails via Brevo SMTP API.
    

    def send_messages(self, email_messages):
        """
        email_messages: a list of EmailMessage instances
        """
        if not email_messages:
            return 0

        sent_count = 0

        for message in email_messages:
            try:
                payload = {
                    "sender": {
                        "name": getattr(settings, "DEFAULT_FROM_NAME", "Hotel Nyumba"),
                        "email": getattr(settings, "DEFAULT_FROM_EMAIL", "umarkhemis9@gmail.com")
                    },
                    "to": [{"email": to} for to in message.to],
                    "subject": message.subject,
                    "htmlContent": message.body
                }

                headers = {
                    "accept": "application/json",
                    "api-key": settings.BREVO_API_KEY,
                    "content-type": "application/json"
                }

                response = requests.post(
                    "https://api.brevo.com/v3/smtp/email",
                    headers=headers,
                    data=json.dumps(payload),
                    timeout=10
                )

                if response.status_code in [200, 201, 202]:
                    sent_count += 1
                else:
                    if not self.fail_silently:
                        print("Brevo API error:", response.status_code, response.text)

            except Exception as e:
                if not self.fail_silently:
                    print("Email send error:", e)

        return sent_count
