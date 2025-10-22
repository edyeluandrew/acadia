
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import HotelInfo
from .serializers import HotelInfoSerializer

class HotelInfoDetail(APIView):
    
    def get(self, request):
        hotel = HotelInfo.objects.first()
        if not hotel:
            return Response(
                {"error": "Hotel information not found."},
                status=status.HTTP_404_NOT_FOUND
            )
        
        serializer = HotelInfoSerializer(hotel)
        return Response(serializer.data, status=status.HTTP_200_OK)













