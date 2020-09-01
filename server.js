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
          'Update employee Vice President',
          'View departments',
          'View employees',
          'View employees by department',
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
        } else if(answer.action === "Update employee Vice President") {
            updateEmployeeVicePresident();
        } else if(answer.action === "View departments") {
            viewDepartments();
        } else if(answer.action === "View employees") {
            viewEmployees();
        } else if(answer.action === "View employees by department") {
            viewEmployeesByDepartment();
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
             {
                DepartmentName: answer.department_name,
              },
              function(err, res) {
                if (err) throw err;
                console.table(res);
                console.log("Your department was created successfully!");
                viewDepartments();
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
            message: 'Please enter the department id this role is a part of.',
          },
         ])
         .then(function(answer) {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
              "Insert into role set ?",
              {
               Role: answer.role_name, 
               Salary: answer.role_salary, 
               DepartmentID:answer.role_department
              },
              function(err) {
                if (err) throw err;
                console.log("Your role was created successfully!");
                viewRoles();
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
                  type: 'list',
                  name: 'employee_vp_id',
                  message: "Please choose the new employee's Vice President, where Julie Schaub = 1 and Troy Batson = 2.",
                  choices: [
                    '1',
                    '2'
                  ]
                }
               ])
             .then(function(answer) {
                // when finished prompting, insert a new item into the db with that info
                connection.query(
                  "INSERT INTO employee SET ?",
                  {
                    FirstName: answer.employee_first_name,
                    LastName: answer.employee_last_name,
                    RoleID: answer.employee_role_id,
                    ManagerID: answer.employee_vp_id,
                  },
                  function(err) {
                    if (err) throw err;
                    console.log("Your employee was created successfully!");
                    viewEmployees();
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
             DepartmentName: answer.department_delete
            },
            function(err) {
            if (err) throw err;
            console.log("Your department was deleted successfully!");
            viewDepartments();
            });
        })
    }

    function deleteRole() {
        inquirer.prompt([       
            {
                type: 'input',
                name: 'role_delete',
                message: 'What is the name of the role you want to delete?',
            } 
        ])
        .then(function(answer) {
         // when finished prompting, insert a new item into the db with that info
            connection.query(
            "Delete From role where ?",
            {
            Role: answer.role_delete
            },
            function(err) {
            if (err) throw err;
            console.log('Your role was deleted successfully!')
            viewRoles();
            });
        })
    }

    function deleteEmployee() {
        inquirer.prompt([       
            {
                type: 'input',
                name: 'delete_employee_first', 
                message: 'Please enter the first name of the employee you want to delete.',
             },
             {
              type: 'input',
              name: 'delete_employee_last', 
              message: 'Please enter the last name of the employee you want to delete.',
           }
           ])
             .then(function(answer) {
                 connection.query(
                  'Delete from employee where FirstName = ? and LastName = ?',
                  [answer.delete_employee_first, answer.delete_employee_last],  
                  function(err) {
                    if (err) throw err;
                    viewEmployees();
                  });
              })
           }

    function updateEmployeeRole() {
        inquirer.prompt([  
          {
            type: 'input',
            name: 'employee_update', 
            message: 'Please enter the employee id whose role you want to update.'
         },
            {
                type: 'input',
                name: 'employee_role_update', 
                message: 'Please enter the updated role id for the employee.'
             }    
         ])
             .then(function(answer) {
                // when finished prompting, insert a new item into the db with that info
                connection.query(
                  'Update employee set RoleID = ? where ID = ?',
                  [answer.employee_role_update, answer.employee_update],  
                function(err) {
                    if (err) throw err;
                    viewEmployees();
                  });
              })
           }

           function updateEmployeeVicePresident() {
            inquirer.prompt([  
              {
                type: 'input',
                name: 'employee_vp_update', 
                message: 'Please enter the id of the employee whose Vice President you want to update.'
             },
                {
                    type: 'input',
                    name: 'vp_update', 
                    message: 'Please enter the id of the updated Vice President for the employee.'
                 }    
             ])
                 .then(function(answer) {
                    // when finished prompting, insert a new item into the db with that info
                    connection.query(
                      'Update employee set ManagerID = ? where ID = ?',
                      [answer.vp_update, answer.employee_vp_update],  
                    function(err) {
                        if (err) throw err;
                        viewEmployees();
                      });
                  })
               }

            function viewDepartments() {
                console.log("Selecting all departments...\n");
                connection.query("SELECT * FROM Department", function(err, res) {
                  if (err) throw err;
                  // Log all results of the SELECT statement
                  console.table(res);
                  start();
                });
              }

          function viewEmployees() {
            console.log("Selecting all employees...\n");
            connection.query("SELECT employee.FirstName, employee.LastName, role.Role, role.Salary, department.DepartmentName, employee.ManagerID from role inner join employee on employee.RoleID = role.RoleID inner join department on department.DepartmentID = role.DepartmentID order by employee.FirstName", function(err, res) {
              if (err) throw err;
              // Log all results of the SELECT statement
              console.table(res);
              start();
            });
          }

          function viewEmployeesByDepartment() {
            inquirer.prompt([  
              {
                type: 'input',
                name: 'employee_department_view', 
                message: 'Please enter the name of the department you want to view.', 
              }  
             ])
             .then(function(answer) {
            console.log("Selecting department...\n");
            connection.query(
              "SELECT employee.FirstName, employee.LastName, role.Role, role.Salary, department.DepartmentName from role inner join employee on employee.RoleID = role.RoleID inner join department on department.DepartmentID = role.DepartmentID where DepartmentName = ?",
            [answer.employee_department_view],  
            function(err, res) {
                if (err) throw err;
                console.table(res);
                //viewDepartments();
                start();
              });
            })
          }
         
          function viewEmployeesByVP() {
            inquirer.prompt([       
                {
                    type: 'list',
                    name: 'employee_vp', 
                    message: 'Please choose the Vice President you want to view, where Julie Schaub = 1 and Troy Batson = 2.',
                    choices: [
                      '1',
                      '2'
                    ]
                 },
                ])
                 .then(function(answer) {
                     console.log("Selecting chosen Vice President")
                   connection.query(
                    "select * from employee where ManagerID = ?",
                      [answer.employee_vp],
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
              console.table(res);
              start();
            });
          }

     