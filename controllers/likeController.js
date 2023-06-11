const db = require('../config/dbConnection')

exports.like = (req, res) => {
    const { like_idPost, like_idUser } = req.body
    const likeDate = new Date()

    const like = { likeDate, like_idUser, like_idPost }

    db.query('SELECT * FROM likes WHERE like_idPost = ? AND like_idUser = ?', [like_idPost, like_idUser], (error, result) => {
        if (error) {
            console.log(error)
            return res.status(401).json({ error: 'Error'})
        } 

        if (result.length) {
            return res.status(401).json({ error: 'You already like this post.'})
        } 
        
        db.query('INSERT INTO likes SET ?', like, (error, result) => {

            if (error) {
                console.log(error)
                res.status(401).json({ error: 'Error'})
            }
            res.redirect('/')
        })
    })

    
}

exports.likes = (req, res) => {
    db.query('SELECT * FROM likes', (error, result) => {
        
        if(error) {
            console.log(error)
        } else {
            console.log('result', result)
            res.json(result)
        }
    })
}

exports.likeDelete = (req, res) => {
    const {like_idPost, like_idUser} = req.body

    db.query('SELECT * FROM likes WHERE like_idPost = ? AND like_idUser = ?', [like_idPost, like_idUser], (error, result) => {
        if (error) {
            console.log(error)
            return res.status(401).json({ error: 'Error'})
        } 

        if (!result.length) {
            return res.status(401).json({ error: 'You didn\'t like this post.'})
        } 

        db.query('DELETE FROM likes WHERE like_idPost = ? AND like_idUser = ?', [like_idPost, like_idUser], (error, result) => {
            
            if(error) {
                console.log(error)
                res.status(400).json({
                    error: 'Failure'
                })
            } else {
                res.redirect('/')
            }
        })
    })
}


