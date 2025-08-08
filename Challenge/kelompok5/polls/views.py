from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse


def index(request):
    return HttpResponse("Hello, TEMAN-TEMAN TERSAYANG DARI AFGAN & FRIENDs ;) This is the polls index page.")