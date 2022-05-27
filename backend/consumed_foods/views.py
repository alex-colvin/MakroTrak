from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import ConsumedFoodSerializer
from .models import ConsumedFood
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def user_consumed_foods(request):
    print(
        'User ', f"{request.user.id} {request.user.email} {request.user.username}")
    if request.method == 'POST':
        serializer = ConsumedFoodSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user, food_id=request.data["food_id"])
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        consumed_foods = ConsumedFood.objects.filter(user=request.user.id)
        serializer = ConsumedFoodSerializer(consumed_foods, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['PUT','DELETE'])
@permission_classes([IsAuthenticated])
def edit_consumed_food(request, pk):
    consumed_food = get_object_or_404(ConsumedFood, pk=pk)
    if request.method == 'PUT':
        serializer = ConsumedFoodSerializer(consumed_food, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        consumed_food.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)