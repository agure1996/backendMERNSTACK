const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

//Create web token here
const createToken = (_id) =>{

    //intent: if the signup is successful, we will print this token in postman underneath the new acc created
 return jwt.sign({_id}, process.env.SECRET,{expiresIn: '3d'})
}

//Signup User

const signupUser = async (req,res)=>{

    const{email,password} = req.body

    try {
        const user = await User.signup(email,password)

        //Create a token 

        const token = createToken(user._id)
         //if successful account creation print acc and token as json in postman
        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
}


//Login User
const loginUser = async (req,res)=>{

    const {email,password} = req.body

    try {
        const user = await User.login(email,password)

        //Create a token 

        const token = createToken(user._id)
         //if successful account creation print acc and token as json in postman
        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}




module.exports = {
    loginUser,signupUser
}