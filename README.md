# basic-auth-backend
This is a simple Node.js & Express backend for user authentication, built as a part of TechLearn's Backend Developer Task.

## Features
- Sign-up with validation
- Sign-in with hashed password authentication
- MongoDB for storage
- Password hashing using bcryptjs
- Input valdiation using express-validator
- Logging and error handling

## Tech Stack
- Node.js
- Express.js
- MongoDB (via Mongoose)
- bcrypt.js
- express-validator

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR-USERNAME/basic-auth-backend.git

   cd basic-auth-backend

2. Install dependenices:
   ```bash
   npm install

3. Create a .env file and add your MongoDB URI:
   ```bash
   MONGO_URI=your_mongodb_connection_uri

4. Start the server
   ```bash
   npm run start

5. Test the APIs using Postman or Thunder Client

## TEST USER
    You can register your own test user using the /signup route and use the same credentials to login via /signin
