const express = require('express');
const router = express.Router();
const Command = require('../models/command.js');

// INDUCES

// Index
router.get('/', (req, res) => {
    Command.find({}, (err, foundCommand) => {
        res.json(foundCommand);
    });
});

// New - Will be handled by React frontend application
// Delete 
router.delete('/:id', (req, res) => {
    Command.findByIdAndDelete(req.params.id, (err, deletedCommand) => {
        res.json(deletedCommand);
    });
});

// Update
router.put('/:id', (req, res) => {
    Command.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedCommand) => {
        res.json(updatedCommand);
    });
});

// Edit - Will be handled by React Application

// Show 
router.get('/:id', (req, res) => {
    Command.findById(req.params.id, (err, foundCmd) => {
        res.json(foundCmd);
    })
}); 

module.exports = router;