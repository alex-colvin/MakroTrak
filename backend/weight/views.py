from rest_framework.response import Response
from rest_framework import request
from .models import Weight
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .serializers import WeightSerializer
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.http import Http404

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def user_weight(request):
    print(
        'User ', f"{request.user.id} {request.user.email} {request.user.username}")
    if request.method == 'POST':
        serializer = WeightSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        weight_entries = Weight.objects.filter(user_id=request.user.id)
        serializer = WeightSerializer(weight_entries, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['PUT','DELETE'])
@permission_classes([IsAuthenticated])
def edit_weight(request, pk):
    weight_entry = get_object_or_404(Weight, pk=pk)
    if request.method == 'PUT':
        serializer = WeightSerializer (weight_entry, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        weight_entry.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

