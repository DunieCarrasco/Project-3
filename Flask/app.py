# 1. import Flask
from flask import Flask,render_template,jsonify,url_for,json
from bson import ObjectId, json_util
from pymongo import MongoClient
import os

# 2. Create an app
app = Flask(__name__)

title = "Geospatial Visualization of USDA Agricultural Census Data"
heading = "Understanding trends in American agriculture over time."

client = MongoClient('mongodb+srv://dmldatasci:Jabberwocky%231116@howmuchwhere.kjyq7iq.mongodb.net/test')
db = client.howmuchwhere
data = db.census_numberoperations_state

# 1. Define what to do when a user hits the home route
@app.route("/")
def home():
   return render_template('home.html')
   

# 2. Send the json data
@app.route('/send')
def send():
    return app.send_static_file('usda_survey_splitted.json')
    


# 3. About route
@app.route("/about")
def about():
    return render_template('about.html')


# 3. About route
@app.route("/map")
def drawMap():
    return render_template('map.html')

@app.route('/commodity-map')
def commodityMap():
    data = db.census_numberoperations_state
    all_2017_data = data.find({'Year' : 2017})
    list_data = []
    for d in all_2017_data:
        list_data.append(d)

    return json.dumps(list_data, default=json_util.default)


if __name__ == "__main__":
    app.run(debug=True)
