const jwt = require('jsonwebtoken')
require('dotenv').config()

const SECRET_KEY = process.env.SECRET_KEY

const isLoggedIn = (req, res, next)=>{
    try {
        let token = req.headers.authorization
        if (token) {
            token = token.split(" ")[1]
            let user = jwt.verify(token, SECRET_KEY)
            req.userId = user.id
            
        } else {
           res.status(401).json({message:'Unauthorized user'})
        }

        next();
        
    } catch (error) {
        console.log(error)
        res.status(401).json({message:'Something went wrong'})
    }
}

module.exports = isLoggedIn