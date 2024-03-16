# educaiCRM Web Application

Early Development for educAI CRM

# Node version

This project was developed using Node.js v20.10.0. It is recommended to use the same version to avoid any compatibility issues.

# Environment file

Create a `.env` file in the root of the project with the following content:
PORT=5050

# Easy start guide

1. Clone the repository.
2. Optional: Install global dependencies: `npm install -g nodemon`. Must run from a admin terminal.
3. Cd into the `frontend` folder and run `npm install` to install all the frontend dependencies.
4. Optional: Run `npm start` to start the frontend through the development server only and ignore the rest of the steps.
5. Run `npm run build` to build the frontend, from the same folder.
6. Cd back to the root of the project and cd into the `backend` folder.
7. Run `npm install` to install all the backend dependencies.
8. Create a `.env` file in the root of the project with the following content:
   PORT=5050
9. Run `node src/app.js` to start the server.
