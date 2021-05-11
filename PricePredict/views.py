from django.shortcuts import render
from django.http import HttpResponse
import pickle
import numpy as np

dest_dict = ['Dest_Cochin', 'Dest_Delhi', 'Dest_Hyderabad','Dest_Kolkata','Dest_New_Delhi']
source_dict = ['Source_Chennai', 'Source_Delhi', 'Source_Kolkata','Source_Mumbai']
flight_dict = ['Air India','GoAir','IndiGo','Jet Airways','Jet Airways Business','Multiple carriers', 'Multiple carriers Premium economy','SpiceJet','Trujet','Vistara','Vistara Premium economy']

def predict(request):
    model=pickle.load(open('static/rf_model.pkl','rb'))
    ans = list()
    Dep_Hr = int(request.GET['Dep_Hr'])
    Dep_Min = int(request.GET['Dep_Min'])
    Journey_Month = int(request.GET['Journey_Month'])
    Journey_Day = int(request.GET['Journey_Day'])
    Arrival_Hr = int(request.GET['Arrival_Hr'])
    Arrival_Min = int(request.GET['Arrival_Min'])
    Total_Stops = int(request.GET['Total_Stops'])
    try:
        if request.GET['is_weekend']:
            is_weekend = 1
    except:
        is_weekend = 0
    duration_hr = int(request.GET['duration_hr'])

    dest_ar = [0] * len(dest_dict)
    source_ar = [0] * len(source_dict)
    flight_ar = [0] * len(flight_dict)

    dest = request.GET['dest']
    source = request.GET['source']
    flight = request.GET['flight']
    
    dest_ind = dest_dict.index(dest) 
    dest_ar[dest_ind] = 1
    source_ind = source_dict.index(source) 
    source_ar[source_ind] = 1
    flight_ind = flight_dict.index(flight) 
    flight_ar[flight_ind] = 1
    
    ans += [Dep_Hr,Dep_Min,Journey_Month,Journey_Day,Arrival_Hr,Arrival_Min,is_weekend,duration_hr] + dest_ar + source_ar + [Total_Stops] + flight_ar
    
    data = np.array([ans])
    my_prediction = model.predict(data)[0]
    output='{0:.2f}'.format(my_prediction)

    return HttpResponse(output)