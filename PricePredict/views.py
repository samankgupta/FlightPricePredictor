from django.http import JsonResponse
import pickle
import numpy as np
import datetime
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import FlightPriceSerializer

dest_dict = ['Dest_Cochin', 'Dest_Delhi', 'Dest_Hyderabad','Dest_Kolkata','Dest_New_Delhi']
source_dict = ['Source_Chennai', 'Source_Delhi', 'Source_Kolkata','Source_Mumbai']
flight_dict = ['Air India','GoAir','IndiGo','Jet Airways','Jet Airways Business','Multiple carriers', 'Multiple carriers Premium economy','SpiceJet','Trujet','Vistara','Vistara Premium economy']

@api_view(['GET','POST'])
def predict(request):

    serializer = FlightPriceSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()

    model=pickle.load(open('static/rf_model.pkl','rb'))
    ans = list()
    Dep_time =request.POST['Dep_time']
    Journey_date = request.POST['Journey_date']
    Arrival_time = request.POST['Arrival_time']
    Total_Stops = int(request.POST['Total_Stops'])
    duration_hr = int(request.POST['duration_hr'])

    dest_ar = [0] * len(dest_dict)
    source_ar = [0] * len(source_dict)
    flight_ar = [0] * len(flight_dict)

    dest = request.POST['dest']
    source = request.POST['source']
    flight = request.POST['flight']
    
    dest_ind = dest_dict.index(dest) 
    dest_ar[dest_ind] = 1
    source_ind = source_dict.index(source) 
    source_ar[source_ind] = 1
    flight_ind = flight_dict.index(flight) 
    flight_ar[flight_ind] = 1

    Dep_Hr = int(Dep_time[:2])
    Dep_Min = int(Dep_time[3:])
    Arrival_Hr = int(Arrival_time[:2])
    Arrival_Min = int(Arrival_time[3:])
    Journey_Year = int(Journey_date[:4])
    Journey_Month = int(Journey_date[5:7])
    Journey_Day = int(Journey_date[8:])

    weekno = datetime.datetime(Journey_Year,Journey_Month,Journey_Day).weekday()
    if weekno>=5:
        is_weekend=1
    else:
        is_weekend=0

    ans += [Dep_Hr,Dep_Min,Journey_Month,Journey_Day,Arrival_Hr,Arrival_Min,is_weekend,duration_hr] + dest_ar + source_ar + [Total_Stops] + flight_ar
    
    data = np.array([ans])
    my_prediction = model.predict(data)[0]
    output='{0:.2f}'.format(my_prediction)

    return JsonResponse({"Prediction":output})