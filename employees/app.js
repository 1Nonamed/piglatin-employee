import employees from "./employees.json" with {type: "json"};

const $ = (el) => document.querySelector(el);
const $$ = (el) => document.querySelectorAll(el);

// Get all nav buttons
const navButtons = $$("nav button");
const articles = $$("article");
const resultsDiv = $("#results");

// Toggle active class on nav buttons
navButtons.forEach((button, i) => {
  button.addEventListener("click", () => {
    navButtons.forEach((btn) => {
      btn.classList.remove("bg-[#A6CDC6]");
      button.classList.add("bg-[#A6CDC6]");
      
      resultsDiv.innerHTML = "";
      
    });
    // Show and hide articles
    articles.forEach((article) => article.classList.add("hidden"));
    articles[i].classList.remove("hidden");
  });
});

// Get all forms, sections and results div
const forms = $$("form");
const [searchForm, addForm] = forms;
const employeesSection = $("#employees");

// Tried to implement XAMPP but it was not working because of my lacks of knowledge in PHP, so I used local storage instead and it worked perfectly.

// Stores the employees data from the JSON file in local storage
if (!localStorage.getItem("employees")) {
  localStorage.setItem("employees", JSON.stringify(employees));
}

// Display all employees on form submit
searchForm
  .addEventListener("submit", (e) => {
    e.preventDefault();

    // Get the input value
    let input = e.target[0];
    let inputValue = e.target[0].value;

    // Get the employees data from local storage
    const employees = JSON.parse(localStorage.getItem("employees"));
    console.log(employees)

    const results = employees.filter((employee) => {
      const { empId, empLastname, empLevel } = employee;
      return (
        empId.toString() === inputValue ||
        empLastname.toLowerCase().includes(inputValue) ||
        empLevel === inputValue
      );
    });
    if (results.length > 0) {
      // Create the table
      let table = `
        <h2 class="text-lg font-bold mb-2">Results for: ${inputValue}</h2>
        <table class="w-full text-left">
          <thead class="text-sm uppercase">
            <tr>
              <th scope="col" class="border border-collapse px-2 py-1 bg-[#16404D] text-white">ID</th>
              <th scope="col" class="border border-collapse px-2 py-1 bg-[#16404D] text-white">Firstname</th>
              <th scope="col" class="border border-collapse px-2 py-1 bg-[#16404D] text-white">Lastname</th>
              <th scope="col" class="border border-collapse px-2 py-1 bg-[#16404D] text-white">Salary</th>
              <th scope="col" class="border border-collapse px-2 py-1 bg-[#16404D] text-white">Level</th>
            </tr>
          </thead>
          <tbody>
        `;
      // Loop through the results and add them to the table
      results.forEach((employee) => {
        const { empId, empFirstname, empLastname, empSalary, empLevel } =
          employee;
        table += `
          <tr class="odd:bg-white even:bg-green-50  border-b border-gray-200 text-sm">
            <td class="border px-2 py-1">${empId}</td>
            <td class="border px-2 py-1">${empFirstname}</td>
            <td class="border px-2 py-1">${empLastname}</td>
            <td class="border px-2 py-1">${empSalary}</td>
            <td class="border px-2 py-1">${empLevel}</td>
          </tr>`;
      });
      // Close the table
      table += `</tbody></table>`;
      // Add the table to the results div
      resultsDiv.innerHTML = table;
    } else {
      resultsDiv.innerHTML = `<p>No results found for: ${inputValue}</p>`;
    }

    // Clear the input value and focus
    input.value = "";
    input.focus();

    // Show the employees section with the results
    employeesSection.classList.remove("hidden");
  })

// Add new employee
addForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get the form data
  const empFirstnameInput = e.target[0];
  const empLastnameInput = e.target[1];
  const empSalaryInput = e.target[2];

  // Set the employee level based on the salary
  let empLevel = 1;
  if (empSalaryInput.value > 30000 && empSalaryInput.value < 60000) empLevel = 2;
  if (empSalaryInput.value >= 60000) empLevel = 3;

  // Create a new employee object
  const newEmployee = {
    empId: employees.length + 1, // Generate a new ID
    empFirstname: empFirstnameInput.value,
    empLastname: empLastnameInput.value,
    empSalary: empSalaryInput.value,
    empLevel,
  };

  // Add the new employee to the employees array and update local storage
  employees.push(newEmployee);
  localStorage.setItem("employees", JSON.stringify(employees));

  // Clear the input values
  empFirstnameInput.value = "";
  empLastnameInput.value = "";
  empSalaryInput.value = "";

  // Show the employees section with the new employee
  employeesSection.classList.remove("hidden");

  // Display the new employee in the results div
  resultsDiv.innerHTML = `
    <h2 class="text-lg font-bold mb-4">New Employee:</h2>
    <table class="w-full text-left">
      <thead class="text-sm uppercase">
        <tr>
          <th scope="col" class="border border-collapse px-2 py-1 bg-[#16404D] text-white">ID</th>
          <th scope="col" class="border border-collapse px-2 py-1 bg-[#16404D] text-white">Firstname</th>
          <th scope="col" class="border border-collapse px-2 py-1 bg-[#16404D] text-white">Lastname</th>
          <th scope="col" class="border border-collapse px-2 py-1 bg-[#16404D] text-white">Salary</th>
          <th scope="col" class="border border-collapse px-2 py-1 bg-[#16404D] text-white">Level</th>
        </tr>
      </thead>
      <tbody>
        <tr class="odd:bg-white even:bg-green-50  border-b border-gray-200 text-sm">
          <td class="border px-2 py-1">${newEmployee.empId}</td>
          <td class="border px-2 py-1">${newEmployee.empFirstname}</td>
          <td class="border px-2 py-1">${newEmployee.empLastname}</td>
          <td class="border px-2 py-1">${newEmployee.empSalary}</td>
          <td class="border px-2 py-1">${newEmployee.empLevel}</td>
        </tr>
      </tbody>
    </table>
  `;

  // Focus on the first input
  empFirstnameInput.focus();
});
