# 1. import Flask
from flask import Flask,render_template,jsonify,url_for,json

# 2. Create an app
app = Flask(__name__, static_url_path='/static/')

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

if __name__ == "__main__":
    app.run(debug=True)
