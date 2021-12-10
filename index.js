const inquirer = require("inquirer");
const mySQL = require("mysql")

const managerQuestions = [
  {
    type: "input",
    message: "Name of the manager?",
    name: "name",
  },
  {
    type: "input",
    message: "Employees ID?",
    name: "id",
  },
  {
    type: "input",
    message: "Email addres?",
    name: "email",
  },
  {
    type: "input",
    message: "Office number?",
    name: "officeNumber",
  },
];

async function start() {
  let answers = await inquirer.prompt(managerQuestions);
}

start();
