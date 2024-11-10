---

# Bookshelf API

Bookshelf API is a simple backend application that allows users to manage book data, including adding, retrieving, updating, and deleting books. This project was created as part of a submission for Dicoding to practice building RESTful APIs using Node.js and Hapi.js.

## Table of Contents
- [Requirements](#requirements)
- [Installation](#installation)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [License](#license)

## Requirements
- Node.js version 14 or later
- Required packages are listed in `package.json`.

## Installation
1. Clone this repository to your computer:
   ```bash
   git clone https://github.com/Arf-7447/bookshelf-api-dicoding-submission.git
   ```
2. Navigate to the project directory:
   ```bash
   cd bookshelf-api-dicoding-submission
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Server
To run the server, you have two options:

- **Development** (with hot-reloading):
  ```bash
  npm run start-dev
  ```
  
- **Production**:
  ```bash
  npm start
  ```

The server will run on `http://localhost:9000` by default.

## API Endpoints
Here is a list of available endpoints in the Bookshelf API:

### 1. Add a Book
- **URL**: `/books`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "name": "Book Name",
    "year": 2023,
    "author": "Author",
    "summary": "Book summary",
    "publisher": "Publisher",
    "pageCount": 350,
    "readPage": 100,
    "reading": true
  }
  ```
- **Response**: Returns the ID of the successfully added book.

### 2. Retrieve Book List
- **URL**: `/books`
- **Method**: `GET`
- **Response**: Returns a list of books in an array format.

### 3. Retrieve Book Details by ID
- **URL**: `/books/{bookId}`
- **Method**: `GET`
- **Response**: Returns the details of the book with the specified `bookId`.

### 4. Update a Book by ID
- **URL**: `/books/{bookId}`
- **Method**: `PUT`
- **Request Body**:
  ```json
  {
    "name": "Book Name",
    "year": 2023,
    "author": "Author",
    "summary": "Book summary",
    "publisher": "Publisher",
    "pageCount": 350,
    "readPage": 150,
    "reading": true
  }
  ```
- **Response**: Confirms whether the update was successful or failed.

### 5. Delete a Book by ID
- **URL**: `/books/{bookId}`
- **Method**: `DELETE`
- **Response**: Confirms whether the book was successfully deleted or not.

## Project Structure
```
bookshelf-api
├── src
│   ├── handler.js           # Contains functions to handle each request
│   ├── routes.js            # Contains available route definitions
│   ├── server.js            # Entry point to run the server
│   └── books.js             # Contains the data structure for storing books (e.g., an array of book objects)
├── eslint.config.mjs        # ESLint configuration file for linting rules
├── node_modules/            # Directory for installed project dependencies
├── package.json             # Project configuration and dependencies
├── package-lock.json        # Automatically generated file for locking dependencies
└── README.md                # Project documentation


```

## License
This project is licensed under the ISC license.

---
