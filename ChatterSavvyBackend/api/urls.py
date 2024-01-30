# api/urls.py
from django.urls import path
from .views import ChatGPTApi, BardApi

urlpatterns = [
    path('chatgpt/', ChatGPTApi.as_view(), name='chatgpt_api'),
    path('bard/', BardApi.as_view(), name='bard_api'),
]
