const express = require('express');
const app = express.Router();
const pagesCTRL = require('../controllers/pagesController')
const db = require('../config/dbConnection')

app.get('/', pagesCTRL.homePage)

app.get('/login', pagesCTRL.loginPage)

app.get('/register', pagesCTRL.registerPage)

app.get('/post', pagesCTRL.postPage)



// app.get('/comment/:id', pagesCTRL.commentPage)


module.exports = app;