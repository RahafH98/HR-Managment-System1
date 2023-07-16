'use strict';

let allEmployees = [];

function calculateDepartmentInfo() {
  let departmentInfo = {};

  // Iterate over employees and calculate department information
  allEmployees.forEach(function(employee) {
    if (!departmentInfo[employee.department]) {
      departmentInfo[employee.department] = {
        employeeCount: 0,
        totalSalary: 0
      };
    }

    departmentInfo[employee.department].employeeCount++;
    departmentInfo[employee.department].totalSalary += employee.salary;
  });

  return departmentInfo;
}


function renderDepartmentInfo() {
  let departmentTable = document.getElementById("department-table");
  let tableBody = departmentTable.querySelector("tbody");
  tableBody.innerHTML = "";

  let departmentInfo = calculateDepartmentInfo();

  Object.keys(departmentInfo).forEach(function(departmentName) {
    let department = departmentInfo[departmentName];
    let departmentRow = document.createElement("tr");
    departmentRow.innerHTML = `
      <td>${departmentName}</td>
      <td>${department.employeeCount}</td>
      <td>${department.totalSalary}</td>
      <td>$${department.averageSalary !== 0 ? department.totalSalary / department.employeeCount : "N/A"}</td>
    `;
    tableBody.appendChild(departmentRow);
  });

  // Update table footer
  let tableFooter = departmentTable.querySelector("tfoot");
  let footerRow = tableFooter.querySelector("#footinfo");

  let totalEmployeesCell = footerRow.querySelector("#totalEmployees");
  let totalSalaryCell = footerRow.querySelector("#totalSalary");
  let averageSalaryCell = footerRow.querySelector("#averageSalary");

  let totalEmployees = allEmployees.length;
  let totalSalary = allEmployees.reduce(function(acc, employee) {
    return acc + employee.salary;
  }, 0);
  let averageSalary = totalEmployees !== 0 ? totalSalary / totalEmployees : 0;

  totalEmployeesCell.textContent = totalEmployees;
  totalSalaryCell.textContent = totalSalary;
  averageSalaryCell.textContent = totalEmployees !== 0 ? "$" + averageSalary : "N/A";
}

function loadData() {
  let employeesJSON = localStorage.getItem('employees');
  if (employeesJSON) {
    allEmployees = JSON.parse(employeesJSON);
  }

  renderDepartmentInfo();
}

loadData();
