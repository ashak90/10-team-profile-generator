const inquirer = require(`inquirer`);
const fs = require(`fs`);
const Intern = require("./lib/Intern");
const Engineer = require("./lib/Engineer");
const Manager = require("./lib/Manager");
const style = require("./assets/style");
const employees = [];

function init() {
  // inquirer
  //     .prompt(questions)
  //     .then((answers) => {
  //         console.log("Your responses:", answers)
  //     })
  startHtml();
  addMember();
}

function addMember() {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the team member's name:",
      },
      {
        type: "list",
        name: "role",
        message: "Select the team member's role:",
        choices: ["Intern", "Engineer", "Manager"],
      },
      {
        type: "input",
        name: "id",
        message: "Enter team member's id:",
      },
      {
        type: "input",
        name: "email",
        message: "Enter team member's email address:",
      },
      // {
      //     type:"input",
      //     name:"id",
      //     message:"Enter team member's email address:",
      // },
    ])
    .then(function ({ name, role, id, email }) {
      let roleSpecs = "";
      if (role === "Engineer") {
        roleSpecs = "Github username";
      } else if (role === "Intern") {
        roleSpecs = "school name";
      } else if (role === "Manager") {
        roleSpecs = "office phone number";
      }
      inquirer
        .prompt([
          {
            message: `Enter the team member's ${roleSpecs}: `,
            name: "roleSpecs",
          },
          {
            type: "list",
            name: "moreMembers",
            message: "Would you like to add more team member's",
            choices: ["Yes", "No"],
          },
        ])
        .then(function ({ roleSpecs, moreMembers }) {
          let newMember;
          if (role === "Engineer") {
            newMember = new Engineer(name, id, email, roleSpecs);
          } else if (role === "Intern") {
            newMember = new Intern(name, id, email, roleSpecs);
          } else {
            newMember = new Manager(name, id, email, roleSpecs);
          }
          employees.push(newMember);
          addHtml(newMember).then(function () {
            if (moreMembers === "Yes") {
              addMember();
            } else {
              completeHtml();
            }
          });
        });
    });
}

function startHtml() {
  const creatHtml = `<!DOCTYPE html>
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

  fs.writeFile("./output/teamprofile.html", creatHtml, function (err) {
    if (err) {
      console.log(err);
    }
  });
  console.log("Generating Team Profile");
}

function addHtml(answer) {
  return new Promise(function (resolve, reject) {
    const name = answer.getName();
    const role = answer.getRole();
    const id = answer.getId();
    const email = answer.getEmail();
    let data = ``
    if (role === "Engineer") {
      const gitHub = answer.getGithub();
     data =` <div class="col-6">
     <div class="card mx-auto mb-3" style="width: 18rem">
     <h5 class="card-header">${name}<br /><br />${role}</h5>
     <ul class="list-group list-group-flush">
         <li class="list-group-item">ID: ${id}</li>
         <li class="list-group-item">Email Address:<a href="mailto:${email}"> ${email} </a> </li>
         <li class="list-group-item">GitHub: <a href="https://github.com/${gitHub}" target="_blank">${gitHub}</a></li>
      </ul> 
      </div>
      </div>`;
    } else if (role === "Intern") {
      const school = answer.getSchool();
      data = `<div class="col-6">
      <div class="card mx-auto mb-3" style="width: 18rem">
      <h5 class="card-header">${name}<br /><br />${role}</h5>
      <ul class="list-group list-group-flush">
          <li class="list-group-item">ID: ${id}</li>
          <li class="list-group-item">Email Address:<a href="mailto:${email}"> ${email}</a> </li>
          <li class="list-group-item">School: ${school}</li>
      </ul>
      </div>
     </div>`;
    } else {
      const officePhone = answer.getOfficeNumber();
      data = `
      <div class="col-6">
      <div class="card mx-auto mb-3" style="width: 18rem">
      <h5 class="card-header">${name}<br /><br />${role}</h5>
      <ul class="list-group list-group-flush">
          <li class="list-group-item">ID: ${id}</li>
          <li class="list-group-item">Email Address:<a href="mailto:${email}"> ${email}</a></li>
          <li class="list-group-item">Office Phone: ${officePhone}</li>
      </ul>
      </div>
    </div>`;
    }
    console.log("Adding another team member");
    fs.appendFile("./output/teamprofile.html",data , function (err) {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
}

function completeHtml() {
  const html = `</div>
    </div
</body>
</html>`;

  fs.appendFile("./output/teamprofile.html", html, function (err) {
    if (err) {
      console.log(err);
    }
  });
  console.log("start");
}

init();
