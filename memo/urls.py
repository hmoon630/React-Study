from django.urls import path

from . import views

urlpatterns = [
    path('', views.MemoList.as_view()),
    path('add/<str:pk>', views.MemoList.as_view()),
    path('delete/<str:pk>',views.MemoDetail.as_view()),
    path('save/<str:pk>', views.MemoDetail.as_view()),
    path('<str:pk>/', views.MemoDetail.as_view()),
]