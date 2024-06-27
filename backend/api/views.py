from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from . import serializers
from data.api_response import ApiResponse

@api_view(['POST'])
def post(request):
    try:
        serializer = serializers.PersonSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(ApiResponse(success=True, message="Data accepted!", data=serializer.data).json())
        else:
            return Response(ApiResponse(message="Some data is not valid!", data=serializer.errors).json())
    except Exception as e:
        return Response(ApiResponse(message=e).json())

@api_view(['GET'])
def get(request):
    return Response(ApiResponse(success=True, message="Test Success!").json())