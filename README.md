# Edunova Assessment API
This API provides endpoints for managing Users, Books, and Transactions. The application is designed to help with book rentals by handling operations such as creating users, listing available books, issuing and returning books, and tracking rental history.

## Base URL
The base URL for all API requests is:
#### https://edunova-assessment.onrender.com/
#### API Endpoints
#### 1. Users
##### - Get All Users
GET /api/users
- Get a User by ID
GET /api/users/:id

##### - Create a New User
POST /api/users

Create a new user by providing a name, email, and password.

Example Request:
##### POST https://edunova-assessment.onrender.com/api/users
Content-Type: application/json

{
  "name": "Edunova",
  "email": "Edunova@example.com",

}

##### - Update a User by ID
PUT /api/users/:id
- Delete a User by ID
##### DELETE /api/users/:id

## 2. Books
##### - Get All Books
GET /api/books

##### - Get a Book by ID
GET /api/books/:id
##### - Create a New Book
POST /api/books

Create a new book entry by providing its name, category, and rent per day.
Example Request:
##### POST https://edunova-assessment.onrender.com/api/books
Content-Type: application/json

{
  "name": "Amazon Placemnt",
  "category": "job",
  "rentPerDay": 6
}
##### - Delete a Book by ID
DELETE /api/books/:id

3. Transactions
##### - Issue a Book
POST /api/transactions/issue

Issue a book to a user by providing the book's ID, the user's ID, and the issue date.
POST https://edunova-assessment.onrender.com/api/transactions/issue
Content-Type: application/json
Example:
{
  "bookname": "Anuj",
  "userId": "60d21b4667d0d8992e610c85",
  "issueDate": "2023-09-08"
}
##### - Return a Book
POST /api/transactions/return
##### - Get All Users Who Issued a Specific Book
GET /api/transactions/issuers/:bookName

##### - Get Total Rent for a Specific Book
GET /api/transactions/total-rent/:bookName

##### - Get Total Rent for a Specific Book
GET /api/transactions/total-rent/:bookName

##### - Get All Books Issued Within a Date Range
GET /api/transactions/date-range?start=YYYY-MM-DD&end=YYYY-MM-DD

