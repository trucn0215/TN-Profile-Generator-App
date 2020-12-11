const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeeList = [];

// Each ask had it own function

// Ask for manager info
function askUserForManagerInfo() {

    console.log("ASK FOR MANAGER INFO!")
    return inquirer.prompt([
        {
            type: "input",
            message: "Please provide Manager's Name!",
            name: "name"
        },
        {
            type: "number",
            message: "Enter Manager's ID!",
            name: "id"
        },
        {
            type: "input",
            message: "Enter Manager's Email!",
            name: "email"
        },
        {
            type: "number",
            message: "Enter Manager's Office Number!",
            name: "officeNumber"
        }
    ]).then((managerData) => {

        const newManager = new Manager(managerData.name, managerData.id, managerData.email, managerData.officeNumber);

        //push newManager to employeeList
        employeeList.push(newManager);

        askUserForEmployeeType();
    })
}

// Ask user for next employee type
function askUserForEmployeeType() {

    console.log(" ")
    console.log("EMPLOYEE TYPE!")

    return inquirer.prompt([
        {
            type: "list",
            message: "Which type of team member would you like to add? `(Use arrow key to select)`",
            choices: ["Engineer", "Intern", "I don't have any more member to add!"],
            name: "employeeType"
        }
    ]).then((newEmployeeChoiceData) => {

        // if the selected a new Engineer
        if (newEmployeeChoiceData.employeeType === "Engineer") {
            askUserForEngineerInfo();
        }

        // ELSE if the user selected a new Intern
        else if (newEmployeeChoiceData.employeeType === "Intern") {
            askUserForInternInfo();
        }

        // ELSE
        else {
            // console.log(employeeList)
            createHTML();
        }
    })
}

// Ask user for engineer info
function askUserForEngineerInfo() {

    console.log(" ")
    console.log("ENGINEER INFO!")
    return inquirer.prompt([
        {
            type: "input",
            message: "Please provide Engineer's Name!",
            name: "name"
        },
        {
            type: "number",
            message: "Enter Engineer's ID!",
            name: "id"
        },
        {
            type: "input",
            message: "Enter Engineer's Email!",
            name: "email"
        },
        {
            type: "input",
            message: "Enter Engineer's GitHub Username!",
            name: "github"
        }
    ]).then((engineerData) => {
        const newEngineer = new Engineer(engineerData.name, engineerData.id, engineerData.email, engineerData.github);

        //push newManager to employeeList
        employeeList.push(newEngineer);

        askUserForEmployeeType();
    })
}

// Ask user for intern info
function askUserForInternInfo() {

    console.log(" ")
    console.log("INTERN INFO!")
    return inquirer.prompt([
        {
            type: "input",
            message: "Please provide Intern's Name!",
            name: "name"
        },
        {
            type: "number",
            message: "Enter Intern's ID!",
            name: "id"
        },
        {
            type: "input",
            message: "Enter Intern's Email!",
            name: "email"
        },
        {
            type: "input",
            message: "Enter Intern's school!",
            name: "school"
        }
    ]).then((internData) => {
        const newInter = new Intern(internData.name, internData.id, internData.email, internData.school);

        //push newManager to employeeList
        employeeList.push(newInter);

        askUserForEmployeeType();
    })
}

function createHTML() {

    const htmlContent = render(employeeList);

    // console.log(htmlContent);

    fs.writeFile(outputPath, htmlContent, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("HTML file created");

    });
}

askUserForManagerInfo(); // Use this to kick of the app
