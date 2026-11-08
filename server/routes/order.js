const express = require('express');
const Order = require('../models/Order');
const { protect, requireRole } = require('../middleware/auth');
const StageEvent = require('../models/StageEvent');
const { calculateRunRate } = require('../utils/runRate');

const router = express.Router();

router.post('/', protect, requireRole('merchandiser'), async (req, res) => {
    try {
        const { poNumber, buyer, styleName, colour, totalQuantity, sizeQuantities, exFactoryDate, unit, currentStage, milestones } = req.body;
        const order = await Order.create({ poNumber, buyer, styleName, colour, totalQuantity, sizeQuantities, exFactoryDate, unit, currentStage, milestones });
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/', protect, async (req, res) => {
    try {
        const orders = await Order.find().populate('buyer', 'name country');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/:id', protect, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('buyer', 'name country');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        const events = await StageEvent.find({ order: order._id }).sort({ createdAt: 1 });
        const runRate = calculateRunRate(order, events);
        res.json({ ...order.toObject(), runRate });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;