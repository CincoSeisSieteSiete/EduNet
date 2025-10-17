from flask import Flask, render_template, request, redirect, url_for, make_response
import os 
import json

app = Flask(__name__)

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/register') # methods=['GET', 'POST']
def register():
    return render_template('register.html')

# Cosas que ve el usuarios ya registrado
@app.route('/')
def home():
    return render_template('home.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
