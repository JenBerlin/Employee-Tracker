-- DELETE DB
DROP DATABASE IF EXISTS tracker_db;
-- CREATE DB
CREATE DATABASE tracker_db;
-- SELECT DB
USE tracker_db;
-- CREATE TABLES
CREATE TABLE department (
    id INT UNSIGNED AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role (
    -- "auto_increment" is creating an id automatically
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT UNSIGNED NOT NULL,
    CONSTRAINT fk_department FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE CASCADE 
);

CREATE TABLE employee (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT UNSIGNED NOT NULL,
    CONSTRAINT fk_role FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE CASCADE
    );