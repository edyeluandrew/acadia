from django.contrib import admin

from django.contrib import admin
from .models import GalleryImage

@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    # list_display = ('title','category','uploaded_at')
    list_display = ('title', 'uploaded_at')
    # list_filter = ('category',)

