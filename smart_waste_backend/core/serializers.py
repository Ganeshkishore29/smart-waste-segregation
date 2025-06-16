from rest_framework  import serializers
from .models import Feedback,WasteInput,Prediction,AdminLog

class WasteInputSerializer(serializers.ModelSerializer):
    class Meta:
        model=WasteInput
        fields= ['weight', 'color', 'texture', 'size', 'shape']
        read_only_fields = ['user'] 
class PredictionSerializer(serializers.ModelSerializer):
    weight = serializers.FloatField(source='waste_input.weight')
    color = serializers.CharField(source='waste_input.color')
    texture = serializers.CharField(source='waste_input.texture')
    size = serializers.CharField(source='waste_input.size')
    shape = serializers.CharField(source='waste_input.shape')
    predicted_label = serializers.CharField()  
    recycle_tip = serializers.CharField()
    class Meta:
        model=Prediction
        fields=['id', 'weight', 'color', 'texture', 'size', 'shape', 'predicted_label','recycle_tip', 'created_at'] 
class FeedbackSerializer(serializers.ModelSerializer):
    predicted_label = serializers.CharField(source='prediction.predicted_label', read_only=True)
    created_at = serializers.DateTimeField(source='prediction.created_at', read_only=True)
    class Meta:
        model=Feedback
        fields='__all__'
        read_only_fields=['user',"prediction"] #user is set automatically (not from user input)
class AdminlogSerializer(serializers.ModelSerializer):
    class Meta:
        model=AdminLog
        fields='__all__'
        read_only_fields=['user','timestamp']
