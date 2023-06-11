const db = require('../config/dbConnection')
const jwt = require('jsonwebtoken')
// const { promisify } = require('util')

exports.homePage = async (req, res) => {
    
    const comments = await fetch(`http://localhost:5000/comments`).then(res => res.json()).then(data => data.reverse())
        
    const posts = await fetch(`http://localhost:5000/posts`).then(res => res.json()).then(data => data.reverse())
    
    const likes = await fetch(`http://localhost:5000/likes`).then(res => res.json()).then(data => data)

    const me = req.user

    // console.log(me)

    res.render('index', {posts, comments, me, likes})
    


    // db.query('SELECT * FROM post LEFT OUTER JOIN comment ON post.idPost = comment.comment_idPost', async (error, result, next) => {

    //     if(error) {
    //         console.log(error)
    //     } else {
    //         // console.log('result (pagesControllers)', result)
    //         console.log('pagesControllers', 'is launch')
    //         console.log(result)
    //         console.log(comments)
            
    //     }
    // })
}

exports.loginPage = async (req, res) => {
    const me = req.user
    res.render('login', {me})
}

exports.registerPage = (req, res) => {
    const me = req.user
    res.render('register', {me})
}

exports.postPage = (req, res) => {
    const me = req.user
    res.render('createPost', {me})
}



