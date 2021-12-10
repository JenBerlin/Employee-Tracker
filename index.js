const inquirer = require("inquirer");
const db = require("./database/connection.js");
require("console.table");

async function start() {
  mainQuestions();
}

function mainQuestions() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "Choices",
        message: "Please choose one of the options:",
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
    ])
    .then((res) => {
      let choice = res.Choices;
      switch (choice) {
        case "View all departments":
          viewDepartments();
          break;
      }
    });
}

function viewDepartments() {
  let query = "SELECT * FROM department";
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    mainQuestions();
  });
}

start();
