from rest_framework.response import Response
from rest_framework import request
from .models import Water
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .serializers import WaterSerializer
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.http import Http404

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def user_water(request):
    print(
        'User ', f"{request.user.id} {request.user.email} {request.user.username}")
    if request.method == 'POST':
        serializer = WaterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        water_entries = Water.objects.filter(user_id=request.user.id)
        serializer = WaterSerializer(water_entries, many=True)
        return Response(serializer.data)

@api_view(['PUT','DELETE'])
@permission_classes([IsAuthenticated])
def edit_water(request, pk):
    water_entry = get_object_or_404(Water, pk=pk)
    if request.method == 'PUT':
        serializer = WaterSerializer (water_entry, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        water_entry.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
