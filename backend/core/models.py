from django.db import models

from django.db import models

class HotelInfo(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    address = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=50, blank=True)
    google_map_embed = models.TextField(blank=True, null=True)  # embed html
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
