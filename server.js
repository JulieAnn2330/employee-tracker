/* Pseudocode
1. Need database -- DONE
2. Need database schema -- DONE
    a. Need three tables inside this schema
        i. department -- DONE
            1. id -- integer and primary key
            2. name -- varchar(30) for department name
        ii. role -- DONE
            1. id -- integer and primary key
            2. title -- varchar(30) for role title
            3. salary -- decimal to hold role salary
            4. department_id -- integer to hold reference to department role belongs to
        iii. employee -- DONE
            1. id -- integer and primary key
            2. first_name -- varchar(30)
            3. last_name -- varchar(30)
            4. role_id -- integer to hold reference to role employee has
            5. manager_id -- integer to hold reference to another employee that manages current employee. Null if employee has no manager
3. Populate tables
4. Command line actions
    a. Add 
        i. Departments
        ii. Roles
        iii. Employees
    b. View
        i. Deparments
        ii. Roles
        iii. Employees
        iv. Employees by manager -- Bonus
        v. Total budget of department -- Bonus
    c. Update
        i. Employee roles
        ii. Employee Managers -- Bonus
    d. Delete -- Bonus
        i. Departments
        ii. Roles
        iii. Employees
5. Packages Needed
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
    a. Schemas
    b. Prompts for bonus questions
    c. Tie workbench to node.js
8. Questions
    a. Does this need to display on the web or only in node?




*/