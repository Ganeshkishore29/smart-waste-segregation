from django.contrib import admin
from .models import WasteInput,Prediction,Feedback,AdminLog
admin.site.register(WasteInput)
admin.site.register(Prediction)
admin.site.register(AdminLog)
admin.site.register(Feedback)


