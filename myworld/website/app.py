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
    department = request.form.getlist('department')
    course_names = request.form.getlist('course_number[]')
   
    if department and course_names:
        # Add the course data to the list
        for dept, course_name in zip(department, course_names):
            courses.append({"Department": dept, "CourseName": course_name})

        # Write the data to a CSV file
        with open('static/data/userInput.csv', 'a', newline='') as csv_file:
            fieldnames = ["Department", "CourseName"]
            csv_writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
            
            # If the file is empty, write the header
            if csv_file.tell() == 0:
                csv_writer.writeheader()
            
            # Write the course data
            for dept, course_name in zip(department, course_names):
                csv_writer.writerow({"Department": dept, "CourseName": course_name})

        return "Courses added successfully."
    
    else:
        return "Bad Request: missing course data."

if __name__ == '__main__':
    app.run(debug=True)
