const db = require('../config/dbConnection')

exports.comment = (req, res) => {
    const { commentText, commentImage, comment_idPost } = req.body
    const newComment = {commentText, commentImage, comment_idPost }
    db.query('INSERT INTO comment SET ?', newComment, (error, result) => {

        if(error) {
            console.log(error)
            res.status(400).json({
                error: 'Error'
            })
        } else {
            res.redirect('/')
        }
    })
}

exports.comments = (req, res) => {
    db.query('SELECT * FROM comment', (error, result) => {
        
        if(error) {
            console.log(error)
            res.status(400).json({ error: 'Error'})
        } else {
            console.log('result', result)
            res.json(result)
        }
    })
}

exports.commentDelete = (req, res) => {
    console.log('commentDelete', 'C est lancé');
    const commentId = req.params.id
    db.query('DELETE FROM comment WHERE idComment = ?', commentId, (error, result) => {
        
        if(error) {
            console.log(error)
            res.status(400).json({
                error: 'Error'
            })
        } else {
            console.log('result', result)
            res.redirect('/')
        }
    })
}
