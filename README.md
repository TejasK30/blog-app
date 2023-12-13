# Blog App Project

Welcome to the Blog App project! This full-stack web application is built using the MERN (MongoDB, Express.js, React, Node.js) stack. The project includes various features for managing user accounts and creating, updating, and deleting blog posts.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)

## Introduction

This project is designed to provide a simple and intuitive platform for users to manage their blog posts. It includes user authentication, allowing users to register, log in, update their account details, and delete their accounts. Additionally, users can create, update, and delete blog posts.

## Features

1. **User Registration:** New users can register by providing a unique username and email.

2. **User Login:** Registered users can log in securely to access their account and create blog posts.

3. **Update User Account:** Users can update their account details, including their username and email.

4. **Delete User Account:** Users have the option to delete their accounts if needed.

5. **Create Blog Post:** Authenticated users can create new blog posts with a title, content, and other relevant details.

6. **Update Blog Post:** Users can edit the content of their existing blog posts.

7. **Delete Blog Post:** Users can delete their blog posts if they no longer wish to keep them.

## Technologies

### Frontend
- React.js
- react-router-dom
- react-icons
- axios

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose)
- Multer (for handling file uploads)
- Path (for working with file and directory paths)
- Bcrypt (for password hashing)
- Cookie-parser (for parsing cookies)
- Cors (Cross-Origin Resource Sharing)
- Dotenv (for managing environment variables)
- Jsonwebtoken (for user authentication)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/TejasK30/blog-app.git
   cd blog-app
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Set up your environment variables:
   - Create a `.env` file in the `backend` directory and configure your MongoDB connection string, JWT secret, etc.

4. Start the application:
   ```bash
   # Start the backend server (from the backend directory)
   node index.js

   # Start the frontend development server (from the frontend directory)
   npm run dev
   ```

## Usage

Visit `http://localhost:5173` in your web browser to access the Blog App. Register or log in to start creating and managing your blog posts.
