from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import WasteInput,Prediction
from .serializers import WasteInputSerializer,PredictionSerializer
from django.conf import settings
import joblib
import os
from rest_framework.permissions import AllowAny,IsAuthenticated
from django.contrib.auth.models import User

class PredictWasteAPIView(APIView):
    def post(self,request):
        permission_classes=[IsAuthenticated]
        waste_input_serializer=WasteInputSerializer(data=request.data)
        if waste_input_serializer.is_valid():
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
                    "Organic": "Use a compost bin for organic waste.",
                    "Metal": "Place in metal recycling.",
                    "Plastic": "Rinse and recycle plastic in the blue bin.",
                    "Glass": "Dispose in the glass container section.",
                    "Paper": "Shred and recycle paper in dry waste.",
                    "E-waste": "Take e-waste to an authorized recycling center.",
                    "Rubber": "Reuse or dispose of rubber at special collection points.",
                    }
            
            recycle_tip=tips.get(prediction,"Dispose responsibly")

            prediction_instance=Prediction.objects.create(
                waste_input=waste_input,
                predicted_label=prediction,
                recycle_tip=recycle_tip

            )

            response_data={
                'waste_input':WasteInputSerializer(waste_input).data,
                'prediction':PredictionSerializer(prediction_instance).data

            }
            return Response(response_data,status=status.HTTP_201_CREATED)
        return Response(waste_input_serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    

class RegisterUserView(APIView):
    permission_classes=[AllowAny]
    def post(self,request):
        username=request.data.get('username')
        password=request.data.get('password')

        if not username or not password:
            return Response({'error':'Username and Password is requried'},status=status.HTTP_400_BAD_REQUEST)
        if User.objects.filter(username=username):
            return Response({'error':'Username is already exixts'},status=status.HTTP_400_BAD_REQUEST)
        user=User.objects.create_user(username=username,password=password)
        return Response({'message':'User successfully created'},status=status.HTTP_201_CREATED)