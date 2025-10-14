from flask import Flask, render_template, request, redirect, url_for, make_response
import os 
import json

app = Flask(__name__)
VOTES_FILE = 'encuestas.json'

@app.route('/')
def home():
    return render_template('home.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
