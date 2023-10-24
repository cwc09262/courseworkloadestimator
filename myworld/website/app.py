import csv
from flask import Flask, request, render_template

app = Flask(__name__)

# Initialize a list to store course data
courses = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    course_name = request.form.get('inputValue')
    department = request.form.get('department')
    
    # Add the course data to the list
    courses.append({"Department": department, "CourseName": course_name})

    # Write the data to a CSV file
    with open('static/data/userInput.csv', 'a', newline='') as csv_file:
        fieldnames = ["Department", "CourseName"]
        csv_writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
        
        # If the file is empty, write the header
        if csv_file.tell() == 0:
            csv_writer.writeheader()
        
        # Write the course data
        csv_writer.writerow({"Department": department, "CourseName": course_name})

    return "Course added successfully."

if __name__ == '__main__':
    app.run(debug=True)


# we need to figure out why the cuorse number is not going to the csv file