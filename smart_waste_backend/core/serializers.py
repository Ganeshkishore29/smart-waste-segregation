from rest_framework  import serializers
from .models import Feedback,WasteInput,Prediction,AdminLog

class WasteInputSerializer(serializers.ModelSerializer):
    class Meta:
        model=WasteInput
        fields= '__all__'
        read_only_fields = ['user'] 
class PredictionSerializer(serializers.ModelSerializer):
    
    class Meta:
        model=Prediction
        fields='__all__'
class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model=Feedback
        fields='__all__'
        read_only_fields=['user',"prediction"] #user is set automatically (not from user input)
class AdminlogSerializer(serializers.ModelSerializer):
    class Meta:
        model=AdminLog
        fields='__all__'
        read_only_fields=['user','timestamp']