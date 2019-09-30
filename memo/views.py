from django.shortcuts import render
from rest_framework import generics

from .models import Memo
from .serializers import MemoSerializer

# Create your views here.
class MemoList(generics.ListCreateAPIView):
    queryset = Memo.objects.all()
    serializer_class = MemoSerializer

class MemoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Memo.objects.all()
    serializer_class = MemoSerializer