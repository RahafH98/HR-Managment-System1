'use strict';

function Employee(id, fullName, department, level) {
    this.id = id;
    this.fullName = fullName;
    this.department = department;
    this.level = level;
    this.imageUrl = "";
    this.salary = 0;
}
  
Employee.prototype.calculateSalary = function() {
    var minSalary, maxSalary;
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
    this.netSalary = this.salary - (this.salary * 0.075);
};
  

Employee.prototype.render = function() {
    var employeeInfo = document.getElementById("employee-info");
    var employeeRow = document.createElement("tr");
    employeeRow.innerHTML = `
    <td>${this.id}</td>
    <td>${this.fullName}</td>
    <td>${this.department}</td>
    <td>${this.level}</td>
    <td>$${this.salary}</td>
    `;
    employeeInfo.appendChild(employeeRow);
};

var employees = [
  new Employee(1000, "Ghazi Samer", "Administration", "Senior"),
  new Employee(1001, "Lana Ali", "Finance", "Senior"),
  new Employee(1002, "Tamara Ayoub", "Marketing", "Senior"),
  new Employee(1003, "Safi Walid", "Administration", "Mid-Senior"),
  new Employee(1004, "Omar Zaid", "Development", "Senior"),
  new Employee(1005, "Rana Saleh", "Development", "Junior"),
  new Employee(1006, "Hadi Ahmad", "Finance", "Mid-Senior")
];

employees.forEach(function(employee) {
    employee.calculateSalary();
});
  
employees.forEach(function(employee) {
    employee.render();
});
var employeesJSON = JSON.stringify(employees);
localStorage.setItem('employees', employeesJSON);
var employeesJSON = localStorage.getItem('employees');
var employees = JSON.parse(employeesJSON);