const express = require('express');
const StageEvent = require('../models/StageEvent');
const Order = require('../models/Order');
const { protect, requireRole } = require('../middleware/auth');

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