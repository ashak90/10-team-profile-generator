const inquirer = require(`inquirer`);
const fs = require(`fs`);
const Employee = require("./lib/Employee")

const questions = [
    {
        type: "input",
        name: "name",
        message: "Enter the team member's name:",
    },
    {
        type: "list",
        name: "role",
        message:"Select the team member's role:",
        choices: [
            "Intern",
            "Employee",
            "Engineer",
            "Manager" 
        ]
    },
    {
        type:"input",
        name:"email",
        message:"Enter team member's id:",
    },
    {
        type:"input",
        name:"id",
        message:"Enter team member's email address:",
    },
    {
        type:"input",
        name:"id",
        message:"Enter team member's email address:",
    },

]

function init(){
    inquirer
        .prompt(questions)
        .then((answers) => {
            console.log("Your responses:", answers)
        })
}

init();