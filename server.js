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
const consoleTable = require('console.table');


// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "Tbjs233069$",
    database: "employee_tracker"
  });

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    // run the start function after the connection is made to prompt the user
    start();
  });

  function start() {
    inquirer
      .prompt({
        type: 'list',
        name: 'action',
        message: 'What do you want to do?',
        choices: [
          'Add department',
          'Add title',
          'Add employee',
          'Delete department',
          'Delete role',
          'Delete employee',
          'Update employee title',
          'View department budget',
          'View department',
          'View employee',
          'View employees by Vice-President',
          'View title',
          'Exit',
        ]
      })
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.action === 'Add department') {
          addDepartment();
        } else if(answer.action === "Add title") {
          addTitle();
        } else if(answer.action === "Add employee") {
            addEmployee();
        } else if(answer.action === "Delete department") {
            deleteDepartment();
        } else if(answer.action === "Delete role") {
            deleteRole();
        } else if(answer.action === "Delete employee") {
            deleteEmployee();
        } else if(answer.action === "Update employee title") {
            updateEmployeeTitle();
        } else if(answer.action === "View department budget") {
            viewDepartmentBudget();
        } else if(answer.action === "View department") {
            viewDepartment();
        } else if(answer.action === "View employee") {
            viewEmployee();
        } else if(answer.action === "View employees by Vice-President") {
            viewEmployeesByVP();
        } else if(answer.action === "View title") {
            viewTitle();
        } else if(answer.action === "Exit") {
          connection.end();
        }
      });
  }

  function addDepartment() {
    inquirer.prompt([       
        {
         type: 'input',
         name: 'department_name',
         message: 'Please enter the new department name.'
         }
        ])
         .then(function(answer) {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
              "INSERT INTO department SET ?",
              {
                department_name: answer.department_name,
              },
              function(err) {
                if (err) throw err;
                console.log("Your department was created successfully!");
                start();
              });
            })
          }
  
    function addTitle() {
    inquirer.prompt([       
        {
            type: 'input',
            name: 'title_name', 
            message: 'Please enter the new title.'
         },
         {
            type: 'input',
            name: 'title_salary', 
            message: 'Please enter the associated salary.'
         },
         {
            type: 'input',
            name: 'title_department', 
            message: 'Please enter the associated department id.'
         },
         {
            type: 'input',
            name: 'title_vp', 
            message: 'Please enter the associated Vice President name.'
         }
        ])
         .then(function(answer) {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
              "INSERT INTO role SET ?",
              {
                title: answer.title_name,
                salary: answer.title_salary,
                department_id: answer.title_department,
                manager_name: answer.title_vp
             },
              function(err) {
                if (err) throw err;
                console.log("Your title was created successfully!");
                start();
              });
          })
       }

       function addEmployee() {
        inquirer.prompt([       
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
                  name: 'employee_role_id',
                  message: 'Please enter the role id of the new employee.'
                },
                {
                  type: 'input',
                  name: 'employee_vp_id',
                  message: 'Please enter the Vice-President id of the new employee.'
                },
                {
                  type: 'input',
                  name: 'employee_vp',
                  message: 'Please enter the Vice-President of the new employee.'
                  },
            ])
             .then(function(answer) {
                // when finished prompting, insert a new item into the db with that info
                connection.query(
                  "INSERT INTO employee SET ?",
                  {
                    first_name: answer.employee_first_name,
                    last_name: answer.employee_last_name,
                    role_id: answer.employee_role_id,
                    manager_name: answer.employee_vp
                  },
                  function(err) {
                    if (err) throw err;
                    console.log("Your employee was created successfully!");
                    start();
                  });
              })
           }

    function deleteDepartment() {
        inquirer.prompt([       
            {
                type: 'list',
                name: 'department_delete',
                message: 'Which department do you want to delete?',
                choices: [
                  'Administration',
                  'Art & Editorial',
                  'Executive',
                  'Human Resources',
                  'Marketihg',
                  'Sales',
                  'Software',
            ]} 
        ])
        .then(function(answer) {
         // when finished prompting, insert a new item into the db with that info
            connection.query(
            "Delete From department where ?",
            {
             department_name: answer.department_delete
            },
            function(err) {
            if (err) throw err;
            console.log("Your department was deleted successfully!");
            start();
          });
        })
    }

    function deleteRole() {
        inquirer.prompt([       
            {
                type: 'list',
                name: 'role_delete',
                message: 'Which role do you want to delete?',
                choices: [
                    'Associate',
                    'Editor',
                    'Graphic Artist',
                    'Manager',
                    'Sales Rep',
                    'Vice-President',
                    'Web Developer',
            ]} 
        ])
        .then(function(answer) {
         // when finished prompting, insert a new item into the db with that info
            connection.query(
            "Delete From role where ?",
            {
             title: answer.role_delete
            },
            function(err) {
            if (err) throw err;
            console.log("Your role was deleted successfully!");
            start();
          });
        })
    }

    function deleteEmployee() {
        inquirer.prompt([       
            {
                type: 'input',
                name: 'delete_employee_first', 
                message: 'Please enter the first name of the employee you want to delete.'
             }
           ])
             .then(function(answer) {
                 connection.query(
                  "Delete from employee where ?",
                  {
                    first_name: answer.delete_employee_first
                  },
                  function(err) {
                    if (err) throw err;
                    console.log("Your employee was deleted successfully!");
                    start();
                  });
              })
           }

    function updateEmployeeTitle() {
        inquirer.prompt([  
            {
                type: 'input',
                name: 'employee_role_update', 
                message: 'Please enter the updated role id for the employee.'
             },     
            {
                type: 'input',
                name: 'employee_update', 
                message: 'Please enter the employee id whose role you want to update.'
             },
          ])
             .then(function(answer) {
                // when finished prompting, insert a new item into the db with that info
                connection.query(
                  "UPDATE employee SET ? WHERE ?",
                  [
                    {
                        role_id: answer.employee_role_update
                        },
                    {
                    id: answer.employee_udpate,
                    },
                  ],
                  function(err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + "role id updated!");
                    start();
                  });
              })
           }

           function viewDepartmentBudget() {
            inquirer.prompt([       
                {
                    type: 'input',
                    name: 'department_budget', 
                    message: 'Please enter the department whose budget you want to view.'
                 }
                ])
                 .then(function(answer) {
                    // when finished prompting, insert a new item into the db with that info
                    connection.query(
                      "select sum(salary) from role ? where ?",
                      {
                        salary: answer.department_budget,
                        },
                    function(err) {
                        if (err) throw err;
                        console.log("Your employee was updated successfully!");
                        start();
                      });
                  })
               }

           function viewDepartment() {
            console.log("Selecting all departments...\n");
            connection.query("SELECT * FROM department", function(err, res) {
              if (err) throw err;
              // Log all results of the SELECT statement
              console.log(res);
              start();
            });
          }

          function viewEmployee() {
            console.log("Selecting all employees...\n");
            connection.query("SELECT * FROM employee", function(err, res) {
              if (err) throw err;
              // Log all results of the SELECT statement
              console.log(res);
              start();
            });
          }

          function viewEmployeesByVP() {
            inquirer.prompt([       
                {
                    type: 'input',
                    name: 'employee_vp', 
                    message: 'Please enter the name of the Vice President you want to view.'
                 },
                ])
                 .then(function(answer) {
                   connection.query(
                    "select * from employee where ?" ,
                     {
                        manager_name: answer.employee_vp
                      },
                      function(err, res) {
                        if (err) throw err;
                        console.log(res);
                        start();
                      });
                  })
               }
          
          function viewTitle() {
            console.log("Selecting all roles...\n");
            connection.query("SELECT * FROM role", function(err, res) {
              if (err) throw err;
              // Log all results of the SELECT statement
              console.log(res);
              start();
            });
          }

     