# Todo Web App Backend

This is the backend for a React webapp for a user to manage a todo list.
It is a simple REST API written in JavaScript using the Express framework.
It has user management/control and todo list management/control.
It is a part of a larger project that includes a frontend written in TypeScript.
When ran it uses the build version of the frontend.

## Installation

To install and run the project, you should have [Node.js](https://nodejs.org/) installed on your machine.

1. Clone the repository:

```bash
git clone https://github.com/DanielGRasmussen/todo-fullstack
```

2. Install dependencies and build frontend:

```bash
cd todo-fullstack/backend
npm run prebuild
```

3. Start the server:

```bash
npm run start
```

4. Open [http://localhost:3000](http://localhost:3000) to view the app in the browser.

## Configuration
The .env file contains the following environment variables:

- MONGODB_URI: The MongoDB connection URI.
- SESSION_SECRET: A secret key for session management.
- CLIENT_ID: The Google OAuth client ID.
- CLIENT_SECRET: The Google OAuth client secret.
- PORT: The optional port number for the server to listen on, by default it uses 3000.

## API Documentation
The API documentation is generated using Swagger and can be accessed at [http://localhost:3000/api-docs](http://localhost:3000/api-docs). This documentation provides a detailed description of each API endpoint, along with the expected input and output formats.

## Routes
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