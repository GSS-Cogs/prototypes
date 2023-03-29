"""
Simple python flask server to "hello world" via simple http server
on port 3000.
"""

from flask import Flask

app = Flask(__name__)

@app.route("/")
def all():
    return "Hello world! I will be a prototype"

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port=3000)