from django.urls import path

from . import views

urlpatterns = [
    path('', views.MemoList.as_view()),
    path('<int:pk>/', views.MemoDetail.as_view()),
]