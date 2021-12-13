const inquirer = require("inquirer");
const db = require("./database/connection.js");
require("console.table");

async function start() {
  mainQuestions();
}

async function mainQuestions() {
  const res = await inquirer.prompt([
    {
      type: "list",
      name: "Choices",
      message: "Please choose one of the options or add:",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "Exit",
      ],
    },
  ]);
  let choice = res.Choices;
  switch (choice) {
    case "View all departments":
      viewDepartments();
      break;
    case "View all roles":
      viewRoles();
      break;
    case "View all employees":
      viewEmployees();
      break;
    case "Add a department":
      addDepartment();
      break;
    case "Add a role":
      addRole();
      break;
    case "Add a employee":
      addEmployee();
      break;
  }
}

function viewDepartments() {
  let query = "SELECT * FROM department";
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    mainQuestions();
  });
}

function viewRoles() {
  let query = "SELECT * FROM role";
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    mainQuestions();
  });
}

function viewEmployees() {
  let query = `
      SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary 
      FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id`;
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    mainQuestions();
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Please enter the new departments name:",
      },
    ])
    .then((res) => {
      let name = res.name;
      const query = `INSERT INTO department (name) VALUES ("${name}")`;
      db.query(query, (err, res) => {
        if (err) throw err;
        mainQuestions();
      });
    });
}

function addRole() {
  let query = "SELECT name FROM department";
  db.query(query, (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "Please enter the new role:",
        },

        {
          type: "input",
          name: "salary",
          message: "Please enter the salary:",
        },
        {
          type: "list",
          name: "Choices",
          message: "Please choose one of the departments:",
          choices: res,
        },
      ])
      .then((res) => {
        //         INSERT INTO table2 (column1, column2, column3, ...)
        // SELECT column1, column2, column3, ...
        // FROM table1
        // WHERE condition;
        const query = `INSERT INTO role
        (title, salary, department_id)
        SELECT "${res.title}", ${res.salary}, id FROM department WHERE name = "${res.Choices}"`;
        db.query(query, (err, res) => {
          if (err) throw err;
          mainQuestions();
        });
      });
  });
}

function addEmployee() {
  let query = "SELECT titel FROM role";
  db.query(query, (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "input",
          name: "firstName",
          message: "Please enter the FIRST name of the new employee:",
        },
        {
          type: "input",
          name: "lastName",
          message: "Please enter the LAST name of the new employee:",
        },
        {
          type: "list",
          name: "title",
          message: "Please choose one title:",
          choices: res,
        },
      ])
      .then((res) => {
        //         INSERT INTO table2 (column1, column2, column3, ...)
        // SELECT column1, column2, column3, ...
        // FROM table1
        // WHERE condition;
        const query = `INSERT INTO employee
        (first_name, last_name, role_id)
        SELECT "${res.firstName}", "${res.lastName}", id FROM role WHERE title = "${res.title}"`;
        db.query(query, (err, res) => {
          if (err) throw err;
          mainQuestions();
        });
      });
  });
}

start();
