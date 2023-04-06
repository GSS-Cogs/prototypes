"""
Simple python flask server to "hello world" via simple http server
on port 3000.
"""

from flask import Flask
from flask import Response

app = Flask(__name__)

@app.route('/robots.txt')
def robots_txt():
    robots = "User-agent: *\nDisallow: /"
    return Response(robots, mimetype='text/plain', status=200)

@app.route("/")
def all():
    """
    Catch everything that's not a healthcheck
    """
    return "Hello world"

if __name__ == "__main__":
    app.run(debug=True, port=5000)