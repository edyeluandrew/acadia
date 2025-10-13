from django.db import models
from django.db import models

class Service(models.Model):
    name = models.CharField(max_length=120)
    short_description = models.CharField(max_length=255, blank=True)
    description = models.TextField(blank=True)
    icon = models.ImageField(upload_to='services/icons/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
