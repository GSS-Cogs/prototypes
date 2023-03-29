"""
Simple python flask server to "hello world" via simple http server
on port 3000.
"""

from flask import Flask
from flask import Response

app = Flask(__name__)

@app.route("/_healthcheck")
def health_check():
    """
    Add a simple healthcheck to keep k8s happy, else the
    app will run be perpetually reported as being in a state
    of 0/1 pods ready.
    """
    return Response("", status=200)

@app.route("/")
def all():
    """
    Catch everything that's not a healthcheck
    """
    return "Hello world! I will be a prototype"

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port=3000)