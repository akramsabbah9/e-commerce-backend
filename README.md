# E-Commerce Backend

## Description

This is a back-end API example for an e-commerce website. It can add Products, as well as any associated Tags and Categories, to a MySQL database. The server implements the GET, POST, PUT and DELETE RESTful API routes — to access, edit, add and remove rows from all tables in the database.

This project uses the Express.js and Sequelize packages.


## Installation

This application requires Node.js and MySQL installed on your machine in order to run.

1. Clone this repository to the desired machine.
2. Navigate to the root directory of this project in terminal.
3. Use ``` npm install ``` to install the dependencies of this project.
4. Create the ecommerce_db database:
    - Start a MySQL shell by using ``` mysql -u root -p ``` and entering your MySQL password.
    - Use ``` source db/schema.sql ``` to create the database.
5. Create a file called ``` .env ``` and add your MySQL credentials to it.

For example:
```
    DB_NAME="ecommerce_db"
    DB_USER="root"
    DB_PW="YourPassword"
```


## Usage

1. Navigate to the root directory of this project in your console.
2. Use npm start to begin running the application.
3. Once the app begins listening for connections, you can proceed to query the API using the browser or API client of your choice.


## Walkthrough

A tutorial for this application can be found here:
https://drive.google.com/file/d/1lsPZyZeNP9KwRIY7IErX_auZifW6M-I_/view
