from django.db import models
from django.contrib.auth.models import User

class WasteInput(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    weight=models.FloatField()
    color=models.CharField(max_length=50)
    size=models.CharField(max_length=50)
    texture=models.CharField(max_length=50)
    shape=models.CharField(max_length=50)
    created_at=models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f" WasteInput by {self.user.username} at {self.created_at.strftime('%Y-%m-%d')}"


class Prediction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True) 
    waste_input = models.ForeignKey(WasteInput, on_delete=models.CASCADE)
    predicted_label = models.CharField(max_length=100)
    recycle_tip = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Prediction : {self.predicted_label}"


class AdminLog(models.Model):
    ACTION_CHOICES = [
    ("CREATE", "Create"),
    ("DELETE", "Delete"),
    ("UPDATE", "Update"),
    ("INFO", "Info")
    ]
    action=models.CharField(max_length=25, choices=ACTION_CHOICES)
    message=models.TextField(blank=True,null=True)
    user=models.ForeignKey(User,on_delete=models.SET_NULL,null=True,blank=True,limit_choices_to={'is_superuser':True})
    timestamp=models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"Log: {self.action} - {self.timestamp.strftime("%Y/%m/%d, %H:%M:%S")}"

class Feedback(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    prediction=models.ForeignKey(Prediction,on_delete=models.CASCADE)
    rating=models.IntegerField()
    comment=models.TextField(blank=True)
    submitted_at=models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"Feedback By {self.user.username}"