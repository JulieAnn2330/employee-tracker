INSERT INTO department
(department_name
)
VALUES
("marketing"
),
("art_and_editorial"
),
("software"
),
("sales"
),
("hr"
),
("executive"
);

INSERT INTO role
( title, salary, department_id
)
VALUES
("associate", 60000, 1
),
("graphic_artist", 75000, 2
),
("editor", 65000, 2
),
("web_developer", 70000, 3
),
("sales_rep", 65000, 4
),
("manager", 85000, 5
),
("vice-president", 100000, 6
);

INSERT INTO employee
(id, first_name, last_name, role_id, manager_id
)
VALUES
(1, "John", "Smith", 4, 23
),
(2, "Zoe", "Baker", 2, 23
),
(3, "Sarah", "Jones", 3, 23
),
(4, "Matt", "Evans", 4, 23
),
(5, "Scott", "Adams", 5, 55
),
(23, "Julie", "Schaub", 7, null
),
(55, "Troy", "Batson", 7, null
),
(6, "Patrick", "Sellen", 6, 23
),
(7, "Paige", "Sellen", 1, 55
),
(8, "Rob", "Andrews", 1, 55
),
(9, "Rachel", "Greene", 5, 23
),
(10, "Joseph", "Daniels", 1, 55
),
(11, "Natalie", "Ericsson", 5, 55
),
(12, "Olivia", "Johnson", 4, 23
)
;


