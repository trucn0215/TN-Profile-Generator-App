const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Choices = require("inquirer/lib/objects/choices");

const employeeList = [];

// Each ask had it own function

// Ask for manager info
function askUserForManagerInfo() {

    console.log("ASK FOR MANAGER INFO!")
    return inquirer.prompt([
        {
            type: "input",
            message: "Please provide Manager's Name!",
            name: "managerName"
        },
        {
            type: "number",
            message: "Enter Manager's ID!",
            name: "managerId"
        },
        {
            type: "input",
            message: "Enter Manager's Email!",
            name: "managerEmail"
        },
        {
            type: "number",
            message: "Enter Manager's Office Number!",
            name: "officeNumber"
        }
    ]).then ((managerData) => {

        const newManager = new Manager (managerData.name, managerData.id, managerData.email, managerData.officeNumber);
        
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
    ]).then ((newEmployeeChoiceData) => {

        // if the selected a new Engineer
        if (newEmployeeChoiceData.employeeType === "Engineer"){
            askUserForEngineerInfo();
        }

        // ELSE if the user selected a new Intern
        // askUserForInternInfo();

        // ELSE
        else{
            console.log("DONE!")
        }
        // createHTML();
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
            name: "engineerName"
        },
        {
            type: "number",
            message: "Enter Engineer's ID!",
            name: "engineerId"
        },
        {
            type: "input",
            message: "Enter Engineer's Email!",
            name: "engineerEmail"
        },
        {
            type: "input",
            message: "Enter Engineer's GitHub Username!",
            name: "github"
        }
    ]).then ((engineerData) => {
        const newEngineer = new Engineer (engineerData.name, engineerData.id, engineerData.email, engineerData.github);
        
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
            name: "internName"
        },
        {
            type: "number",
            message: "Enter Intern's ID!",
            name: "internId"
        },
        {
            type: "input",
            message: "Enter Intern's Email!",
            name: "internEmail"
        },
        {
            type: "input",
            message: "Enter Intern's school!",
            name: "school"
        }
    ]).then ((internData) => {

    })
}


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
// function teamMember() {
//     inquirer
//         .prompt([

//             {
//                 message: "Enter a Employee's name!",
//                 name: "name"
//             },
//             {
//                 message: "Enter Employee's ID!",
//                 name: "id"
//             },
//             {
//                 message: "Enter Employee's Email!",
//                 name: "email"
//             },
//             {
//                 type: "list",
//                 message: "Select employee's role!",
//                 choices: [
//                     "Manager",
//                     "Engineer",
//                     "Intern"
//                 ],
//                 name: "role"
//             }
//         ])
//         .then((response) => {
//             console.log(response);
//         })
// }

function createHTML() {

    const htmlContent = render(employeeList);

    const html = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>My Team</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" href="style.css">
        <script src="https://kit.fontawesome.com/c502137733.js"></script>
    </head>
    
    <body>
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 jumbotron mb-3 team-heading">
                    <h1 class="text-center">My Team</h1>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="team-area col-12 d-flex justify-content-center">
                    {{ team }}
                </div>
            </div>
        </div>
    </body>
    
    </html>`;

    fs.writeFile("./output/team.html", html, function (err) {
        if (err) {
            console.log(err);
        }
    });
    console.log("HTML file created");
}

askUserForManagerInfo(); // Use this to kick of the app

// teamMember();
// createHTML();
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
