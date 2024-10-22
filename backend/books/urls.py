from django.urls import path
from .views import BookListCreateView, BookDetailView
from . import views

urlpatterns = [
    path('books/', BookListCreateView.as_view(), name='book-list'),
    path('books/<int:pk>/', BookDetailView.as_view(), name='book-detail'),
    path('book/<str:title>/', views.fetch_book, name='fetch_book'),
]
