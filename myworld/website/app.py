from flask import Flask, request, render_template, redirect, url_for, send_from_directory
import csv

app = Flask(__name__)

# Initialize a list to store course data
courses = []

# Load CSV data without headers
def load_csv_data():
    global courses
    with open('static/data/userInput.csv', 'r') as csv_file:
        csv_reader = csv.reader(csv_file)
        courses = [{"Department": row[0], "CourseName": row[1]} for row in csv_reader]

# Home page
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/results', methods=['GET', 'POST'])
def show_results():
    if request.method == 'POST':
        departments = request.form.getlist('department')
        course_numbers = request.form.getlist('course_number[]')

        # Create a list of combinations
        course_names = [dept + ' ' + str(course_num) for dept, course_num in zip(departments, course_numbers)]

        # Strip leading/trailing whitespaces and make the comparison case-insensitive
        course_names = [course_name.strip().upper() for course_name in course_names]



        # Find the course data for each submitted course
        courses_data = []
        for course_name in course_names:
            # Use case-insensitive matching for course names
            course_data = next((course for course in courses if course["CourseName"].strip().upper() == course_name), None)
            print(course_data)
            courses_data.append(course_data)

        print(course_data)

        if courses_data:
            # If there is at least one course found, render the template
            print("Course Data:", courses_data)
            return render_template('results.html', courses_data=course_names)

    return render_template('not_found.html')

# Load CSV data without headers
def load_csv_data():
    with open('static/data/course_data.csv', 'r') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        courses = list(csv_reader)
    return courses

if __name__ == '__main__':
    load_csv_data()  # Load the CSV data at the start
    app.run(debug=True)
