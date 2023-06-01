const express = require('express');
const app = express.Router();
const userCTRL = require('../../controllers/userControllers')

// USERS API ROUTES
app.post('/register', userCTRL.register)
app.post('/login', userCTRL.login)


// COMMENT API ROUTES


// POST API ROUTES


// LIKE API ROUTES

module.exports = app;