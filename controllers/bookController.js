//import my book.js file with the schema 
const bookModel = require('../models/bookModel')
const mongoose = require('mongoose')


//Get all Books
const getBooks = async(req,res)=>{

    const user_id = req.user._id
    const books = await bookModel.find({user_id})
    .sort({createdAt: -1}) //sort them by date created 
    
    res.status(200).json(books)
}

//Get a single book

const getSingleBook = async(req,res)=>{
    const {id} = req.params

    //This is created so that if an invalid or incorrect ID is inputted it doesnt crash the node server
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'no such Id exists'})
    }
    const book =  await bookModel.findById(id)

    if(!book){
        return res.status(404).json({msg:"No such book exists"})
    }

    res.status(200).json(book)
}

//Create a single book
const createASingleBook = async (req,res) =>{
    const {title,author,pages,contact} = req.body 

    let emptyFields = []

    if (!title){
        emptyFields.push('title')
    }
    if (!author){
        emptyFields.push('author')
    }
    if (!pages){
        emptyFields.push('pages')
    }
    if (!contact){
        emptyFields.push('contact')
    }

    if(emptyFields.length > 0 ){
        return res.status(400).json({error: 'Please fill in all fields' , emptyFields})
    }


    
    //POST a single book
    try {
        const user_id = req.user._id
        const newBook = await bookModel.create({title,author,pages,contact, user_id})
        res.status(200).json(newBook)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//Delete a single book

const deleteBook = async (req,res) =>{
    const {id} = req.params


    //This is created so that if an invalid or incorrect ID is inputted it doesnt crash the node server
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'no such Id exists'})
    }

    const book = await bookModel.findOneAndDelete({_id: id})

    if(!book){
        return res.status(400).json({msg:"No such book exists"})
    }

    res.status(200).json(book)
}


//Update a single book

const updateBook = async (req,res) =>{
    const {id} = req.params


    //This is created so that if an invalid or incorrect ID is inputted it doesnt crash the node server
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'no such Id exists'})
    }

    const book = await bookModel.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!book){
        return res.status(400).json({msg:"No such book exists"})
    }

    res.status(200).json(book)
}



module.exports = {
    getBooks,
    getSingleBook,
    createASingleBook,
    updateBook,
    deleteBook
}