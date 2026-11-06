const express = require('express');
const Order = require('../models/Order');
const { protect, requireRole } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, requireRole('merchandiser'), async (req, res) => {
    try {
        const { poNumber, buyer, styleName, colour, totalQuantity, sizwQuantities, exFactoryDate, unit, currentStage, milestones } = req.body;
        const order = await Order.create({ poNumber, buyer, styleName, colour, totalQuantity, sizwQuantities, exFactoryDate, unit, currentStage, milestones });
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/', protect, requireRole('merchandiser'), async (req, res) => {
    try {
        const orders = await Order.find().populate('buyer', 'name country');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/:id', protect, requireRole('merchandiser'), async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('buyer', 'name country');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;