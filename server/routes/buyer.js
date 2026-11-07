const express = require('express');
const Buyer = require('../models/Buyer');
const { protect, requireRole } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, requireRole('merchandiser'), async (req, res) => {
    try {
        const { name, country, contactName, email } = req.body;
        const buyer = await Buyer.create({ name, country, contactName, email });
        res.status(201).json(buyer);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/', protect, async (req, res) => {
    try {
        const buyers = await Buyer.find();
        res.json(buyers);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;