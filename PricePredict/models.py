from django.db import models

class FlightPrice(models.Model):
    Dep_time = models.CharField(max_length=10)
    Journey_date = models.CharField(max_length=20)
    Arrival_time = models.CharField(max_length=10)
    Total_stops = models.IntegerField()
    duration_hr = models.IntegerField()
    dest = models.CharField(max_length=20)
    source = models.CharField(max_length=20)
    flight = models.CharField(max_length=20)
