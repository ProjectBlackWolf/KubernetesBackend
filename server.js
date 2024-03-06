

require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
//const pg = require('pg');
const methodOverride = require('method-override');
const db = mongoose.connection;
const app = express();

// controllers
const commandC = require('../Controllers/command.js');
//

// models
const command = require('../models/command.js');
const { log } = require('console');

//

const uri = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

mongoose.connect(uri, { useNewUrlParser: true }, () => {
    console.log('connected');
});

// Error/ disconnect
db.on('error', err => console.log(err.message + ' is Mongod not running?'));
db.on('disconnected', () => console.log('mongo disconnected'));

// Middleware
app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(cors());

//route

app.use('/cmds', commandC);

const seedCommands = [];

app.get('/', (req, res) => {
    res.send(`Kubernetes commands GUI`);
});

app.get('/seed', async (req, res) => {
    await command.deleteMany({});
    await command.insertMany(seedCommands);
    res.send('done!');
});

app.get('/cmds', async (req, res) => {
    res.json(await command.find({}));
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})