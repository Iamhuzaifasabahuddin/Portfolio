import datetime
import json
import os
import random
from dotenv import load_dotenv
import requests
from flask import Flask, render_template, redirect, url_for, request
from jinja2 import TemplateNotFound
from flask_mysqldb import MySQL

app = Flask(__name__)
load_dotenv('databaseinfo.env')
app.config['MYSQL_HOST'] = os.environ.get('DB_HOST')
app.config['MYSQL_USER'] = os.environ.get('DB_USER')
app.config['MYSQL_PASSWORD'] = os.environ.get('DB_PASSWORD')
app.config['MYSQL_DB'] = os.environ.get('DB_DATABASE')

database = MySQL(app)


@app.route('/')
def home() -> str:
    """Displays the main page
    Returns:
        Elements of the main page
    """
    return render_template('Home.html')


@app.route('/about/')
def about():
    """Displays the about page
    Returns:
        Elements of the about page
    """
    try:
        return render_template('About.html')
    except TemplateNotFound:
        return redirect(url_for('home'))


@app.route('/projects/')
def project():
    """Displays the project page
    Returns:
        Elements of the project page
    """
    try:
        return render_template('Projects.html')
    except TemplateNotFound:
        return redirect(url_for('home'))


@app.route('/contact/')
def contact():
    """Displays the contact page
     Returns:
         Elements of the contact page
     """
    try:
        return render_template('Contact.html')
    except TemplateNotFound:
        return redirect(url_for('home'))


@app.route('/submit', methods=['POST'])
def submit():
    """Handles form submission."""
    try:
        name = request.form['name']
        email = request.form['email']
        message = request.form['message']
        country_code = request.form['country-code']
        phone = request.form['phone']
        full_phone = '+' + country_code + phone
        cur = database.connection.cursor()
        cur.execute("INSERT INTO form (name, email, message, phone, date) VALUES (%s, %s, %s, %s, %s)",
                    (name, email, message, full_phone, datetime.datetime.now()))
        database.connection.commit()
        cur.close()
        return "Thanks for contacting me, " + name + "!"
    except Exception as e:

        return "An error occurred while processing the form: " + str(e)


@app.errorhandler(404)
def page_not_found(error):
    return redirect(url_for('home'))


@app.route('/random/')
@app.route('/random/<int:limit>')
def random_generator_range(limit: int = None) -> str:
    """Generates a random number between 1 and user specified

    Args:
        limit: int: max range of random numbers

    Returns:
        Random number between 1 and user specified
    """
    if limit:
        generated: int = random.randrange(1, limit + 1)
    else:
        generated: int = random.randrange(1, 1000)

    return render_template('random.html', generated=generated)


def quote() -> str:
    """Fetches the quote from the API"""
    response = requests.get("https://zenquotes.io/api/random")
    data = json.loads(response.content)
    quoted = f"{data[0]['q']}  ~  {data[0]['a']}"
    return quoted


@app.route('/quote')
def quote_generator() -> str:
    """Generates a random quote from an API
    Returns:
        Quote
    """
    generated = quote()
    return render_template('quote.html', generated=generated)


if __name__ == '__main__':
    app.run(debug=True, port=8080)
