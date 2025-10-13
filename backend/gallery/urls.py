from django.urls import path
from .views import GalleryImageListView

urlpatterns = [
    path('', GalleryImageListView.as_view(), name='gallery-list'),
]
