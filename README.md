# Online Learning System using MERN stack

# Outline

- [Description](#description)
- [Motivation](#motivation)
- [Build Status](#build-status)
- [Code Style](#code-style)
- [Technologies](#technologies)
- [Architecture](#architecture)
- [API reference](#api-reference)
- [Tests](#tests)
- [Installation](#installation)
- [How to Use?](#how-to-use)
- [Contribute](#contribute)
- [Credits](#credits)

## Description

This is a university project that we worked on during the semester to train on coding a website from scratch (backend and frontend).
The premise of the project is to make a web app that serves as an Online educational platfrom much like other platforms (ex. Udemy, Coursera, etc...).
We were required to use MERN (MongoDB , Express , React , Node) in addition to any other technology that we deemed need and we were provided with a set of requirements that needs to be met.

## Motivation

The motivation of the website is to train on writing a real website from start to end given a set of requirements to mimick real life engineering

## Build Status

the project is a work on progress but mostly finished.

## Code Style

we followed these [conventions](https://google.github.io/styleguide/jsguide.html) when writing out code

## Technologies

### Client Side:

- [React](https://reactjs.org/) : A JavaScript library for building user interfaces which we used primarliy to create our frontend
- [React Router v6](https://reactrouter.com/en/main) : We used this to to manage routing from one url to the other in the frontend
- [React Bootstrap](https://react-bootstrap.github.io/) : pre-made components that integrates bootstrap and react

### Server Side:

- [MongoDB](https://www.mongodb.com/) : a NoSql database
- [Mongoose](https://mongoosejs.com/) : Mongodb object modeling for node.js
- [Node.js](https://nodejs.org/en/) : server enviroment that allows us to run Javascript Code server side
- [Express.js](https://expressjs.com/) : Fast, unopinionated, minimalist web framework for Node.js which helped us
- [dotenv](https://www.npmjs.com/package/dotenv) : Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env
- [JSON web token](https://jwt.io/) : tokens used for authorization and authentication
- [Stripe](https://stripe.com/) : allows us to simulate an online payment system

## Architecture

├───backend
│ ├
│ ├
│ └───src
│ ├───controllers
│ │ ├───admin
│ │ ├───auth
│ │ ├───course
│ │ │  
│ │ ├───trainee
│ │ ├───instructor
│ │ │ └───createCourse
│ │ ├───user
│ │  
│ │  
│ ├───models
│ │ ├───CourseRequest
│ │ ├───Report
│ │ ├───admin
│ │ ├───course
│ │ ├───instructor
│ │ └───trainee
│ │ └───refundRequest
│ │
│ │
│ │───Routes
│ │ ├───admin
│ │ ├───auth
│ │ ├───course
│ │ │  
│ │ ├───trainee
│ │ ├───instructor
│ │ │  
│ │ ├───user
├───frontend
└───src
│ ├───components
│ │ ├───Admin
│ │ ├───Courses
│ │ ├───Home
│ │ ├───Instructor
│ │ ├───Trainee
│ │ ├───User
│ │───App.css
│ │───App.js
│ │───index.js  
│ │  
│ ├───public
│ │ ├───Certificates
│ │ ├───Course photos
│ │ ├───assets
│ │ ├───index.html
│ │ ├───logo.png
│ │ ├───logob.png
│ │ ├───placeholder.png
│ │ ├───star.png
│ │ └───tkhicon.png
│ │  
│ └───package-lock.json
│ │
│ └───package.json
│  
│
│
└───.gitignore

we tried to keep react components and pages that are similar in the same folder for ease of search and organization

### Server Code in-depth dive

the server is built as a [RESTful API](https://restfulapi.net/) that recieves HTTP requests from the frontend then processes that request using various middleware and logic then sends the appropriate actions to the database to reflect the user actions. this API was built with the intent to abstract as much of the logic as possible away from the frontend while also providing a manageable amount of endpoints without overwhelming the frontend with a huge number of choices. let me go into further detail a bit more on each process of the pipeline.

when the server starts it establishes a connection with the mongoDB server and runs on the localhost on port 4000.
https://github.com/dmeleka/ACL-main/blob/main/backend/server.js

this function then reads the information sent in the request (headers or body) and forwards it to mongoose to perform one of the CRUD operations. Mongoose is used because it is an ODM that applies automatic validations and facilitates the interaction between the server. the response is then returned to the user depending on the result of the operation on the database side and it abides by the HTTP status codes.--

Mongoose uses the models we had defined to decide if the data is proper or not and also it automatically calculates some attributes like ratings for example
https://github.com/Advanced-Computer-Lab-2022/Newcomers/blob/1263ce18dd0621232f8c7631e687c2cd51bdd810/server/models/instructorModel.js#L15-L52

### Client Code in-depth dive

the client side code is built primarily using react which gets its data from the backend.

The main technology we used next to react was React Router. React was designed to be an SPA (Single Page Application) framework which proves difficult to use when having a complex site with multiple users, moving parts and requirements so react router introduces the ability to select which pages to load depend on the current url of the browser which facilitates building the appliciation.

the main router that resides in App.js:
https://github.com/dmeleka/ACL-main/blob/main/frontend/src/App.js

Now we move onto React. React simply encapsulates pieces of the page into their own components and these components can include other components as their children. Since we have these types of users (User, Trainee, Admin and Instructor) we used react router to group different groups of routes that correspond to each user and then decides what page to render.

Course page for example:
https://github.com/dmeleka/ACL-main/tree/main/frontend/src/components/Courses

## API reference

the backend API is built on rest principals so most of the endpoints act in a very predictable manner. Most of the endpoints were published using Postman

## Tests

We using manual Testing , In First and Second sprint we used Postman and then after adding Front End we were able to test the Requirements and develop the UI & UX

## Installation

1. download repo
2. npm install in client and server
3. npm start both
4. head to localhost:3000

## How to Use?

you can install it from GITHUB "https://github.com/dmeleka/ACL-main" and test it

## Credits

1. [Daniel Meleka]
2. [Samuel Taher]
3. [Yomna Ihab]
4. [Mohamed Ghoniem]
5. [Seif ELabd]
