const mongoose = require('mongoose');

const GigSchema = new mongoose.Schema({
  subprofile: { type: mongoose.Schema.Types.ObjectId, ref: 'Subprofile', required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'completed', 'canceled'], default: 'pending' }
});

module.exports = mongoose.model('Gig', GigSchema);

