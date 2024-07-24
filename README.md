# ShowGigs

ShowGigs is a web application designed to connect musicians with potential gigs. Instrumentalists can find gigs available from their current location, and users can create profiles, sub-profiles for different instruments, and set prices. The project includes features like notifications, messaging, and calendar scheduling. This project is in fulfillment of the requirements to graduate from my one year training in ALX Software Engineering program.

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Description

ShowGigs aims to simplify the process of finding and hiring musicians for events. Users can create events specifying the required instruments and search for musicians based on location and availability. Musicians can create sub-profiles for their instruments, set their prices, and be discovered by event organizers.

## Features

- User authentication and authorization with JWT
- Profile creation and management
- Sub-profile creation for different instruments
- Event creation and management
- Search functionality for musicians based on location and instrument
- Notification system
- Messaging between users
- Calendar scheduling for events

## Technologies

- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Frontend**: HTML, CSS, JavaScript
- **Authentication**: JWT (JSON Web Tokens)
- **Testing**: Jest, Supertest

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/MrVeeJon/showgigs.git
   cd showgigs

2. Install dependencies  
    npm install  

3. Create a .env file in the root directory with the following variables:  
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret  

4. Start the server  
    npm start

  
Usage  
1. Register a new user or log in with existing credentials.  
2. Create a sub-profile for the instruments you play.  
3. Create an event and specify the instruments needed.  
4. Search for musicians based on location and instrument.  
5. Use the messaging system to communicate with musicians and finalize details.   

API Endpoints  

  Authentication  
POST /api/users/register - Register a new user  
POST /api/users/login - Login a user  

  Users  
GET /api/users/:id - Get user profile  
PUT /api/users/:id - Update user profile  

  Subprofiles
POST /api/subprofiles/create - Create a sub-profile  
GET /api/subprofiles/:id - Get a sub-profile  
  
  Events  
POST /api/events/create - Create a new event  
GET /api/events/:id - Get event details  
POST /api/events/:id/search - Search for musicians  

  Messaging  
POST /api/messages/send - Send a message  
GET /api/messages/:conversationId - Get messages in a conversation  

  Notifications  
GET /api/notifications - Get user notifications  


  Testing  
Run the tests using the following command:  
npm test


Folder Structure:  

showgigs/  
├── models/  
│   ├── Event.js  
│   ├── Subprofile.js  
│   ├── User.js  
│   └── Group.js  
├── routes/  
│   ├── events.js  
│   ├── subprofiles.js  
│   ├── users.js  
│   └── homepage.js  
├── public/  
│   ├── css/  
│   │   └── style.css  
│   ├── js/  
│   │   ├── createsubprofile.js  
│   │   ├── homepage.js  
│   │   └── utils.js  
│   └── index.html  
├── .gitignore  
├── server.js  
└── package.json  
  

In your .gitignore file, you should include entries like: 

# Dependency directories
node_modules/

# Environment variables
.env

# Logs
logs
*.log
npm-debug.log*

# Miscellaneous
.DS_Store
.vscode/



  Contributing  
Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.  

1. Fork the repository  
2. Create a new branch (git checkout -b feature-branch)  
3. Commit your changes (git commit -m 'Add some feature')  
4. Push to the branch (git push origin feature-branch)  
5. Open a pull request  


