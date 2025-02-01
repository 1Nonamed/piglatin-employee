const $ = (el) => document.querySelector(el);
const $$ = (el) => document.querySelectorAll(el);

const customers = [
  {
    CustomerID: "1",
    LastName: "Doe",
    FirstName: "John",
    Gender: "male",
    Email: "johnDoe@email.com",
    Username: "johnDoe",
    Password: "john123",
  },
  {
    CustomerID: "2",
    LastName: "Parker",
    FirstName: "Peter",
    Gender: "male",
    Email: "peter@email.com",
    Username: "peter",
    Password: "peter123",
  },
  {
    CustomerID: "3",
    LastName: "Doe",
    FirstName: "Jane",
    Gender: "female",
    Email: "janeDoe@email.com",
    Username: "janeDoe",
    Password: "jane123",
  },
  {
    CustomerID: "4",
    LastName: "Johnson",
    FirstName: "Tyler",
    Gender: "male",
    Email: "tjohnson@email.com",
    Username: "tjohnson",
    Password: "tyler123",
  },
  {
    CustomerID: "5",
    LastName: "Smith",
    FirstName: "Joan",
    Gender: "female",
    Email: "joan@email.com",
    Username: "joan",
    Password: "joan123",
  },
  {
    CustomerID: "6",
    LastName: "Ting",
    FirstName: "Jasper",
    Gender: "male",
    Email: "jting@email.com",
    Username: "jasper",
    Password: "jasper123",
  },
];

// import customers from "./customers.json" with {type: "json"};

const form = $("form");
const resultsDiv = $("#results");

// Display all customers on form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  customers.forEach((customer) => {
    const { CustomerID, FirstName, LastName } = customer;
    resultsDiv.innerHTML += `
    <tr class="odd:bg-white even:bg-green-50  border-b border-gray-200 text-sm">
        <td class="border px-2 py-1">${CustomerID}</td>
        <td class="border px-2 py-1">${FirstName}</td>
        <td class="border px-2 py-1">${LastName}</td>
        <td class="border px-2 py-1">10000</td>
        <td class="border px-2 py-1">1</td>
    </tr>
    `;
  });
});

// Get all nav buttons
const navButtons = $$("nav button");
const articles = $$("article");

// Toggle active class on nav buttons
navButtons.forEach((button, i) => {
  button.addEventListener("click", () => {
    navButtons.forEach((btn) => btn.classList.remove("bg-[#A6CDC6]"));
    button.classList.add("bg-[#A6CDC6]");

    // Show and hide articles
    articles.forEach((article) => article.classList.add("hidden"));
    articles[i].classList.remove("hidden");
  });
});
