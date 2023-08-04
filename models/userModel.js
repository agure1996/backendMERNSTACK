const mongoose = require('mongoose')

const bcrypt = require('bcrypt')
const validator = require('validator')



const Schema = mongoose.Schema

const userSchema = new Schema({

    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

//Static Signup Method

//since we are using this. keyword in this method it cannot be an arrow function so we wrote it in the traditional function
userSchema.statics.signup = async function ( email, password ){

    //validation
    if(!email || !password){
        throw Error('All fields must be filled')
    }

    if(!validator.isEmail(email)){
        throw Error('E-mail is not valid')
    }

    if(!validator.isStrongPassword(password)){
        throw Error('Password not strong enough')
    }

    const exists = await this.findOne({email})

    if(exists){
        throw Error('Email already in use')
    }

    //bcrypt uses salt on passwords which is extra layer or random number and text for extra security on password
    //so we basically will generate a salt then hash that with the password and store the result in the database
    
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    //take pass and store in database
    const user = await this.create({email,password: hash})

    return user

}

//Static Login Method
userSchema.statics.login = async function(email, password){
 
    //validation
 if(!email || !password){
    throw Error('All fields must be filled')
}

//check if email exists
const user = await this.findOne({email})

    if(!user){
        throw Error('Incorrect email')
    }

    //check if login information matches (if password is correct basically)
    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error ('Incorrect password')
    }

    return user
}

module.exports = mongoose.model('User' , userSchema)