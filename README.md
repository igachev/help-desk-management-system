# help-desk-management-system





## Installation of Spring Boot API:
1. Clone this repository: `git clone https://github.com/igachev/help-desk-management-system.git`
2. Go to folder help-desk-api: `cd help-desk-api`
3. Install dependencies: `mvn clean install`
4. Make sure you have installed MySQL Workbench
5. Set the application.properties file according to your MySQL Workbench username and password.Example of my setup:

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


## Backend Documentation:


<h3>This API is built using Spring Boot,Spring Security,MySQL</h3>


## Requirements:
- Spring Boot
- spring-boot-starter-web
- spring-boot-starter-data-jpa
- mysql-connector-j
- jjwt
- spring-boot-starter-security
- jaxb-api


## Folder Structure:
<div align="center">
        <h3>The project adheres to the Repository Pattern</h3>
        <h6>models: <span>Contains the database models</span></h6>
        <h6>services: <span>Handle database model operations</span></h6>
        <h6>controllers: <span>Used for creating the endpoints,handle requests and responses</span></h6>
        <h6>dto: <span>Data Transfer Object is a design pattern that allows encapsulation of data transferred between the controller and service layers.It adds separation of concerns.</span></h6>
</div>
