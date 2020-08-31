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
          'Add role',
          'Add employee',
          'Delete department',
          'Delete role',
          'Delete employee',
          'Update employee role',
          'View department budget',
          'View departments',
          'View employees',
          'View employees by Vice-President',
          'View roles',
          'Exit',
        ]
      })
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.action === 'Add department') {
          addDepartment();
        } else if(answer.action === "Add role") {
          addRole()
        } else if(answer.action === "Add employee") {
            addEmployee();
        } else if(answer.action === "Delete department") {
            deleteDepartment();
        } else if(answer.action === "Delete role") {
            deleteRole();
        } else if(answer.action === "Delete employee") {
            deleteEmployee();
        } else if(answer.action === "Update employee role") {
            updateEmployeeRole();
        } else if(answer.action === "View department budget") {
            viewDepartmentBudget();
        } else if(answer.action === "View department") {
            viewDepartments();
        } else if(answer.action === "View employee") {
            viewEmployees();
        } else if(answer.action === "View employees by Vice-President") {
            viewEmployeesByVP();
        } else if(answer.action === "View roles") {
            viewRoles();
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
             ({
                department_name: answer.department_name,
              }),
              function(err, res) {
                if (err) throw err;
                console.table(res);
                console.log("Your department was created successfully!");
                viewDepartments();
                start();
              });
            })
          }
  
    function addRole() {
    inquirer.prompt([       
        {
            type: 'input',
            name: 'role_name', 
            message: 'Please enter the new role.'
         },
         {
            type: 'input',
            name: 'role_salary', 
            message: 'Please enter the associated salary.'
         },
         {
            type: 'input',
            name: 'role_department', 
            message: 'Please enter the associated department id.'
         },
         {  type: "input",
            name: "role_id_vp",
            message: 'Please enter the associated Vice President id.'
        },
         {
            type: 'input',
            name: 'role_vp', 
            message: 'Please enter the associated Vice President name.'
         }
        ])
         .then(function(answer) {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
              "INSERT INTO role SET ?",
              {
                role: answer.role_name,
                salary: answer.role_salary,
                department_id: answer.role_department,
                manager_id: answer.role_id_vp,
                manager_name: answer.role_vp
              },
              function(err, res) {
                if (err) throw err;
                console.table(res);
                console.log("Your role was created successfully!");
                viewRoles();
                start();
              })
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
                  ({
                    first_name: answer.employee_first_name,
                    last_name: answer.employee_last_name,
                    role_id: answer.employee_role_id,
                    manager_id: answer.employee_vp_id,
                    manager_name: answer.employee_vp
                  }),
                  function(err, res) {
                    if (err) throw err;
                    console.log("Your employee was created successfully!");
                    viewEmployees();
                    start();
                  });
              })
           }

    function deleteDepartment() {
        inquirer.prompt([       
            {
                type: 'input',
                name: 'department_delete',
                message: 'Which department do you want to delete?',
            }
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
            viewDepartments();
            start();
          });
        })
    }

    function deleteRole() {
        inquirer.prompt([       
            {
                type: 'input',
                name: 'role_delete',
                message: 'What is the id of the role you want to delete?',
            } 
        ])
        .then(function(answer) {
         // when finished prompting, insert a new item into the db with that info
            connection.query(
            "Delete From role where ?",
            {
            role_id: answer.role_delete
            },
            function(err, res) {
            if (err) throw err;
            console.table(res);
            console.log('Your role was deleted successfully!')
            viewRoles();
            start();
          });
        })
    }

    function deleteEmployee() {
        inquirer.prompt([       
            {
                type: 'input',
                name: 'delete_employee_id', 
                message: 'Please enter the id of the employee you want to delete.'
             }
           ])
             .then(function(answer) {
                 connection.query(
                  "Delete from employee where ?",
                 ({
                    id: answer.delete_employee_id
                  }),
                  function(err, res) {
                    if (err) throw err;
                    console.table([res]);
                    viewEmployees();
                    start();
                  });
              })
           }

    function updateEmployeeRole() {
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
                  "UPDATE employee SET ? WHERE  ?",
                  ([
                    {
                    role_id: answer.employee_role_update
                    },
                    {
                    id: answer.employee_udpate,
                    },
                  ]),
                  function(err, res) {
                    if (err) throw err;
                    console.table(res);
                    viewEmployees();
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
                      ({
                        salary: answer.department_budget,
                        }),
                    function(err) {
                        if (err) throw err;
                        console.log("Your employee was updated successfully!");
                        viewDepartment();
                        start();
                      });
                  })
               }

           function viewDepartments() {
            console.log("Selecting all departments...\n");
            connection.query("SELECT * FROM department", function(err, res) {
              if (err) throw err;
              // Log all results of the SELECT statement
              console.table(res);
              start();
            });
          }

          function viewEmployees() {
            console.log("Selecting all employees...\n");
            connection.query("SELECT * FROM employee", function(err, res) {
              if (err) throw err;
              // Log all results of the SELECT statement
              console.table(res);
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
                     console.log("Selecting chosen Vice President")
                   connection.query(
                    "select * from employee where ?" ,
                     ({
                        manager_name: answer.employee_vp
                      }),
                      function(err, res) {
                        if (err) throw err;
                        console.table(res);
                        start();
                      });
                  })
               }
          
          function viewRoles() {
            console.log("Selecting all roles...\n");
            connection.query("SELECT * FROM role", function(err, res) {
              if (err) throw err;
              // Log all results of the SELECT statement
              console.table(res);
              start();
            });
          }

     