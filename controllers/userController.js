const db = require('../config/dbConnection')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { promisify } = require('util')


exports.register = (req, res) => {
    
    const {email, lastName, firstName, password, photoProfil} = req.body

    const bothNames = lastName + ' ' + firstName
    const newUser = {email, lastName, firstName, bothNames, password, photoProfil}

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

    db.query('SELECT * FROM user WHERE email = ?', email, async (error, result) => {
        
        if(error) {
            console.log(error)
            res.status(401).json({error: 'error'})
        }

        if (!result.length) {
            res.status(401).json({ message: 'This user doesn\'t exist.'})
        }

        if (!email || !password) {
            res.status(401).json({ error: 'Please provide an email and password.'})

        } else if(!result || !(bcrypt.compare(password, result[0].password))) {
            res.status(401).json({ error: 'Email or password is not valid.' })
        } else {
            id = result[0].idUser
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

exports.me = (req, res) => {
    const id = req.params.id
   db.query('SELECT * FROM user WHERE idUser = ?', id, (req, res) => {
    if (error) {
        console.log(error)
        res.status(401).json({ error: 'Error'})
    } else {
        res.status(200).json({ message: 'Success'})
    }
   })
}

 exports.isLoggedIn = async (req, res, next) => {
    if ( req.cookies.jwtCookie ) {
        try {
            const decoded = await promisify(jwt.verify)(req.cookies.jwtCookie, process.env.JWT_SECRET
                )
            
                console.log(decoded)
            const id = decoded.id
            
            db.query('SELECT * FROM user WHERE idUser = ?', id, (error, result) => {
                    try {
                        if (!result) {
                            res.status(401).json({ message : 'Your token match with no user.'})
                        } 

                        req.user = result[0]
                        // console.log(req.user);

                    } catch (error) {
                        console.log(error)
                        res.status(401).json({ error : 'Error'})
                    }
                })
            
        } catch (error) {
            console.log(error)
            res.status(401).json({ error : 'Error'})
        }
    }
    next()
    // if (req.cookies.jwtCookie) {
    //     const token = req.cookies.jwtCookie
    //     console.log(token)

    //     const tokenValue = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
    //     console.log(tokenValue)
    // }
     
 }


