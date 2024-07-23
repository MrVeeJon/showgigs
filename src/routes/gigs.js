const express = require('express');
const router = express.Router();
const Gig = require('../models/Gig');
const User = require('../models/User');

// Create a new gig
router.post('/', async (req, res) => {
  try {
    const { title, description, location, date, userId } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const gig = new Gig({ title, description, location, date, user: user._id });
    await gig.save();

    user.gigs.push(gig._id);
    await user.save();

    res.status(201).json(gig);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all gigs
router.get('/', async (req, res) => {
  try {
    const gigs = await Gig.find().populate('user', 'username');
    res.json(gigs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single gig by ID
router.get('/:id', async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id).populate('user', 'username');
    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }
    res.json(gig);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a gig
router.put('/:id', async (req, res) => {
  try {
    const { title, description, location, date } = req.body;
    const gig = await Gig.findByIdAndUpdate(req.params.id, { title, description, location, date }, { new: true });
    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }
    res.json(gig);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a gig
router.delete('/:id', async (req, res) => {
  try {
    const gig = await Gig.findByIdAndDelete(req.params.id);
    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }
    await User.updateOne({ _id: gig.user }, { $pull: { gigs: gig._id } });
    res.json({ message: 'Gig deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

