# help-desk-management-system


## Backend Documentation:


<h3>This API is built using Spring Boot,Spring Security,MySQL</h3>


## Installation of Spring Boot API:
1. Clone this repository: `git clone https://github.com/igachev/help-desk-management-system.git`
2. Install dependencies: `mvn clean install`
3. Make sure you have installed MySQL Workbench
4. Set the application.properties file according to your MySQL Workbench username and password.Example of my setup:

spring.application.name=help-desk-api

spring.datasource.url= jdbc:mysql://localhost:3306/helpdesk

spring.datasource.username=root

spring.datasource.password=password

spring.datasource.driver-class-name=com.mysql.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update

5. ##### Execute the following queries in MySQL WorkBench:
        CREATE DATABASE helpdesk;

        use helpdesk;

        CREATE TABLE roles(
        id int primary key,
        name varchar(20)
        );

       INSERT INTO roles (id,name)
       VALUES
       (1,'ADMIN'),
       (2,'USER');

6. Start the application
