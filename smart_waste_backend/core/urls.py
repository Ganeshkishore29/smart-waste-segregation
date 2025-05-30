from django.urls import path
from .views import PredictWasteAPIView,RegisterUserView
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView

urlpatterns=[
    path('predict/',PredictWasteAPIView.as_view(),name="predict-waste"),
    path('token/',TokenObtainPairView.as_view(),name='token-obtain'),
    path('token/refresh/',TokenRefreshView.as_view(),name='token-refresh'),
    path('register/',RegisterUserView.as_view(),name='register')
]