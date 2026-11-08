const express = require('express');
const StageEvent = require('../models/StageEvent');
const Order = require('../models/Order');
const { protect, requireRole } = require('../middleware/auth');
const Alert = require('../models/Alert');
const { calculateRunRate } = require('../utils/runRate');

const router = express.Router();

router.post('/', protect, requireRole('supervisor'), async (req, res) => {
    try {
        const { order, stage, quantityDone, photoUrl, issueNote, reasonCategory } = req.body;
        const foundOrder = await Order.findById(order);
        if (!foundOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        const stageEvent = await StageEvent.create({ order, stage, quantityDone, photoUrl, issueNote, reasonCategory, submittedBy: req.user.id });
        foundOrder.currentStage = stage;
        await foundOrder.save();
        const allEvents = await StageEvent.find({ order: foundOrder._id}).sort({ createdAt: 1 });
        const runRate = calculateRunRate(foundOrder, allEvents);
        if (runRate.status === 'Amber' || runRate.status === 'Red') {
            await Alert.create({ order: foundOrder._id, stage: stage, level: runRate.status, requiredPerDay:runRate.requiredPerDay, actualPerDay:runRate.actualPerDay, remainingQuantity: runRate.remainingQuantity, daysLeft: runRate.daysLeft, message: stage + ' is behind: needs ' + runRate.requiredPerDay + ' pirces/day but making ' + runRate.actualPerDay + ' pieces/day. ' + runRate.remainingQuantity + ' pieces left, ' + runRate.daysLeft + ' days to ex-factory.'});
        }
        res.status(201).json(stageEvent);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/order/:orderId', protect, async (req, res) => {
    try {
        const events = await StageEvent.find({ order: req.params.orderId }).sort({ createdAt: -1 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;