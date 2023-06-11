const db = require('../config/dbConnection')

exports.post = (req, res) => {
    const { idpost, postText, postImage } = req.body
    const newPost = { postText, postImage }
    db.query('INSERT INTO post SET ?', newPost, (error, result) => {
        
        if(error) {
            console.log(error)
            res.status(400).json({
                error: 'Failure'
            })
        } else {
            res.redirect('/')
        }
    })
}

exports.posts = (req, res) => {
    db.query('SELECT * FROM post', (error, result) => {
        
        if(error) {
            console.log(error)
        } else {
            console.log('result', result)
            res.json(result)
        }
    })
}

exports.postDelete = (req, res) => {
    console.log('postDelete', 'C est lancé');
    const postId = req.params.id
    db.query('DELETE FROM post WHERE idPost = ?', postId, (error, result) => {
        
        if(error) {
            console.log(error)
            res.status(400).json({
                error: 'Failure'
            })
        } else {
            console.log('result', result)
            res.redirect('/')
        }
    })
}
