from rest_framework  import serializers
from .models import Feedback,WasteInput,Prediction

class WasteInputSerializer(serializers.ModelSerializer):
    class Meta:
        model=WasteInput
        fields= ['weight', 'color', 'size', 'texture', 'shape']
        read_only_fields = ['user'] 
class PredictionSerializer(serializers.ModelSerializer):
    
    class Meta:
        model=Prediction
        fields='__all__'
class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model=Feedback
        fields='__all__'