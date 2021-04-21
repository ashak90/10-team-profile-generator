const inquirer = require(`inquirer`);
const fs = require(`fs`);

const questions = [
    {
        type: "input",
        name: "name",
        message: "Enter the employee's name:",
    }
]

function init(){
    inquirer
        .prompt(questions)
        .then((answers) => {
            console.log("Your responses:", answers)
        })
}

init();