import joblib,os
path=os.path.dirname(os.path.abspath(__file__))
data_path=os.path.join(path,'le_color.pkl')
le_color = joblib.load('le_color.pkl')
print(le_color.classes_)  # To see the classes it learned
