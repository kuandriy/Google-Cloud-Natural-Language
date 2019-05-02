'use strict';
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = require('./app')();
const server = express();
server.use(bodyParser.json());
server.use(express.static('./public'));
const host = "localhost";
const port = 80;
server.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '.', 'public', 'views', 'index.html'));
});

server.post('/analyze_text', async (req, res) => {
    const { error, result } = await app.analyze_text(req.body);
    if (error) {
        return res.status(400).json(error);
    }
    return res.status(200).json(result);
});

server.listen(port, host);

console.log(`Running on ${host}:${port}`);