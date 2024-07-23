const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const Subprofile = require('../models/Subprofile');
const auth = require('../middleware/auth');

// Create new event
router.post('/events', auth, async (req, res) => {
  const { name, description, location, date } = req.body;
  const hirer = req.user.userId; // Correctly access the userId from req.user

  try {
    const newEvent = new Event({ name, description, location, date, hirer });
    await newEvent.save();

    console.log('Event created successfully: ', newEvent._id);
    res.status(201).json({ event: { name: newEvent.name, eventId: newEvent._id, date: newEvent.date, location: newEvent.location } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating event', error });
  }
});

// Search for musicians based on event location and required instruments
router.post('/events/search', auth, async (req, res) => {
  const { eventId, location, instruments } = req.body;

  if (!eventId) { // (!location || !instruments)
    return res.status(400).json({ message: 'Event ID required for searching.' });
  }

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found.' });
    }

    // Find subprofiles matching the location and instruments
    const subprofiles = await Subprofile.find({
      location: location,
      name: { $in: instruments.split(',') },
      isActive: true,
    }).populate('user', 'username phone bio');

    console.log('successfully searched');
    res.json(subprofiles);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'An error occurred while searching for musicians.', error });
  }
});

module.exports = router;

