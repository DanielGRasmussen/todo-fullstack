# Fullstack Todo Web App
This is a fullstack web application for a user to manage a todo list. The project includes a backend written in 
JavaScript using the Express framework, and a frontend written in TypeScript using React.

It is currently hosted [here](https://todo-fullstack-jppd.onrender.com/). Note: Load times are long because the hosting site (render) slows down on inactivity (should be ~30 seconds for every request.)

## Installation

To install and run the project, you should have [Node.js](https://nodejs.org/) installed on your machine.

1. Clone the repository:

```bash
git clone https://github.com/DanielGRasmussen/todo-fullstack
```

2. Install backend dependencies and build frontend:

```bash
cd todo-fullstack/backend
npm run server
```

3. Open [http://localhost:3000](http://localhost:3000) to view the app in the browser.

## Features
- User authentication with Google OAuth.
- Add, remove, and edit tasks.
- Filter tasks various methods.
- API documentation with Swagger
- Not great encryption in the storage, this was made before I had a good idea on how to do this.

## Architecture
This fullstack application is divided into two main parts - the frontend and the backend. You can find more details
regarding this in the README files for each part.

## API Routes
The backend provides the following routes:

- /auth: Authentication routes.
    - GET /auth: Uses Google OAuth to authenticate a user. When does it redirects to /auth/callback.
    - GET /auth/callback: The callback route for Google OAuth. When done it redirects to /.
    - GET /auth/logout: Logs out the current user. When done it redirects to /.
- /api/user: Routes for managing user data.
    - GET /api/user: Gets the current user.
- /api/todos: Routes for managing todo lists.
    - GET /api/todos: Gets all todo lists for the current user.
    - POST /api/todos: Creates a new todo item for the current user.
    - PUT /api/todos/:id: Updates a specific todo item for the current user.
    - DELETE /api/todos/:id: Deletes a specific todo item for the current user.

If a user is not authenticated for any routes under /api, the backend will route you to the /auth route.

### Configuration
The .env file contains the following environment variables:

- MONGODB_URI: The MongoDB connection URI.
- SESSION_SECRET: A secret key for session management.
- CLIENT_ID: The Google OAuth client ID.
- CLIENT_SECRET: The Google OAuth client secret.
- PORT: The optional port number for the server to listen on, by default it uses 3000.

## Testing
The frontend includes some tests, located in the src/__tests__ directory. These tests were written using the Jest 
framework and can be run using the following command:

```bash
cd frontend
npm run test
```

Note: These tests currently are outdated.

## Contributors
Daniel G. Rasmussen (@DanielGRasmussen)
