
# rooms/admin.py
from django.contrib import admin
from django.utils.html import format_html
from .models import RoomType, Room

@admin.register(RoomType)
class RoomTypeAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'slug', 'base_price', 'capacity', 'total_rooms', 'image_preview']
    search_fields = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}
    list_filter = ['capacity']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'slug', 'description')
        }),
        ('Pricing & Capacity', {
            'fields': ('base_price', 'capacity')
        }),
        ('Media', {
            'fields': ('image', 'image_preview_large'),
            'description': 'Upload room type image'
        }),
    )
    
    readonly_fields = ['image_preview_large']
    
    def total_rooms(self, obj):
        return obj.rooms.filter(is_active=True).count()
    total_rooms.short_description = 'Active Rooms'
    
    def image_preview(self, obj):
        """Small preview for list view"""
        if obj.image:
            return format_html(
                '<img src="{}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px; border: 1px solid #ddd;" />',
                obj.image.url
            )
        return format_html('<span style="color: #999;">No Image</span>')
    image_preview.short_description = 'Preview'
    
    def image_preview_large(self, obj):
        """Large preview in the form"""
        if obj.image:
            return format_html(
                '<img src="{}" style="max-width: 300px; max-height: 300px; object-fit: contain; border: 1px solid #ddd; border-radius: 8px;" />'
                '<br><small style="color: #666;">Current image</small>',
                obj.image.url
            )
        return format_html('<span style="color: #999;">No image uploaded yet</span>')
    image_preview_large.short_description = 'Current Image'


@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ['id', 'number', 'room_type', 'is_active', 'created_at']
    list_filter = ['room_type', 'is_active']
    search_fields = ['number', 'room_type__name']
    list_editable = ['is_active']
    
    fieldsets = (
        ('Room Details', {
            'fields': ('room_type', 'number', 'is_active')
        }),
        ('Metadata', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )
    
    readonly_fields = ['created_at']
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('room_type')


# Customize admin site
admin.site.site_header = "Hotel Management System"
admin.site.site_title = "Hotel Admin Portal"
admin.site.index_title = "Welcome to Hotel Administration"



