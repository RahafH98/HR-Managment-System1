'use strict';

// Global variables
var allEmployees = [];
let empCardsDiv = document.getElementById("empCards");
let employeeForm = document.getElementById("employeeForm");

// Employee constructor
function Employee(id, fullName, department, level, imgUrl) {
  this.id = id;
  this.fullName = fullName;
  this.department = department;
  this.level = level;
  this.imgUrl = imgUrl;
  this.salary = 0;
  allEmployees.push(this);
}

// Render employee card
function renderEmployeeCard(employee) {
  let cardDiv = document.createElement("div");
  cardDiv.classList.add("card");

  let imgElem = document.createElement("img");
  imgElem.src = employee.imgUrl;
  cardDiv.appendChild(imgElem);

  let infoDiv = document.createElement("div");
  infoDiv.classList.add("info");

  let nameElem = document.createElement("h3");
  nameElem.textContent = employee.fullName;
  infoDiv.appendChild(nameElem);

  let deptElem = document.createElement("p");
  deptElem.textContent = "Department: " + employee.department;
  infoDiv.appendChild(deptElem);

  let levelElem = document.createElement("p");
  levelElem.textContent = "Level: " + employee.level;
  infoDiv.appendChild(levelElem);

  let idElem = document.createElement("p");
  idElem.textContent = "Employee ID: " + employee.id;
  infoDiv.appendChild(idElem);

  cardDiv.appendChild(infoDiv);
  empCardsDiv.appendChild(cardDiv);
}

// Generate unique employee ID
function generateEmployeeId() {
  let id = "";
  let isUnique = false;

  while (!isUnique) {
    id = "";
    while (id.length < 4) {
      id += Math.floor(Math.random() * 10);
    }
    isUnique = !allEmployees.some(employee => employee.id === id);
  }

  return id;
}

// Load stored employees from localStorage
function loadStoredEmployees() {
  let storedEmployees = JSON.parse(localStorage.getItem('employees'));
  if (storedEmployees && Array.isArray(storedEmployees)) {
    allEmployees = storedEmployees;
  }
}

// Create initial employees
function createInitialEmployees() {
  let employee1 = new Employee(generateEmployeeId(), "Gahzi Ahmad", "Administration", "Senior", "./assets/Ghazi.jpg");
  let employee2 = new Employee(generateEmployeeId(), "Hadi Mohammad", "Marketing", "Mid-Senior", "./assets/Hadi.jpg");
  let employee3 = new Employee(generateEmployeeId(), "Lana Hassan", "Development", "Junior", "./assets/Lana.jpg");

  renderEmployeeCard(employee1);
  renderEmployeeCard(employee2);
  renderEmployeeCard(employee3);
}

// Form submission handler
function submitHandler(event) {
  event.preventDefault();

  let fullName = event.target.elements.fullName.value;
  let department = event.target.elements.department.value;
  let level = event.target.elements.level.value;
  let imgUrl = event.target.elements.imgUrl.value;

  let newEmployee = new Employee(generateEmployeeId(), fullName, department, level, imgUrl);

  renderEmployeeCard(newEmployee);
  saveData(allEmployees);

  employeeForm.reset();
}

// Save employee data to localStorage
function saveData(data) {
  let employeesJSON = JSON.stringify(data);
  localStorage.setItem('employees', employeesJSON);
}

// Load stored employees, create initial employees, and set up event listener
function initialize() {
  loadStoredEmployees();
  createInitialEmployees();

  employeeForm.addEventListener("submit", submitHandler);
}

// Initialize the employee management system
initialize();
saveData(allEmployees);
loadStoredEmployees()