// JavaScript to handle adding names to the list
document.getElementById("addName").addEventListener("click", function () {
    // Create a dropdown (select) element
    var nameDropdown = document.createElement("select");
    nameDropdown.name = "relationship";
    var nameFields = document.getElementById("nameFields");
    var nameInput = document.createElement("input");
    // Create options for the dropdown
    var options = ["Department Code","Friend", "Family", "Colleague"];
    for (var i = 0; i < options.length; i++) {
        var option = document.createElement("option");
        option.placeholder = "Department";
        option.value = options[i];
        option.text = options[i];
        nameDropdown.appendChild(option);
    }

    nameFields.appendChild(nameDropdown);

    nameInput.type = "text";
    nameInput.name = "name";
    nameInput.placeholder = "Enter a name";
    nameFields.appendChild(nameInput);


    // Add a line break after each name field
    var lineBreak = document.createElement("br");
    nameFields.appendChild(lineBreak);
});


