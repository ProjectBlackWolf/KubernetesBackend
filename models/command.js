const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commandSchema = new Schema({
    name: {
        type: String,
        required: false,
        unique: true,
        trim: true
    },
    cmd: {
    type: String,
        required: false,
        unique: true,
        trim: true
    }
});

const Command = mongoose.model('Command', commandSchema);

module.exports = Command;