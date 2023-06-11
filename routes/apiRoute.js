const express = require('express');
const app = express.Router();
const userCTRL = require('../controllers/userController')
const postCTRL = require('../controllers/postController')
const commentCTRL = require('../controllers/commentController')
const likeCTRL = require('../controllers/likeController')

// USERS API ROUTES
app.post('/register', userCTRL.register)

app.post('/login', userCTRL.login)

app.post('/logout', userCTRL.logout)

app.get('/me/:id', userCTRL.me)

// COMMENT API ROUTEs

app.post('/comment', commentCTRL.comment)

app.get('/comments', commentCTRL.comments)

app.post('/commentDelete/:id', commentCTRL.commentDelete)

// POST API ROUTES

app.post('/post', postCTRL.post)

app.get('/posts', postCTRL.posts)

app.post('/postDelete/:id', postCTRL.postDelete)




// LIKE API ROUTES

app.post('/like', likeCTRL.like)

app.get('/likes', likeCTRL.likes)

app.post('/likeDelete', likeCTRL.likeDelete)

module.exports = app;