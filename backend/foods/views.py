from rest_framework.response import Response
from rest_framework import request
from .models import Food
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .serializers import FoodSerializer
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.http import Http404

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def user_foods(request):
    print(
        'User ', f"{request.user.id} {request.user.email} {request.user.username}")
    if request.method == 'POST':
        serializer = FoodSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        foods = Food.objects.filter(user_id=request.user.id)
        serializer = FoodSerializer(foods, many=True)
        return Response(serializer.data)

@api_view(['PUT','DELETE'])
@permission_classes([IsAuthenticated])
def edit_food(request, pk):
    # print(
    #     'User ', f"{request.user.id} {request.user.email} {request.user.username}")
    food=get_object_or_404(Food, pk=pk)
    if request.method == 'PUT':
        serializer = FoodSerializer(food, data=request.data, partial=True)
        if serializer.is_valid() == True:
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        food.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


        
