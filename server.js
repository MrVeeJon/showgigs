const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const connectDB = require('./db');
const app = express();
const PORT = process.env.PORT || 3000;

// Load environment variables from .env file
require('dotenv').config();

// Connect to MongoDB
connectDB();

// Middlewares
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Routes
const userRoutes = require('./routes/users');
const eventRoutes = require('./routes/events');
const subprofileRoutes = require('./routes/subprofiles');
const homepageRoute = require('./routes/homepage');

app.use('/api', userRoutes);
app.use('/api', eventRoutes);
app.use('/api', subprofileRoutes);
app.use('/', homepageRoute);

// Notification routes
const notificationRoutes = require('./routes/notificationRoutes');
app.use('/api/notifications', notificationRoutes);

// Message route
const messageRoutes = require('./routes/messageRoutes');
app.use('/api/messages', messageRoutes);

// Calendar schedule route
const scheduleRoutes = require('./routes/scheduleRoutes');
app.use('/api/schedules', scheduleRoutes);

// Import models
const User = require('./models/User');
const Subprofile = require('./models/Subprofile');
const Event = require('./models/Event');
const Group = require('./models/Group');


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

