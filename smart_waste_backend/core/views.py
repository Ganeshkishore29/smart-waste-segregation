from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import WasteInput,Prediction
from .serializers import WasteInputSerializer,PredictionSerializer
from django.conf import settings
import joblib
import os

class PredictWasteAPIView(APIView):
    def post(self,request):
        waste_input_serializer=WasteInputSerializer(data=request.data)
        if waste_input_serializer.valid():
            waste_input=waste_input_serializer.save(user=request.user)   #  store the inputs in waste_input is for encode the input to predict   and links the inpusts to the user
            

            # load Ml model
            model_path=os.path.join(settings.BASE_DIR,'core','ml','waste_model.pkl')
            model=joblib.load(model_path)

            #encode the inputs for predicts
            features=[
                waste_input.weight,
                hash(waste_input.color)%10,
                hash(waste_input.size)%10,
                hash(waste_input.texture)%10,
                hash(waste_input.shape)%10
            ]

            #predict using the loaded model
            prediction=model.predict([features])[0]  # [0] is give prediction in str like 'orgainc/ without [0] is give list linke['organic]


            tips = {
                    "organic": "Use a compost bin for organic waste.",
                    "metal": "Place in metal recycling.",
                    "plastic": "Rinse and recycle plastic in the blue bin.",
                    "glass": "Dispose in the glass container section.",
                    "paper": "Shred and recycle paper in dry waste.",
                    "e-waste": "Take e-waste to an authorized recycling center.",
                    "rubber": "Reuse or dispose of rubber at special collection points.",
                    }
            
            recycle_tip=tips.get(prediction,"Dispose responsibly")