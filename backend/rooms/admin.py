
from django.contrib import admin
from .models import RoomType, Room

@admin.register(RoomType)
class RoomTypeAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'slug', 'base_price', 'capacity', 'total_rooms', 'image']
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
    )
    
    def total_rooms(self, obj):
        return obj.rooms.filter(is_active=True).count()
    total_rooms.short_description = 'Active Rooms'


@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ['id', 'number', 'room_type', 'is_active', 'created_at']
    list_filter = ['room_type', 'is_active']
    search_fields = ['number']
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













# from django.contrib import admin
# from .models import RoomType, Room

# @admin.register(RoomType)
# class RoomTypeAdmin(admin.ModelAdmin):
#     list_display = ('name','base_price','capacity')

# @admin.register(Room)
# class RoomAdmin(admin.ModelAdmin):
#     list_display = ('number','room_type','is_active')
#     list_filter = ('is_active','room_type')
