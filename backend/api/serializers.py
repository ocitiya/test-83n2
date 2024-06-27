from . import models
from rest_framework import serializers

class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Person
        fields = ['name', 'identity_number', 'email', 'date_of_birth']