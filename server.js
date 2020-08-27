/* Pseudocode
1. Need database -- DONE
2. Need database schema -- DONE
    a. Need three tables inside this schema -- DONE
        i. department -- DONE
            1. id -- integer and primary key -- DONE
            2. name -- varchar(30) for department name -- DONE
        ii. role -- DONE
            1. id -- integer and primary key -- DONE
            2. title -- varchar(30) for role title -- DONE
            3. salary -- decimal to hold role salary -- DONE
            4. department_id -- integer to hold reference to department role belongs to -- DONE
        iii. employee -- DONE
            1. id -- integer and primary key -- DONE
            2. first_name -- varchar(30) -- DONE
            3. last_name -- varchar(30) -- DONE
            4. role_id -- integer to hold reference to role employee has -- DONE
            5. manager_id -- integer to hold reference to another employee that manages current employee. Null if employee has no manager -- DONE
3. Populate tables -- DONE
4. Command line actions
    a. Add 
        i. Departments -- Prompt Written
        ii. Roles -- Prompt Written
        iii. Employees -- Prompt Written
    b. View
        i. Deparments -- Prompt Written / SQL Code DONE
        ii. Roles-- Prompt Written /  DONE
        iii. Employees -- Prompt Written DONE
        iv. Employees by manager -- Bonus -- Prompt Written -- SQL Code DONE
        v. Total budget of department -- Bonus
    c. Update
        i. Employee roles - Prompt Written
        ii. Employee Managers -- Bonus -- Prompt Written
    d. Delete -- Bonus
        i. Departments -- Prompt Written
        ii. Roles - Prompt Written
        iii. Employees - Prompt written
5. Packages Needed -- DONE
    a. npm init -- DONE
    b. npm install -- DONE
    c. mysql -- DONE
    d. inquirer -- DONE
    e. console.table -- DONE
    f. nodemon -- DONE
    g. ,gitignore -- DONE
6. Folders/Files Needed -- DONE
    a. db -- Folder -- DONE
        i. schemas.sql -- File -- DONE
        ii. seeds.sql -- File -- DONE
    b. server.js -- File in root directory -- DONE
7. Code Needed
    a. Schemas -- DONE
    b. Prompts for bonus questions
    c. Tie workbench to node.js
8. Questions
    a. Does this need to display on the web or only in node?
*/

const inquirer = require('inquirer');
const fs = require('fs');
const util = require("util");
const mysql = require('mysql');
const Employee = require('../template-engine-employee-summary/Develop/lib/Employee');


