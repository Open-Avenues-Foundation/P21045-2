/*
Delete the Database using this
DELETE DATABASE testDB;
CREATE DATABASE testDB;
*/

CREATE USER 'testUser'@'localhost' IDENTIFIED WITH mysql_native_password BY 'p4ssw0rd';

GRANT ALL ON testDB.* TO 'testUser'@'localhost';

/*
--Delete the table using this--
USE testDB;
DROP TABLE testTables;*/


USE testDB;
CREATE TABLE testTables (
id INT auto_increment,
Email VARCHAR(255),
First_Name VARCHAR(255),
Last_Name VARCHAR(255),
Phone_number VARCHAR(255),
City VARCHAR(255),
State VARCHAR(255),
Last_Order_Price DECIMAL(13, 2),
Last_Order_Date DATE,
createdAT DATETIME DEFAULT NOW() ,
updatedAt DATETIME DEFAULT NOW(),
deletedAt DATETIME,
PRIMARY KEY(id)
);

INSERT INTO testDB.testTables (Email, First_Name, Last_Name, Phone_number, City, State, Last_Order_Price, Last_Order_Date)
VALUES 
('enlightenedone@paikhuuok.com', 'Frank', 'Farrow', '(202)-555-0140', 'Detroit', 'Michigan', 26, '2021-04-17' ), 
('willstclair@pickuplanet.com', 'Avneet', 'Hancock', '(510)-555-0141', 'Plano', 'Texas', 62.99, '2021-08-25' ),
('jmarkovitch@songshnagu.com', 'Kester', 'Mcdermott', '(657)-555-0184', 'Denver', 'Colorado', 10, '2021-09-11' ),
('hellomedina@manlk.site', 'Anthony', 'Allison', '(909)-555-0171', 'Milwaukee', 'Wisconsin', 55, '2021-11-12' );

use testDB;
SELECT * FROM testTables;
