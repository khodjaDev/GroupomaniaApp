const db = require('../config/dbConnection')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.register = (req, res) => {
    
    const {email, lastName, firstName, password, photoProfil} = req.body
    const newUser = {email, lastName, firstName, password, photoProfil}

    db.query('INSERT INTO user SET ?', newUser, (error, result) => {
        if (error) {
            console.log(error)
            res.status(401)
        } else {
            console.log(result)
            res.status(200).json({ 
                message : "Success"
            })
        }
    })

}

exports.login = (req, res) => {

    const {email, password} = req.body

    db.query('SELECT * FROM user WHERE email = ?', email, (error, result) => {
        
        if(error) {
            console.log(error)
            res.status(401).json({error: 'error'})
        }

        if (!email || !password) {
            res.status(401).json({ error: 'Please provide an email and password.'})

        } else if(!result || !(bcrypt.compare(password, result[0].password))) {
            res.status(401).json({ error: 'Email or password is not valid.' })
        } else {
            id = result.idUser
            const token = jwt.sign({id}, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES
            }) 
            console.log('token : ' + token)

            const cookieOption = {
                expires : new Date(
                    Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60
                ),
                httpOnly: true
            }

            res.cookie('jwtCookie', token, cookieOption)
            res.status(200).redirect('/')
        }
    })
}

exports.logout = (req, res) => {
    res.cookie('jwtCookie', 'logout', {
        expires: new Date(Date.now() + 2 * 1000),
        httpOnly : true
    })

    res.status(200).redirect('/')
}
