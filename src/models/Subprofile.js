const mongoose = require('mongoose');

const SubprofileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  location: { type: String, required: true },
  price: { type: Number, default: 0 },
  negotiable: { type: Boolean, default: false },
  portfolio: [{ type: String }],
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('Subprofile', SubprofileSchema);

