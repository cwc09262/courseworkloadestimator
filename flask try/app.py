# Import the Flask library and render_template function
from flask import Flask, render_template

# Create a Flask application instance
app = Flask(__name__)

# Define a route for the root URL ("/")
@app.route('/')
def index():
    # Render the 'index.html' template and return it as the response
    return render_template('index.html')

# Run the Flask application when this script is executed
if __name__ == '__main__':
    app.run(debug=True)
