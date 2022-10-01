# MERN Student App

## What is MERN stack?

MERN Stack stands for MongoDB, Express, React, Node.js and this combined stack is known as MERN stack.
* [MongoDB](https://www.mongodb.com/): A document-oriented database programme based on NoSQL.
* [Express](https://expressjs.com/): It’s a robust Node.js web application framework that helps in creating powerful REST APIs.
* [React](https://reactjs.org/): A JavaScript library used to create beautiful and interactive user interfaces developed by Facebook and the community of individual developers.
* [Node](https://nodejs.org/en/): It’s a JavaScript runtime environment built on Google Chrome’s V8 engine, and it compiles js at the runtime.


# MERN stack Architecture
Our React.js + Node.js + Express + MongoDB application will follow this architecture:
![MERN stack Architecture](react-node-express-mongodb-mern-stack-example-architecture.png)

– Node.js Express exports REST APIs & interacts with MongoDB Database using Mongoose ODM.
– React Client sends HTTP Requests and retrieves HTTP Responses using Axios, consumes data on the components. React Router is used for navigating to pages.

# REST API
> Following will be your APIs routes created with Express.js, MongoDB and Node.js.

| REST API | URL                            | details                   |
|----------|--------------------------------|---------------------------|
| [x] GET      | /students                      | List all student details  |
| [x] POST     | /students/create-student       | Create student details    |
| [x] GET      | /students/edit-student/id      | Get student details by id |
| [x] PUT      | /students/update-student/id    | Update student details    |
| [x] DELETE   | /students/delete-student/id    | Delete student details    |
| [ ] DELETE   | /students/delete-student/      | Delete all student details|
| [] GET       | /students?params               | Search student details    |   


# Useful resources:
* https://www.positronx.io/react-mern-stack-crud-app-tutorial/
* https://www.digitalocean.com/community/tutorials/getting-started-with-the-mern-stack
* https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669
* https://medium.com/codingthesmartway-com-blog/the-mern-stack-tutorial-building-a-react-crud-application-from-start-to-finish-part-1-d8d701c2995
* https://bezkoder.com/node-express-mongodb-crud-rest-api/
* https://www.upgrad.com/blog/crud-operations-in-mongodb-tutorial/


# Run this project

### For frontend (reactjs) app 

```
cd src
``` 

and then 

```
npm run start
```

### For backend app

```
cd backend
``` 

and then 

```
npm start
```