# Task Management Application - Backend

## Description
This is the backend for the Task Management Application, built using Node.js, Express, and MongoDB. It handles the server-side logic, including API endpoints for managing tasks and user authentication.

## Technologies Used
- **Node.js**: JavaScript runtime for building server-side applications.
- **Express**: Web application framework for Node.js.
- **MongoDB**: NoSQL database for storing task and user data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.

## Prerequisites
- **Node.js**: Ensure you have Node.js installed. [Download and install Node.js](https://nodejs.org/).
- **npm**: Node package manager, which comes with Node.js.
- **MongoDB Atlas**: Ensure you have a MongoDB Atlas account and a cluster set up. [Create a MongoDB Atlas account](https://www.mongodb.com/cloud/atlas).

## Setup and Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/backend-repo.git
   cd backend-repo

2. Install Dependencies:
    npm install

3. Setup Environment Variables:
   (a) Create a .env file in the root directory of the project.
   (b) Add the following environment variables to the .env file
      MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority

      PORT=4001
      JWT_SECRET=<your-jwt-secret>

      Note: Replace <username>, <password>, <cluster-url>, <database-name>, and <your-jwt-secret> with your actual MongoDB Atlas credentials and a secure JWT secret.

 4. Run the Application:
     nodemon server.js file 

     Note: This command will start the server and make the API available at http://localhost:4001.
  
5. Usage
   (a) Run the Application: Use npm start to start the server and access the API.
   (b) Testing: You can use tools like Postman to test the API endpoints

6. Additional Information
   Database: Ensure MongoDB Atlas is configured correctly and the connection string in the .env file is accurate.

   Styling: No frontend styling is included in this backend.


     
   