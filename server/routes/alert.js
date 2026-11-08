const express = require('express');
const Alert = require('../models/Alert');
const {protect , requireRole } = require('../middleware/auth');
const router = express.Router();

router.get('/', protect, async (req, res) => {
    try {
        const alerts = await Alert.find().sort({ createdAt: -1 }).populate('order', 'poNumber');
        res.json(alerts);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.patch('/:id/confirm', protect, requireRole('merchandiser'), async (req, res) => {
    try {
        const alert = await Alert.findById(req.params.id);
        if (!alert) { return
            res.status(404).json({ message: 'Alert not found' });
        }
        alert.status = 'Confirmed';
        await alert.save();
        res.json(alert);
    } catch (error) { 
        res.status(500).json({ message: 'Server error' });
    }
});

router.patch('/:id/send', protect, requireRole('merchandiser'), async (req, res) => {
    try {
        const alert = await Alert.findById(req.params.id);
        if (!alert) { 
            return
            res.status(404).json({ message: 'Alert not found' });
        }
        alert.status = 'Sent to buyer';
        await alert.save();
        res.json(alert);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;