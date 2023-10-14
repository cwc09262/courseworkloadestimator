document.getElementById("addcourse").addEventListener("click", function () {
    var courseFields = document.getElementById("courseFields");

    // Create a container for each pair of dropdown and text field
    var container = document.createElement("div");
    container.style.display = "flex"; // Make the container use flex layout
    container.style.alignItems = "center"; // Align items vertically in the container

    // Create a dropdown (select) element
    var courseDropdown = document.createElement("select");
    courseDropdown.name = "course"
    courseDropdown.id = "my-dropdown";
    /**
     * Pulling from a CSV to populate department codes
     */
    const departData = "/website/templates/data/department_codes.csv"; // Update the file path

    // Initializing array
    const departCodes = [];
    /*
    console.log('Fetching CSV data...');
    fetch(departData)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status} - ${response.statusText}`);
            }
            return response.text();
        })
        .then((csvText) => {
            // ... (rest of your code)
            console.log('departCodes:', departCodes); // Log the contents of departCodes
        })
        .catch((error) => {
            console.error('Error fetching or parsing CSV:', error);
        });
    */

    fetch(departData)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status} - ${response.statusText}`);
            }
            return response.text();
        })
        .then((csvText) => {
            // Parse the CSV data into an array using PapaParse
            Papa.parse(csvText, {
                header: true, // Assumes the first row in the CSV contains column headers
                dynamicTyping: true, // Automatically converts values to appropriate data types
                skipEmptyLines: true, // Skip empty lines
                complete: (result) => {
                    // The parsed data is available in result.data
                    // You can access the data in the result.data array
                    departCodes.push(...result.data.map((record) => record.DepartmentCode));

                    // Create departCodes for the dropdown
                    for (var i = 0; i < departCodes.length; i++) {
                        var option = document.createElement("option");
                        option.value = departCodes[i];
                        option.text = departCodes[i];
                        courseDropdown.appendChild(option);
                    }
                },
            });
        })
        .catch((error) => {
            console.error('Error fetching or parsing CSV:', error);
        });



    /*
    
    // Create options for the dropdown
    var options = ["Department Code", "Friend", "Family", "Colleague"];
    for (var i = 0; i < options.length; i++) {
        var option = document.createElement("option");
        option.value = options[i];
        option.text = options[i];
        courseDropdown.appendChild(option);
    }
    */
    // To save the input from the user, you can add an event listener to the text input field:

    // Assuming you have a reference to the input field (courseInput)
    var courseInput = document.createElement("input");
    courseInput.type = "text";
    courseInput.name = "course";
    courseInput.placeholder = "Enter a Course Number:";

    // Add an event listener to capture the input value
    courseInput.addEventListener("change", function () {
        var department = courseDropdown.value;
        var inputValue = courseInput.value;
        
        // Now, "inputValue" contains the value entered by the user in the text input field
        console.log("User entered:", department, inputValue);
    });

    // Append the text input field to the container
    container.appendChild(courseInput);


    // Set the display property of dropdown and text field to inline
    courseDropdown.style.display = "inline";
    courseInput.style.display = "inline";

    // Append the dropdown and text field to the container
    container.appendChild(courseDropdown);
    container.appendChild(courseInput);

    // Append the container to the "courseFields" div
    courseFields.appendChild(container);
});
