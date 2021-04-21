const inquirer = require(`inquirer`);
const fs = require(`fs`);
const Employee = require("./lib/Employee")
const style = require("./assets/style")

function init(){
    // inquirer
    //     .prompt(questions)
    //     .then((answers) => {
    //         console.log("Your responses:", answers)
    //     })
    startHtml()
    addMember();
}

function addMember () {
   return inquirer.prompt([
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
        name:"id",
        message:"Enter team member's id:",
    },
    {
        type:"input",
        name:"email",
        message:"Enter team member's email address:",
    },
    // {
    //     type:"input",
    //     name:"id",
    //     message:"Enter team member's email address:",
    // },
])
}

function startHtml() {
    const creatHtml = 
    `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"> 
      <style> ${style} </style>
      <title> Team Profile </title>
    </head>
    <body>
       <nav class="navbar navbar-dark bg-dark mb-5">
            <span class="navbar-brand mb-0 h1 w-100 text-center">Team Profile</span>
        </nav>
        <div class="container">
            <div class="row">`;

    fs.writeFile("./output/teamprofile.html", creatHtml, function(err){
        if (err) {
            console.log(err);
        }
    });
    console.log ("start");
}


init();