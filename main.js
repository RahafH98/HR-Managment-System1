'use strict';

let allEmployees = [];
let empCardsDiv = document.getElementById("empCards");
let employeeForm = document.getElementById("employeeForm");
let employeeInfoTable = document.getElementById("employee-info");

function Employee(id, fullName, department, level, imgUrl) {
  this.id = id;
  this.fullName = fullName;
  this.department = department;
  this.level = level;
  this.imgUrl = imgUrl;
  this.salary = 0;
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
  idElem.textContent = "Employee ID: " + this.id;
  infoDiv.appendChild(idElem);

  cardDiv.appendChild(infoDiv);
  empCardsDiv.appendChild(cardDiv);
};

Employee.prototype.calculateSalary = function() {
  let minSalary, maxSalary;
  switch (this.level) {
    case "Senior":
      minSalary = 1500;
      maxSalary = 2000;
      break;
    case "Mid-Senior":
      minSalary = 1000;
      maxSalary = 1500;
      break;
    case "Junior":
      minSalary = 500;
      maxSalary = 1000;
      break;
    default:
      minSalary = 0;
      maxSalary = 0;
  }

  this.salary = Math.floor(Math.random() * (maxSalary - minSalary + 1)) + minSalary;
  return this.salary;
};


function generateEmployeeId() {
  let id = "";
  let isUnique = false;

  while (!isUnique) {
    id = "";
    while (id.length < 4) {
      id += Math.floor(Math.random() * 10);
    }

    // Check if the generated ID already exists
    isUnique = allEmployees.every(function(employee) {
      return employee.id !== id;
    });
  }

  return id;
}


employeeForm.addEventListener("submit", submitHandler);


function submitHandler(event) {
  event.preventDefault();

  let fullName = event.target.elements.fullName.value;
  let department = event.target.elements.department.value;
  let level = event.target.elements.level.value;
  let imgUrl = event.target.elements.imgUrl.value;

  let newEmployee = new Employee(generateEmployeeId(), fullName, department, level, imgUrl);

  newEmployee.renderEmployeeCard();
  
  addToEmployeeTable(newEmployee);

  employeeForm.reset();
}



function saveData() {
  // Retrieve the employee data from the table
  let tableRows = employeeInfoTable.getElementsByTagName("tr");
  let employeesData = [];
  for (let i = 1; i < tableRows.length; i++) {
    let row = tableRows[i];
    let id = row.cells[0].textContent;
    let fullName = row.cells[1].textContent;
    let department = row.cells[2].textContent;
    let level = row.cells[3].textContent;
    let salary = row.cells[4].textContent;
    
    // Create an employee object and add it to the employeesData array
    let employeeData = {
      id: id,
      fullName: fullName,
      department: department,
      level: level,
      salary: salary
    };
    employeesData.push(employeeData);
  }

  // Update the allEmployees array with the retrieved data
  allEmployees = employeesData;

  // Convert the employees array to a JSON string
  var employeesJSON = JSON.stringify(allEmployees);

  // Save the JSON string to local storage
  localStorage.setItem('employees', employeesJSON);
}



function getData() {
  let retrievedData = localStorage.getItem('employees');

  if (retrievedData) {
    let parsedData = JSON.parse(retrievedData);

    allEmployees = parsedData;
    for (let i = 0; i < parsedData.length; i++) {
      let employeeData = parsedData[i];
      let employee = new Employee(
        employeeData.id,
        employeeData.fullName,
        employeeData.department,
        employeeData.level,
        employeeData.imgUrl
      );
      employee.renderEmployeeCard();
      addToEmployeeTable(employee);
    }
  }
}



function addToEmployeeTable(employee) {
  employee.calculateSalary(); // Calculate the salary before adding to the table

  let employeeRow = document.createElement("tr");
  employeeRow.innerHTML = `
    <td>${employee.id}</td>
    <td>${employee.fullName}</td>
    <td>${employee.department}</td>
    <td>${employee.level}</td>
    <td>$${employee.salary.toFixed(2)}</td>
  `;
  employeeInfoTable.appendChild(employeeRow);
  
  allEmployees.push(employee);
  saveData(); // Save the updated data to local storage
}

var employeesJSON = localStorage.getItem('employees');
if (employeesJSON) {
  allEmployees = JSON.parse(employeesJSON);
}

getData();

allEmployees.forEach(function(employee) {
  employee.calculateSalary();
});