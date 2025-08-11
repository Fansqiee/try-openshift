from django.shortcuts import render

def index(request):
    return render(request, "index.html", {
        "title": "Kelompok 5 — Demo Interaktif",
        "msg": "Hello, TEMAN-TEMAN TERSAYANG DARI AFGAN & FRIENDs ;) This is the polls index page."
    })
