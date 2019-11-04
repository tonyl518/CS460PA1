import numpy as np
import pandas as pd
"""
#Clean Users
data = pd.read_csv("Users.csv", sep = ';')
data = data.drop(["votes_funny","votes_useful","votes_cool","average_stars"],axis = 'columns')
data.to_csv(r'User_processed.csv',index = None, header = True)
"""
#Clean Review
data = pd.read_csv("Reviews.csv", sep = ';',quotechar = '`',escapechar = '\\')


data = data[["review_id","business_id","user_id","stars","review_text"]]

data.to_csv(r'Review_processed.csv',index = None, header = True)

"""
#Clean Checkins
data = pd.read_csv("Checkins.csv", sep = ';')
temp = data.columns.values
fris = []
for i in range(len(temp)):
    if 'Friday' in temp[i]:
        fris+=[temp[i]]
res = data[fris[0]]
for j in range(1,len(fris)):
    res = data[fris[j]] + res
data["Friday"] = res
data = data[["business_id","Friday"]]
data.to_csv(r'Checkins_processed.csv',index = None, header = True)


#Clean Business
data = pd.read_csv("Business.csv", sep = ';')
data = data[["business_id","business_name","categories","stars","active","review_count"]]
data.to_csv(r'Business_processed.csv',index = None, header = True)
"""
