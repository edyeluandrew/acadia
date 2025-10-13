from django.db import models

from django.db import models

class GalleryImage(models.Model):
    # CATEGORY_CHOICES = [
    #     ('rooms','Rooms'),
    #     ('meals','Meals'),
    #     ('bar','Bar'),
    #     ('hotel','Hotel'),
    #     ('events','Events'),
    # ]
    title = models.CharField(max_length=150, blank=True)
    # category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    image = models.ImageField(upload_to='gallery/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title or 'Image'} ({self.category})"

