var employeesJSON = localStorage.getItem('employees');
var employees = JSON.parse(employeesJSON);

function calculateDepartmentInfo() {
  var departmentInfo = {};

  
  employees.forEach(function(employee) {
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
  var departmentTable = document.getElementById("department-table");

  var tableBody = departmentTable.querySelector("tbody");
  tableBody.innerHTML = "";

  var departmentInfo = calculateDepartmentInfo();

  Object.keys(departmentInfo).forEach(function(departmentName) {
    var department = departmentInfo[departmentName];
    var departmentRow = document.createElement("tr");
    departmentRow.innerHTML = `
      <td>${departmentName}</td>
      <td>${department.employeeCount}</td>
      <td>$${department.totalSalary}</td>
      <td>$${(department.totalSalary / department.employeeCount)}</td>
    `;
    tableBody.appendChild(departmentRow);
  });

 
  var tableFooter = departmentTable.querySelector("tfoot");
  var footerRow = tableFooter.querySelector("#footinfo");

  var totalEmployeesCell = footerRow.querySelector("#totalEmployees");
  var totalSalaryCell = footerRow.querySelector("#totalSalary");
  var averageSalaryCell = footerRow.querySelector("#averageSalary");

  var totalEmployees = employees.length;
  var totalSalary = employees.reduce(function(acc, employee) {
    return acc + employee.salary;
  }, 0);
  var averageSalary = Math.floor(totalSalary / totalEmployees);

  totalEmployeesCell.textContent = totalEmployees;
  totalSalaryCell.textContent = "$" + totalSalary;
  averageSalaryCell.textContent = "$" + averageSalary;
}

renderDepartmentInfo();