const express = require('express');
const router = express.Router();
const Subprofile = require('../models/Subprofile');
const User = require('../models/User');
const auth = require('../middleware/auth');



// // Update specific fields of a subprofile
// router.put('/:subprofileId', async (req, res) => {
//   const { subprofileId } = req.params;
//   const updates = req.body; // Expecting fields like price, negotiable, portfolio, isActive

//   try {
//     const subprofile = await Subprofile.findByIdAndUpdate(subprofileId, updates, { new: true });
//     if (!subprofile) {
//       return res.status(404).json({ message: 'Subprofile not found.' });
//     }
//     res.json({ message: 'Subprofile updated successfully.', subprofile });
//   } catch (error) {
//     res.status(500).json({ message: 'An error occurred while updating the subprofile.', error });
//   }
// });


// Update isActive
router.put('/subprofiles/isActive', auth, async (req, res) => {
  const { userId } = req.user;
  const { name } = req.body;

  try {
    const subprofile = await Subprofile.findOne({ user: userId, name: name });
    if (!subprofile) {
      return res.status(404).json({ message: 'Subprofile not found' });
    }

    subprofile.isActive = !subprofile.isActive; // Toggle the boolean value
    await subprofile.save();

    console.log('Active state updated successfully');
    res.status(200).json({ message: 'Active state updated successfully', subprofile });
  } catch (error) {
    console.log('Something happened, check out', error);
    res.status(500).json({ error: error.message });
  }
});



// Update Negotiable
router.put('/subprofiles/negotiable', auth, async (req, res) => {
  const { userId } = req.user;
  const { name } = req.body;

  try {
    const subprofile = await Subprofile.findOne({ user: userId, name: name });
    if (!subprofile) {
      return res.status(404).json({ message: 'Subprofile not found' });
    }

    subprofile.negotiable = !subprofile.negotiable; // Toggle the boolean value
    await subprofile.save();

    console.log('Negotiable state updated successfully');
    res.status(200).json({ message: 'Negotiable state updated successfully', subprofile });
  } catch (error) {
    console.log('Something happened', error);
    res.status(500).json({ message: 'An error occurred', error });
  }
});

// Update price of subprofiles

router.patch('/subprofiles/updatePrice', auth, async (req, res) => {
  const { name, price } = req.body;
  const { userId } = req.user;

  try {
    const subprofile = await Subprofile.findOne({ user: userId, name: name });
    if (!subprofile) {
      return res.status(404).json({ msg: 'Subprofile not found' });
    }

    subprofile.price = price;
    await subprofile.save();

    console.log('Price set successfully');
    res.status(200).json({ subprofile });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update location for user and their subprofiles
router.put('/location/update', auth, async (req, res) => {
  const { userId } = req.user;
  const { location } = req.body;

  if (!location) {
    return res.status(400).json({ message: 'Location is required.' });
  }

  try {
    // Update the user's location
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.location = location;
    await user.save();

    // Update the location for all subprofiles
    await Subprofile.updateMany({ user: userId }, { location });

    // Re-fetch the user with updated subprofiles
    const updatedUser = await User.findById(userId).populate('subprofiles');

    console.log('Location updated');
    res.json({ message: 'Location updated successfully for user and all subprofiles.', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while updating the location.', error });
  }
});

module.exports = router;
