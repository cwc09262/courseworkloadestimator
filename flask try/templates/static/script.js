document.getElementById("addcourse").addEventListener("click", function () {
    var courseFields = document.getElementById("courseFields");
    var container = document.createElement("div");
    container.style.display = "flex";
    container.style.alignItems = "center";

    var courseDropdown = document.createElement("select");
    courseDropdown.name = "course";
    courseDropdown.id = "my-dropdown";

    const departData = "data/department_codes.csv";

    const departCodes = [];

    fetch(departData)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status} - ${response.statusText}`);
            }
            return response.text();
        })
        .then((csvText) => {
            Papa.parse(csvText, {
                header: true,
                dynamicTyping: true,
                skipEmptyLines: true,
                complete: (result) => {
                    departCodes.push(...result.data.map((record) => record.DepartmentCode));
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

    var courseInput = document.createElement("input");
    courseInput.type = "text";
    courseInput.name = "course";
    courseInput.placeholder = "Enter a Course Number";

    courseInput.addEventListener("change", function () {
        var department = courseDropdown.value;
        var inputValue = courseInput.value;
        console.log("User entered:", department, inputValue);
    });

    container.appendChild(courseInput);

    courseDropdown.style.display = "inline";
    courseInput.style.display = "inline";

    container.appendChild(courseDropdown);
    container.appendChild(courseInput);

    courseFields.appendChild(container);
});
