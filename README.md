# Todo Web App

This is a web app developed using React for managing a todo list.

## Installation

To install and run the project, you should have [Node.js](https://nodejs.org/) installed on your machine.

1. Clone the repository:

```bash
git clone https://github.com/DanielGRasmussen/todo-webapp
```

2. Install dependencies:

```bash
cd todo-webapp
npm install
```

3. Start the development server:

```bash
npm run start
```

4. Open [http://localhost:3000](http://localhost:3000) to view the app in the browser.

## Features

- Add and remove tasks
- Filter tasks by status (completed, active, all)
- Edit task description
- Mark task as completed

## Architecture

This web application follows a component-based architecture style, where the UI is broken down into reusable components
with specific responsibilities. The main application is divided into two main components - Header and Main. The Header
component contains the application header and navigation menu, while the Main component contains the main content of the
application.

```
src/
├── header/
│   ├── header.tsx
│   ├── css/
│   │   └── header.css
│   └── __tests__/
│       └── header.test.tsx
└── main/
    ├── main.tsx
    ├── elements.tsx
    ├── todolist.tsx
    ├── searchMenu.tsx
    ├── css/
    │   ├── main.css
    │   ├── elements.css
    │   └── todolist.css
    └── __tests__/
        ├── main.test.tsx
        ├── elements.test.tsx
        ├── todolist.test.tsx
        └── searchMenu.test.tsx

```

## Dependencies

This project uses the following dependencies:

- [react](https://reactjs.org/) - A JavaScript library for building user interfaces
- [react-dom](https://reactjs.org/docs/react-dom.html) - Provides DOM-specific methods for React
- [react-select](https://react-select.com/home) - A flexible and beautiful Select Input control for ReactJS with
  multiselect, autocomplete, async and creatable support.
- [normalize.css](https://necolas.github.io/normalize.css/) - A modern alternative to CSS resets
- [web-vitals](https://github.com/GoogleChrome/web-vitals) - A small library for measuring performance metrics like
  first input delay and largest contentful paint.
- [jest](https://jestjs.io/) - A JavaScript testing framework
- [eslint](https://eslint.org/) - A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code
- [prettier](https://prettier.io/) - A code formatter that enforces a consistent style
