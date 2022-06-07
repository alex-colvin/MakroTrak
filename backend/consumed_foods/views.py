from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import ConsumedFoodSerializer
from .models import ConsumedFood
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
import datetime

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
# This get method grabs the consumed foods for the logged in user on the current day, totals the macros, and delivers to the front end. 
    elif request.method == 'GET':
        date = datetime.datetime.now()
        cals = 0
        fats = 0
        carbs = 0
        proteins = 0
        consumed_foods = ConsumedFood.objects.filter(user=request.user.id, date=date)
        for food in consumed_foods:
            cals += food.food.cal
            fats += food.food.fat
            carbs += food.food.carb
            proteins += food.food.protein
        #calculations for recommended macros based on a 2000 calorie diet
        cals = round((cals/2000)*100)
        fats = round((fats/66)*100)
        carbs = round((carbs/225)*100)
        proteins = round((proteins/125)*100)
        print(cals, fats, carbs, proteins)
        response = {"cals": cals, "fats": fats, "carbs": carbs, "proteins": proteins}
        print(response['cals'])
        serializer = ConsumedFoodSerializer(response, many=True)
        return Response(response, status=status.HTTP_200_OK)

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