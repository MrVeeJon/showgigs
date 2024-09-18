const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Subprofile = require('../models/Subprofile');
const Event = require('../models/Event');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth')

// To register a new user
router.post('/register', async (req, res) => {
  const { username, email, password, location, bio, phone } = req.body;
  try {
    // Checking if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with same email' });
    }

    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ 
      username,
      email,
      password: hashedPassword,
      location,
      bio,
      phone
    });
    await newUser.save();

    
    console.log('User created: ', newUser._id);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Fetch additional user data
    const events = await Event.find({ hirer: user._id });
    const subprofiles = await Subprofile.find({ user: user._id });

    console.log('login succesful: ', user._id)

    res.status(200).json({
      token,
      user: {
        username: user.username,
        bio: user.bio,
        location: user.location,
        events,
        subprofiles,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Create a subprofile for a user
router.post('/subprofiles/create', auth, async (req, res) => {
  const { userId } = req.user;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Subprofile name is required.' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const location = user.location; // Use the user's location for the subprofile

    const newSubprofile = new Subprofile({
      name,
      user: userId,
      location,
      price: 0, // Default price
      negotiable: false,
      portfolio: [],
      isActive: true,
    });

    await newSubprofile.save();

    user.subprofiles.push(newSubprofile._id);
    await user.save();

    console.log('Subprofile created');
    res.status(201).json({ message: 'Subprofile created successfully.', subprofile: newSubprofile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while creating the subprofile.', error: error.message });
  }
});

// Retrieve all users
router.get('/users', async (req, res) => {
  console.log('GET /users endpoint hit');
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ message: 'An error occurred while retrieving users.', error });
  }
});

module.exports = router;

