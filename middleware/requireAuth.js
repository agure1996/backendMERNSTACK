const jwt = require('jsonwebtoken')
const User = require('../models/userModel')


const requireAuth = async (req,res,next) =>{

//Verify Authentication, we can grab auth property from req headers and should contain our JWT

const {authorization} = req.headers

if(!authorization){
    return res.status(401).json({error: 'Authorisation token required'})
}

//token format : bearer kjaskdjhaskjdhsakjdhsakjdh we want the second part
//split the string into two parts, split method string splits string into an array of two elements (think of csv reading split)

const token = authorization.split(' ')[1]

try {
    const {_id} = jwt.verify(token, process.env.SECRET)

    req.user = await User.findOne({_id}).select('_id')
    next()
} catch (error) {
    console.log(error)
    res.status(401).json({error: 'Request is not authorized'})
}

}

module.exports = requireAuth