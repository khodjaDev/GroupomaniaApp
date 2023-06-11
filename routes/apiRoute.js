const express = require('express');
const app = express.Router();
const userCTRL = require('../controllers/userController')
const postCTRL = require('../controllers/postController')
const commentCTRL = require('../controllers/commentController')

// USERS API ROUTES
app.post('/register', userCTRL.register)

app.post('/login', userCTRL.login)

app.post('/logout', userCTRL.logout)

// COMMENT API ROUTEs

app.post('/comment', commentCTRL.comment)

app.get('/comments', commentCTRL.comments)

app.post('/commentDelete/:id', commentCTRL.commentDelete)

// POST API ROUTES

app.post('/post', postCTRL.post)

app.get('/posts', postCTRL.posts)

app.post('/postDelete/:id', postCTRL.postDelete)




// LIKE API ROUTES

module.exports = app;