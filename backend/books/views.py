# from django.shortcuts import render

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Book
from .serializers import BookSerializer
from django.http import JsonResponse
from .api import get_book_data

class BookListCreateView(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsAuthenticated]

class BookDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsAuthenticated]

def fetch_book(request, title):
    data = get_book_data(title)
    if data:
        return JsonResponse(data)
    return JsonResponse({'error': 'Book not found'}, status=404)
