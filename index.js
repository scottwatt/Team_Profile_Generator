const inquirer = require('inquirer');
const fs = require('fs');
const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');

const makeHTML = require('./src/makeHTML');


const teamArray = [];

const addEmployee = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'role',
            message: 'Please choose an employee role.',
            choices: ['Manager', 'Engineer', 'Intern'],
        },
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the employee on the team?',
            validate: inputedName => {
                if (inputedName) {
                    return true;
                }else {
                    console.log('Please enter an employee!')
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: 'Please enter the ID for the employee.',
            validate: inputedId => {
                if(inputedId){
                    return true;
                }else {
                    console.log('Please enter an ID!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "Please enter the employee's email.",
            validate: email => {
                validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
                if(validEmail){
                    return true;
                }else{
                    console.log("Please enter an email!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: "Please enter the employee's office number.",
            when: (input) => input.role === 'Manager',
            validate: inputedName => {
                if(isNaN(inputedName)) {
                    console.log('Please enter an office number.')
                    return false;
                }else{
                    return true;
                }
            }

        },
        {
            type: 'input',
            name: 'github',
            message: "please enter the employee's GitHub URL!",
            when: (input) => input.role === "Engineer",
            validate: inputedName => {
                if(inputedName){
                    return true;
                }else{
                    console.log("Please enter the Engineer's GitHub!")
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'school',
            message: "Please enter the employee's school!",
            when: (input) => input.role === "Intern",
            validate: nameInput => {
                if(nameInput){
                    return true;
                }else{
                    console.log("Please enter the Intern's school")
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAddEmployee',
            message: "Would you like to add another employee?",
        }
    ])
    .then(employeeData => {
        const {name, id, email, role, officeNumber, github, school, confirmAddEmployee} = employeeData;
        let employee;

        if(role === 'Manager'){
            employee = new Manager(name, id, email, officeNumber);
            console.log(employee);
        }else if(role === "Engineer"){
            employee = new Engineer(name, id, email, github);
            console.log(employee);
        }else if(role === "Intern"){
            employee = new Intern(name, id, email, school);
            console.log(employee);
        }

        teamArray.push(employee);

        if(confirmAddEmployee){
            return addEmployee(teamArray);
        }else {
            return teamArray;
        }


    })
};

const writeFile = data => {
    fs.writeFile('./dist/index.html', data, err => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log("Your teamArray profile has been successfully created! Please check out the index.html")
        }
    })
};

addEmployee()
  .then(teamArray => {
    return makeHTML(teamArray);
  })
  .then(pageHTML => {
    return writeFile(pageHTML);
  })
  .catch(err => {
 console.log(err);
  });