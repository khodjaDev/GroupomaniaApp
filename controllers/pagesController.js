const db = require('../config/dbConnection')
const jwt = require('jsonwebtoken')
exports.homePage = async (req, res) => {
    const token = req.cookies.jwtCookie
    console.log(token)

    function parseJwt () {
        return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    }
      console.log(parseJwt())

    // console.log(JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString()));
    
    // console.log(jwt.verify(req.header.token, process.env.JWT_SECRET))
    const comments = await fetch(`http://localhost:5000/comments`).then(res => res.json()).then(data => data.reverse())
        
    const posts = await fetch(`http://localhost:5000/posts`).then(res => res.json()).then(data => data.reverse())
    
    res.render('index', {posts, comments})
    
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
    res.render('login')
}

exports.registerPage = (req, res) => {
    res.render('register')
}

exports.postPage = (req, res) => {
    res.render('createPost')
}



