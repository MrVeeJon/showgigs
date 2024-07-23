const Schedule = require('../models/Schedule');

exports.createSchedule = async (req, res) => {
  try {
    const schedule = new Schedule(req.body);
    await schedule.save();
    res.status(201).json(schedule);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUserSchedule = async (req, res) => {
  try {
    const schedules = await Schedule.find({ user: req.params.userId }).populate('event');
    res.status(200).json(schedules);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateScheduleStatus = async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndUpdate(
      req.params.scheduleId,
      { status: req.body.status },
      { new: true }
    );
    res.status(200).json(schedule);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

