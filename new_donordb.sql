CREATE DATABASE organ_donor_db;
use organ_donor_db;
CREATE TABLE PatientsOrDonor(
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    phone VARCHAR(15));

select * from PatientsOrDonor;

CREATE TABLE hospitals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hospital_name VARCHAR(150),
    contact_person VARCHAR(100),
    license_number VARCHAR(100),
    phone VARCHAR(15),
    address TEXT,
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255)
);

select * from hospitals;
drop table PatientsOrDonor;

show tables; 

CREATE TABLE hospitals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    location VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE hospital_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hospital_name VARCHAR(255),
    phone VARCHAR(20),
    organ VARCHAR(100),
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 

select * from hospital_requests;
desc hospital_requests;
CREATE TABLE requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hospital_id INT,
    donor_id INT,
    organ_type VARCHAR(50),
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (hospital_id) REFERENCES hospitals(id),
    FOREIGN KEY (donor_id) REFERENCES donors(id)
);
describe requests;
drop table requests; 

CREATE TABLE requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hospital_id INT NOT NULL,
    donor_id INT NOT NULL,
    organ_type VARCHAR(50),
    status ENUM('pending','accepted','rejected','completed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (hospital_id) REFERENCES hospitals(id) ON DELETE CASCADE,
    FOREIGN KEY (donor_id) REFERENCES PatientsOrDonor(id) ON DELETE CASCADE
);

alter table donation_info add donor_id int;
select * from donation_info;
DELETE FROM donation_info WHERE donor_id IS NULL;
ALTER TABLE donation_info MODIFY donor_id INT NOT NULL;
select * from PatientsOrDonor; 
select * from Hospitals; 

use demo_crud;
show tables;

create database demo_crud2;
create table users(id int not null primary key auto_increment,
                  name varchar(50),email varchar(50)); 


use organ_donor_db;
show tables;
describe requests;
desc hospitals;
desc donation_info;
select * from hospitals;
desc patientsordonor;
select * from patientsordonor;
select * from donation_info;
select * from requests;	
alter table donation_info add column donor_name varchar(25); 

Truncate donation_info;
SELECT availability FROM donation_info;
UPDATE donation_info
SET availability = 'available'
WHERE availability = 'yes'; 





