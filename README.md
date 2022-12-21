# Vivid-theory-challenge
### Techology Stack
- Backend server created using Node.js and Express
- Frontend created using React and the MUI UI library
- Sequelize used as ORM to access postresql database

### Code structure
- src/ includes all of the Node.js server code with database connection placed in the /database folder
- frontend/src includes the React code, index.tsx is the starting point, then the pages are saved in the /pages folder, all API queries are saved in the /APIQueries folder

### Steps to run project
1. Add the required .env file to the root folder, will be sent via email if requested
2. Run the following commands in the root folder to install all dependencies "npm install" and "npm run install-frontend"
3. Build the frontend application using the command "npm run build" in the root folder
4. Start the server using the command "npm start" in the root folder, this starts the Node.js server which hosts the frontend
5. Access the application at http://localhost:3000
