INSERT INTO department (name)
VALUES ("Legal"), ("Finance"), ("HR"), ("Marketing");

INSERT INTO role (title, salary, department_id)
VALUES ("Lawyer", 200.000, 1),
        ("Accountant", 100.000, 2),
        ("Key Account", 70.000, 3),
        ("Public Relations", 70.000, 4),
        ("Social Media", 50.000, 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Anna", "Smith", 5),
        ("Bob", "Ross", 2),
        ("Lisi", "McCormack", 3),
        ("Peter", "Meyer", 1),
        ("Fin", "Stone", 4);