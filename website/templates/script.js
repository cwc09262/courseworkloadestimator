document.getElementById("addcourse").addEventListener("click", function () {
    var courseFields = document.getElementById("courseFields");
    
    // Create a container for each pair of dropdown and text field
    var container = document.createElement("div");
    container.style.display = "flex"; // Make the container use flex layout
    container.style.alignItems = "center"; // Align items vertically in the container
    
    // Create a dropdown (select) element
    var courseDropdown = document.createElement("select");
    courseDropdown.course = "relationship";

    // learnj to read from csv

    // Create options for the dropdown
    var options = ["Department Code", "Friend", "Family", "Colleague"];
    for (var i = 0; i < options.length; i++) {
        var option = document.createElement("option");
        option.value = options[i];
        option.text = options[i];
        courseDropdown.appendChild(option);
    }
    
    // Create a text input field
    var courseInput = document.createElement("input");
    courseInput.type = "text";
    courseInput.course = "course";
    courseInput.placeholder = "Enter a Course Number:";
    
    // Set the display property of dropdown and text field to inline
    courseDropdown.style.display = "inline";
    courseInput.style.display = "inline";
    
    // Append the dropdown and text field to the container
    container.appendChild(courseDropdown);
    container.appendChild(courseInput);
    
    // Append the container to the "courseFields" div
    courseFields.appendChild(container);
});
