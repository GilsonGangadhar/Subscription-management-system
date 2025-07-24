# Subscription-management-system
A backend application built with Node.js, Express.js, and MongoDB to manage user accounts and subscriptions, with automated email reminders for subscription renewals.

## 📖 Overview
The Subscription Management System is a RESTful API designed to handle user authentication, subscription management, and periodic email reminders for subscription renewals. Users can sign up, log in, manage their subscriptions, and receive automated email notifications for upcoming renewals. 

The project is built for scalability and security, using JWT for authentication and MongoDB for data persistence.

## ✨ Features
1. **User Authentication**
     - Sign up with name, email, and password (passwords hashed with bcrypt).
     - Log in to receive a JWT for secure access.
     - Log out to invalidate session.
       
2. **User Management**
     - Create single or multiple users.
     - Store user data securely in MongoDB.
       
3. **Subscription Management**
     - Add, view, update, or delete subscriptions for each user.
     - Subscription details include name, amount, date, and renewal period (e.g., daily, weekly, monthly).
       
4. **Email Reminders**
     - Automated email notifications for upcoming subscription renewals.
     - Powered by Nodemailer with configurable SMTP settings.

5. **Security**
     - Used Arcjet to prevent from bot attacks & repeated backend calls
     - JWT-based authentication for protected routes.
  
## 📋Technologies
  - Node.js: JavaScript runtime for the backend.
  - Express.js: Web framework for building the RESTful API.
  - MongoDB: NoSQL database for storing user and subscription data.
  - Mongoose: ODM for MongoDB data modeling.
  - JWT: JSON Web Tokens for secure authentication.
  - Bcrypt: Password hashing for security.
  - Nodemailer: Email sending for subscription reminders.
  - arckjet: prevents bot attacks and spam calls

## 🚀 Installation
1. **Clone the Repository**
```bash
   git clone https://github.com/yourusername/website-highlight-saver.git
   cd website-highlight-saver
   ```
2. **Install Dependencies**
```bash
   npm install
   ```
3. **Set Up MongoDB**
  - Ensure MongoDB is installed and running locally, or use a cloud provider like MongoDB Atlas.
  - Update the MongoDB connection string in the .env file (see Configuration)
    
4. **Run the Application**
```bash
  npm start
   ```
