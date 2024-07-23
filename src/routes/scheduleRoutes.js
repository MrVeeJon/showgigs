const express = require('express');
const router = express.Router();
const { createSchedule, getUserSchedule, updateScheduleStatus } = require('../controllers/scheduleController');

router.post('/', createSchedule);
router.get('/:userId', getUserSchedule);
router.put('/:scheduleId', updateScheduleStatus);

module.exports = router;

