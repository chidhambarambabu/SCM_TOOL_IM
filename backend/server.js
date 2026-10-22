/**
 * Express REST API Server
 * Configuration Item: CI-06
 * SCM Baseline: Production v1.0.0
 */
const express = require('express');
const path = require('path');
const DonationController = require('./donationController');

const app = express();
const PORT = process.env.PORT || 3000;
const controller = new DonationController();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Health & SCM Info Endpoint
app.get('/api/scm/status', (req, res) => {
    res.json({
        system: "AI-Based Food Waste Reduction & Donation Management System",
        version: "v1.0.0",
        baseline: "Release Baseline",
        scmTool: "Git & GitHub",
        branch: "main",
        status: "OPERATIONAL"
    });
});

// API Routes
app.get('/api/donations', (req, res) => {
    res.json(controller.getAllDonations());
});

app.post('/api/donations', (req, res) => {
    try {
        const donation = controller.createDonation(req.body);
        res.status(201).json({ success: true, donation });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

app.post('/api/donations/:id/claim', (req, res) => {
    try {
        const ngoName = req.body.ngoName || 'Partner Charity NGO';
        const updated = controller.claimDonation(req.params.id, ngoName);
        res.json({ success: true, donation: updated });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server listening on http://localhost:${PORT}`);
    });
}

module.exports = app;
