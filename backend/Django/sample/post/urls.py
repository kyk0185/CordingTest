from django.urls import path, include
from .views import RegistrationAPI, LoginAPI, UserAPI, ProfileUpdateAPI
from knox import views as knox_views

urlpatterns = [
    path("api/auth/register/", RegistrationAPI.as_view()),
    path("api/auth/login/", LoginAPI.as_view()),
    path("api/auth/user/", UserAPI.as_view()),
    path("api/auth/profile/<int:user_pk>/update/", ProfileUpdateAPI.as_view()),
    path("api/auth/logout/", knox_views.LogoutView.as_view(), name='knox_logout')
]
