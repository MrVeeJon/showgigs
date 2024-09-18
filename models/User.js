const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type: String, required: true },
  bio: { type: String },
  phone: { type: String },
  profilePhoto: { type: String },
  subprofiles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subprofile' }],
  gigs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Gig' }],
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }]
});

module.exports = mongoose.model('User', UserSchema);

