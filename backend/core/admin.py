
from django.contrib import admin
from .models import HotelInfo

@admin.register(HotelInfo)
class HotelInfoAdmin(admin.ModelAdmin):
    list_display = ('name','address','email')
