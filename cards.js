'use strict';


const allEmployees = [];

// Get the <div> element for employee cards from the HTML file by its id
let empCardsDiv = document.getElementById("empCards");

// Get the <form> element from the HTML file by its id
let employeeForm = document.getElementById("employeeForm");

// Create a constructor function for Employee
function Employee(fullName, department, level, imgUrl) {
  this.fullName = fullName;
  this.department = department;
  this.level = level;
  this.imgUrl = imgUrl;
  this.employeeId = generateEmployeeId();
  allEmployees.push(this);
}

// Render method to render employee information in a card
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

// Function to generate a unique four-digit employee id number
function generateEmployeeId() {
  let id = "";
  while (id.length < 4) {
    id += Math.floor(Math.random() * 10);
  }
  return id;
}

let employee1 = new Employee("Gahzi Ahmad", "Administration", "Senior", "/home/rahaf/HR-Managment-System1/ghazi.jpg");
let employee2 = new Employee("Hadi Mohammad", "Marketing", "Mid-Senior", "/home/rahaf/HR-Managment-System1/hadi.jpg");
let employee3 = new Employee("Lana Hassan", "Development", "Junior", "/home/rahaf/HR-Managment-System1/lana.jpg");


employee1.renderEmployeeCard();
employee2.renderEmployeeCard();
employee3.renderEmployeeCard();


employeeForm.addEventListener("submit", submitHandler);


function submitHandler(event) {
  event.preventDefault();


  let fullName = event.target.elements.fullName.value;
  let department = event.target.elements.department.value;
  let level = event.target.elements.level.value;
  let imgUrl = event.target.elements.imgUrl.value;


  let newEmployee = new Employee(fullName, department, level, imgUrl);

 
  newEmployee.renderEmployeeCard();

  // Reset the form inputs
  employeeForm.reset();
}

