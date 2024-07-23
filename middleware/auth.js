require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const jwt = require('jsonwebtoken');

app.use(express.static(path.join(__dirname, 'public')));

const auth = function (req, res, next) {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
        return res.status(401).json({ msg: 'Please Login' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ msg: 'Please Login' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Oops, something happened' });
    }
};

module.exports = auth;

