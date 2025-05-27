import pandas as pd 
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import joblib
import os
from sklearn.metrics import accuracy_score


#load dataset -waste_data.csv
BASE_DIR=os.path.dirname(os.path.abspath(__file__))
data_path=os.path.join(BASE_DIR,'waste_data.csv')
df=pd.read_csv(data_path)


#label enoceder
le_color=LabelEncoder()
le_texture=LabelEncoder()
le_size=LabelEncoder()
le_shape=LabelEncoder()
le_label=LabelEncoder()


df['color']=le_color.fit_transform(df['color'])
df['texture']=le_texture.fit_transform(df['texture'])
df['size']=le_size.fit_transform(df['size'])
df['shape']=le_shape.fit_transform(df['shape'])
df['label']=le_label.fit_transform(df['label'])


#split the inputs(features) and output(label)
X=df[['weight','color','texture','size','shape']]  # 2D array- 1 sample with 5 features
y=df['label']


#split the train and test
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3,stratify=y, random_state=42) # sratify is split the label (if plastic is 3 in dataset it will by 2plastic is train and other is test/ if is not all three plastics is move to the train)


#train Ml model
model=GradientBoostingClassifier()
model.fit(X_train,y_train)  #train the model. by given data

#test
y_pred=model.predict(X_test)
accuracy=accuracy_score(y_pred,y_test)
print(f"accuracy: {accuracy*100}")


#save model and encoder
model_path=os.path.join(BASE_DIR,'waste_model.pkl')
joblib.dump(model,model_path)
encoder_color_path = os.path.join(BASE_DIR, 'le_color.pkl')
encoder_texture_path = os.path.join(BASE_DIR, 'le_texture.pkl')
encoder_size_path = os.path.join(BASE_DIR, 'le_size.pkl')
encoder_shape_path = os.path.join(BASE_DIR, 'le_shape.pkl')
encoder_label_path = os.path.join(BASE_DIR, 'le_label.pkl')

joblib.dump(le_color, encoder_color_path)
joblib.dump(le_texture, encoder_texture_path)
joblib.dump(le_size, encoder_size_path)
joblib.dump(le_shape, encoder_shape_path)
joblib.dump(le_label, encoder_label_path)

le_label = joblib.load(encoder_label_path)
print(le_label.classes_)
