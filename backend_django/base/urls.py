from django.urls import path, include
from . import views

urlpatterns = [
    path("auth/", include("base.oauth.urls")),
    path("get_notes/", views.get_notes, name="get_notes"),
]
