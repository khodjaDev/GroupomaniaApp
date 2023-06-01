const express = require('express');
const app = express.Router();
const pagesCTRL = require('../../controllers/pagesControllers')

app.get('/', pagesCTRL.homePage)
app.get('/login', pagesCTRL.loginPage)
app.get('/register', pagesCTRL.registerPage)

module.exports = app;