const writeFileAsync = util.promisify(fs.writeFile);

     await inquirer.prompt([
          {
          type: 'list',
          name: 'action',
          message: 'What do you want to do?',
          choices: [
            'Add department',
            'Add title',
            'Add employee',
            'Delete department',
            'Delete title',
            'Delete employee',
            'Update employee role',
            'View department budget',
            'View deparment',
            'View employee',
            'View employees by Vice-President',
            'View title',
         ]},
     ])

     .then((answers) => {
         action = answers.action;
     });

     switch (action) {
         case "Add Department":
             await inquirer.prompt([       
         {
          type: 'input',
          name: 'department_name',
          message: 'Please enter the new department name.'
          },
             ])
        .then((answers) => {
        const department = new Department;
        (answers.department);
        department.push(department);
            })

        case "Add Title":
           await inquirer.prompt ([
             {  
          type: 'input',
          name: 'title_name', 
          message: 'Please enter the new title.'
          },
        ])

        .then((answers) => {
            const title = new Title
            (answers.title);
            role.push(title);
        });

        case "Add employee":
          await inquirer.prompt([
          {    
          type: 'input',
          name: 'employee_first_name',
          message: 'Please enter the first name of the new employee.'
          },
          {
          type: 'input',
          name: 'employee_last_name',
          message: 'Please enter the last name of the new employee.'
          },
          {
            type: 'input',
            name: 'employee_department',
            message: 'Please enter the department of the new employee.'
          },
          {
            type: 'input',
            name: 'employee_title',
            message: 'Please enter the title of the new employee.'
          }
        ])

        .then((answers) => {

            const employee = new Employee
            (answers.first_name, answers.last_name, answers.employee_department, answers.employee.title);

            employee.push(employee);
        });

        case "View Department":
            await inquirer.prompt([
          {
          type: 'list',
          name: 'department_view',
          message: 'Which department do you want to view?',
          choices: [
            'All', 
            'Art & Editorial',
            'Executive',
            'Human Resources',
            'Marketihg',
            'Sales',
            'Software',
         ]},
    ])
         //.then

         case "View Title":
             await inquirer.prompt([
         {
        type: 'list',
          name: 'title_view',
          message: 'Which title do you want to view?',
          choices: [
            'All', 
            'Associate',
            'Editor',
            'Graphic Artist',
            'Manager',
            'Sales Rep',
            'Vice-President',
            'Web Developer',
         ]},
        ])

        //.then

        case "View Employee":
            await inquirer.prompt([
         {
            type: 'list',
              name: 'employee_view',
              message: 'Which employee do you want to view?',
              choices: [
                'All', 
                'Scott Adams',
                'Rob Andrews',
                'Zoe Baker',
                'Troy Batson',
                'Joseph Daniels',
                'Natalie Ericsson',
                'Matt Evans',
                'Rachel Greer',
                'Olivia Johnson',
                'Sarah Jones',
                'Julie Schaub',
                'Patrick Sellen',
                'Paige Sellen',
                'John Smith',
            ]},
        ])

        //.then

        
        case "Update Employee":
            await inquirer.prompt([
          {
          type: 'list',
          message: 'Which employee do you want to update?',
          name: 'employee_update',
          choices: [
            'Scott Adams',
            'Rob Andrews',
            'Zoe Baker',
            'Troy Batson',
            'Joseph Daniels',
            'Natalie Ericsson',
            'Matt Evans',
            'Rachel Greer',
            'Olivia Johnson',
            'Sarah Jones',
            'Julie Schaub',
            'Patrick Sellen',
            'Paige Sellen',
            'John Smith',
        ]},
           {
          type: 'list',
          name: 'choose_update',
          message: 'What about this employee do you want to update?',
          choices: [
            'Title',
            'Department',
            'Salary',
            'Vice-President',
          ]},
        ])

switch (choose_update) {
    case "Title Update":
        await inquirer.prompt([
          {
            type: 'list',
            name: 'title_update',
            message: 'What title do you want this employee updated to?',
            choices: [
                'Associate',
                'Editor',
                'Graphic Artist',
                'Manager',
                'Sales Rep',
                'Vice-President',
                'Web Developer',
          ]},
      ])

    .then((answers) => {
        const title_update = new Title_Update
        (answers.title_update)
        role.push(title_update);
    });

    case "Department Update":
        await inquirer.prompt([
          {
            type: 'list',
            name: 'department_update',
            message: 'What department do you want this employee updated to?',
            choices: [
                'Art & Editorial',
                'Executive',
                'Human Resources',
                'Marketihg',
                'Sales',
                'Software',
            ]},
        ])

        //.then

        case "VP Update":
            await inquirer.prompt([          {
            type: 'list',
            name: 'vp_update',
            message: 'What Vice-President do you want this employee updated to?',
            choices: [
                'Troy Batson',
                'Julie Schaub',
            ]},
        ])

        //.then


        case "VP View":
            await inquirer.prompt([
          {
            type: 'list',
            name: 'vp_view',
            message: 'Which Vice-President to you want to view?',
            choices: [
              'All',
              'Troy Batson',
              'Julie Schaub',
            ]},
        ])

        //.then

        case "Delete Employee":
await inquirer.prompt([
          {
          type: 'list',
          message: 'Which employee do you want to delete?',
          name: 'employee_delete',
          choices: [
            'Scott Adams',
            'Rob Andrews',
            'Zoe Baker',
            'Troy Batson',
            'Joseph Daniels',
            'Natalie Ericsson',
            'Matt Evans',
            'Rachel Greer',
            'Olivia Johnson',
            'Sarah Jones',
            'Julie Schaub',
            'Patrick Sellen',
            'Paige Sellen',
            'John Smith',
        ]},
    ])

    //.then

    case "Delete Title":

    await inquirer.prompt([
          {
          type: 'list',
          name: 'title_delete',
          message: 'Which title do you want to delete?',
          choices: [
            'Associate',
            'Editor',
            'Graphic Artist',
            'Manager',
            'Sales Rep',
            'Vice-President',
            'Web Developer',
        ]},
    ])

    //.then

    case "Delete Department":
        await inquirer.prompt([
         {
            type: 'list',
            name: 'department_delete',
            message: 'Which department do you want to delete?',
            choices: [
              'Art & Editorial',
              'Executive',
              'Human Resources',
              'Marketihg',
              'Sales',
              'Software',
            ]} 
   ])
};
    


                 

// function to initialize program
async function init() {
    try {
         const answers = await promptUser();

         const readMe = generateREADME(answers);

         await writeFileAsync('README.md', readMe);
         console.log('Successfully written to README.md');
         
    } catch (err) {
         console.log(err);
    }
}}

// function call to initialize program
init(); 