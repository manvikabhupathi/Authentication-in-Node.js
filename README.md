# Authentication-in-Node.js
Node.js Express authentication project implementing secure user registration and login with password hashing (bcryptjs) and JWT-based authorization. Features RESTful APIs for register, login, JWT login, and a protected route. User data stored in-memory for learning purposes.
# Node.js Authentication Assignment

This project implements user authentication in Node.js using Express, with both password hashing and JWT authentication according to assignment requirements.

## Features

- User registration with secure password hashing (`bcryptjs`)
- User login with password verification
- JWT-based login endpoint
- Protected API route accessible only with a valid JWT

## Endpoints

- `POST /register` — Register a new user
  - Body: `{ "username": "example", "password": "yourpassword" }`
- `POST /login` — Login with username and password
  - Body: `{ "username": "example", "password": "yourpassword" }`
- `POST /jwt-login` — Login and receive a JWT
  - Body: `{ "username": "example", "password": "yourpassword" }`
  - Response: `{ "token": "<JWT_TOKEN>" }`
- `GET /protected` — Access protected route
  - Requires: `Authorization: Bearer <JWT_TOKEN>` header

## How to run

1. Clone the repository:
    ```
    git clone <your-repo-url>
    cd <repo-folder>
    ```
2. Install dependencies:
    ```
    npm install
    ```
3. Start the server:
    ```
    node app.js
    ```
4. Use a tool like Postman or cURL to test the endpoints.

## Files

- `app.js`: Main application code
- `package.json`: Project metadata and dependencies

## Notes

- User data is stored in-memory for demonstration purposes.
- For production, use environment variables for the JWT secret and connect to a real database.

---

