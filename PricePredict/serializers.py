from rest_framework import serializers
from .models import FlightPrice

class FlightPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = FlightPrice
        fields = '__all__'