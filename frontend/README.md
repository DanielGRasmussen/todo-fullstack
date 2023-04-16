# Todo Web App Frontend

This is the frontend for a React webapp for a user to manage a todo list. 
It is a single page application that uses React and Typescript. 
It is a part of a larger project that includes a backend written in JavaScript.
While this does have some tests most of them are outdated.

## Installation

To install and run the project, you should have [Node.js](https://nodejs.org/) installed on your machine.

1. Clone the repository:

```bash
git clone https://github.com/DanielGRasmussen/todo-fullstack
```

2. Install dependencies:

```bash
cd todo-fullstack/frontend
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

Note: These do not work if only this is running. It is mostly for developmental purposes to improve the UI.

## Architecture

This web application follows a component-based architecture style, where the UI is broken down into reusable components
with specific responsibilities. The main application is divided into three main components - Header, Main, and Modal. 
The Header component contains the application header and navigation menu, while the Main component contains the main 
content of the application. The user can manage the todo list items in the Modal.

```
src/
├── header/
│   ├── header.tsx
│   ├── css/
│   │   └── header.css
│   └── __tests__/
│       └── header.test.tsx
├── main/
│   ├── Confirmation.tsx
│   ├── Main.tsx
│   ├── Notice.tsx
│   ├── SearchMenu.tsx
│   ├── SortButton.tsx
│   ├── TodoElement.tsx
│   ├── TodoList.tsx
│   ├── css/
│   │   ├── Confirmation.css
│   │   ├── Main.css
│   │   ├── Notice.css
│   │   ├── SearchMenu.css
│   │   ├── SortButton.css
│   │   ├── TodoElement.css
│   │   └── TodoList.css
│   └── __tests__/
│       ├── main.test.tsx
│       ├── elements.test.tsx
│       ├── todolist.test.tsx
│       └── searchMenu.test.tsx
└── modal/
    ├── Dates.tsx
    ├── Modal.tsx
    ├── Recurring.tsx
    ├── SubTask.tsx
    ├── css/
    │   ├── Dates.css
    │   ├── Modal.css
    │   ├── Recurring.css
    │   └── SubTask.css
    └── __tests__/
        └── SubTask.test.tsx
```

## Dependencies

This project uses the following dependencies:

- [axios](https://www.npmjs.com/package/axios) - A promise-based HTTP client for the browser and Node.js
- [normalize.css](https://github.com/necolas/normalize.css) - A modern alternative to CSS resets
- [react](https://reactjs.org/) - A JavaScript library for building user interfaces
- [react-date-picker](https://www.npmjs.com/package/react-date-picker) - A date picker for React
- [react-datetime-picker](https://www.npmjs.com/package/react-datetime-picker) - A datetime picker for React
- [react-time-picker](https://www.npmjs.com/package/react-time-picker) - A time picker for React
- [react-dom](https://reactjs.org/docs/react-dom.html) - Provides DOM-specific methods for React
- [react-select](https://react-select.com/home) - A flexible and Select Input control for ReactJS with multiselect and autocomplete.
- [typescript](https://www.typescriptlang.org/) - A typed superset of JavaScript that compiles to plain JavaScript
- [web-vitals](https://github.com/GoogleChrome/web-vitals) - A small library for measuring performance metrics like first input delay and largest contentful paint.
