from flask import Flask, render_template, request
import csv

app = Flask(__name__)

# Function to save data to a CSV file
def save_to_csv(data):
    with open('/names.csv', mode='a', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(data)

@app.route('/', methods=['GET', 'POST'])

def index():
    if request.method == 'POST':
        # Process the submitted form data
        names = []
        for i in range(1, 6):
            name = request.form.get(f'name{i}')
            if name:
                names.append(name)

        if names:
            save_to_csv(names)

    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
