from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from rest_framework import mixins
from rest_framework.response import Response

from .models import Memo
from .serializers import MemoSerializer

# Create your views here.
 
class MemoSave(generics.UpdateAPIView):
    serializer_class = MemoSerializer
    def put(self, request):
        memo = request.data
        serializer = MemoSerializer(data=memo)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({"id": Memo.objects.last().id})

class MemoDelete(generics.DestroyAPIView):
    serializer_class = MemoSerializer
    def delete(self, request, *args, **kwargs):
        pass


class MemoList(mixins.ListModelMixin,
                 mixins.CreateModelMixin,
                 generics.GenericAPIView):
    queryset = Memo.objects.all()
    serializer_class = MemoSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class MemoDetail(mixins.UpdateModelMixin,
                    mixins.RetrieveModelMixin,
                    mixins.DestroyModelMixin,
                    generics.GenericAPIView):

    queryset = Memo.objects.all()
    serializer_class = MemoSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
