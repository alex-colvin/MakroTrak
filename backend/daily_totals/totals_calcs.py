from consumed_foods.models import ConsumedFood
import datetime

today = datetime.datetime.now()
date = (today.strftime("%Y-%m-%d"))
calories = ConsumedFood.objects.filter(date=date)
print(calories)




#  fields = ['id','user','calories','water','weight','calories_burned','date']