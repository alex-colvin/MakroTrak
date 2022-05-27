from rest_framework.decorators import api_view, permission_classes
from .models import DailyTotals
from .serializers import DailyTotalsSerializer
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
import datetime
from consumed_foods.models import ConsumedFood
from consumed_foods.serializers import ConsumedFoodSerializer
from django.db.models import Sum
from water.models import Water
from exercise.models import Exercise
# from weight.models import Weight

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def user_totals(request):
    if request.method == 'GET':
        totals = DailyTotals.objects.filter(user_id=request.user.id)
        serializer = DailyTotalsSerializer(totals, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        today = datetime.datetime.now()
        date = (today.strftime("%Y-%m-%d"))
        foods = ConsumedFood.objects.filter(date=date).aggregate(Sum('food__cal'))
        total_cal = foods['food__cal__sum']
        water = Water.objects.filter(date=date).aggregate(Sum('ounces'))
        total_h2o = water['ounces__sum']
        ex_cal = Exercise.objects.filter(date=date).aggregate(Sum('calories'))
        total_ex_cal = ex_cal['calories__sum']
        # weight_row = Weight.objects.filter(date=date)
        # weight = weight_row.weight
        serializer = DailyTotalsSerializer(data={'calories': total_cal,'water':total_h2o,'weight':180,'calories_burned':total_ex_cal,'date':date})
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT','DELETE'])
@permission_classes([IsAuthenticated])
def edit_totals(request, pk):
    totals = get_object_or_404(DailyTotals, pk=pk)
    if request.method == 'PUT':
        serializer = DailyTotalsSerializer(totals, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        totals.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

        