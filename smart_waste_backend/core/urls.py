from django.urls import path
from .views import PredictWasteAPIView,RegisterUserView,FeedbackCreateView,UserPredictionHistoryView,AdminlogView,GetUserView,LatestPredictionView
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView

urlpatterns=[
    path('predict/',PredictWasteAPIView.as_view(),name="predict-waste"),
    path('token/',TokenObtainPairView.as_view(),name='token-obtain'),
    path('token/refresh/',TokenRefreshView.as_view(),name='token-refresh'),
    path('register/',RegisterUserView.as_view(),name='register'),
    path('feedback/',FeedbackCreateView.as_view(),name="feedback-create"),
    path('prediction/history/',UserPredictionHistoryView.as_view(),name='user-prediction-history'),
    path('admin/log/',AdminlogView.as_view(),name='admin-log'),
    path('user/',GetUserView.as_view(),name='get-user'),
    path('prediction/latest/', LatestPredictionView.as_view(), name='latest-prediction'),

]