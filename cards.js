'use strict';

let allEmployees = [];


let empCardsDiv = document.getElementById("empCards");
let employeeForm = document.getElementById("employeeForm");

function Employee(fullName, department, level, imgUrl) {
  this.fullName = fullName;
  this.department = department;
  this.level = level;
  this.imgUrl = imgUrl;
  this.employeeId = generateEmployeeId();
  allEmployees.push(this);
}

Employee.prototype.renderEmployeeCard = function() {
  let cardDiv = document.createElement("div");
  cardDiv.classList.add("card");

  let imgElem = document.createElement("img");
  imgElem.src = this.imgUrl;
  cardDiv.appendChild(imgElem);

  let infoDiv = document.createElement("div");
  infoDiv.classList.add("info");

  let nameElem = document.createElement("h3");
  nameElem.textContent = this.fullName;
  infoDiv.appendChild(nameElem);

  let deptElem = document.createElement("p");
  deptElem.textContent = "Department: " + this.department;
  infoDiv.appendChild(deptElem);

  let levelElem = document.createElement("p");
  levelElem.textContent = "Level: " + this.level;
  infoDiv.appendChild(levelElem);

  let idElem = document.createElement("p");
  idElem.textContent = "Employee ID: " + this.employeeId;
  infoDiv.appendChild(idElem);

  cardDiv.appendChild(infoDiv);
  empCardsDiv.appendChild(cardDiv);
};

function generateEmployeeId() {
  let id = "";
  while (id.length < 4) {
    id += Math.floor(Math.random() * 10);
  }
  return id;
}

let employee1 = new Employee("Omar Ahmad", "Administration", "Senior", "./omar.jpg");
let employee2 = new Employee("Rana Mohammad", "Marketing", "Mid-Senior", "./rana.jpg");
let employee3 = new Employee ("Hadi omar", "Administration","Senior","./hadi.jpg")

employee1.renderEmployeeCard();
employee2.renderEmployeeCard();
employee3.renderEmployeeCard();


// Event listener for the form submission
employeeForm.addEventListener("submit", submitHandler);

// Submit handler function to handle the form submission event
function submitHandler(event) {
  event.preventDefault();

  // Retrieve values from the form inputs
  let fullName = event.target.elements.fullName.value;
  let department = event.target.elements.department.value;
  let level = event.target.elements.level.value;
  let imgUrl = event.target.elements.imgUrl.value;

  let newEmployee = new Employee(fullName, department, level, imgUrl);

  // Render the employee card
  newEmployee.renderEmployeeCard();
  saveData(allEmployees);

  employeeForm.reset();
}