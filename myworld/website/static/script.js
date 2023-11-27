document.getElementById("addcourse").addEventListener("click", function () {
    const courseFields = document.getElementById("courseFields");

    // Create a container for each pair of dropdown and text field
    const container = document.createElement("div");
    container.style.display = "flex"; // Make the container use flex layout
    container.style.alignItems = "center"; // Align items vertically in the container

    // Create a dropdown (select) element
    const courseDropdown = document.createElement("select");
    courseDropdown.name = "department";
    courseDropdown.className = "department-select"; // Add a class for selection

    // Define the URL to your CSV file
    const departmentCodesCSV = "static/data/department_codes.csv"; // Update the file path

    // Fetch data from the CSV file
    fetch(departmentCodesCSV)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status} - ${response.statusText}`);
            }
            return response.text();
        })
        .then((csvText) => {
            // Parse the CSV data into an array using PapaParse
            const departmentCodes = Papa.parse(csvText, {
                header: false, // Assumes the first row in the CSV contains column headers
                dynamicTyping: true, // Automatically converts values to appropriate data types
                skipEmptyLines: true, // Skip empty lines
            }).data.flat();

            // Create options for the dropdown
            for (const code of departmentCodes) {
                const option = document.createElement("option");
                option.value = code;
                option.text = code;
                courseDropdown.appendChild(option);
                // Inside the complete callback of Papa.parse
                // console.log("Parsed department codes:", departmentCodes);
            }

            // Now that the dropdown is populated, you can set its value if needed
            // For example, to set the selected value to the first option:
            // courseDropdown.value = departmentCodes[0];
        })
        .catch((error) => {
            console.error('Error fetching or parsing CSV:', error);
            // Consider providing user feedback on the error
        });

    // Create a text input field
    const courseInput = document.createElement("input");
    courseInput.type = "text";
    courseInput.name = "course_number[]"; // Use an array for the name attribute
    courseInput.placeholder = "Enter a Course Number";

    // ... (rest of the code remains the same)

    // Append the dropdown and text input fields to the container
    container.appendChild(courseDropdown);
    container.appendChild(courseInput);

    // Set the display property of dropdown and text field to inline
    courseDropdown.style.display = "inline";
    courseInput.style.display = "inline";

    // Append the container to the "courseFields" div
    courseFields.appendChild(container);
});
