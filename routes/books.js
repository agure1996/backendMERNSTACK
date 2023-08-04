const express = require('express')

const { 
    getBooks,
    getSingleBook,
    createASingleBook,
    updateBook,
    deleteBook
} = require('../controllers/bookController')
const requireAuth = require('../middleware/requireAuth')


const router = express.Router()
//To use crud functions on website make sure user is authenticated
router.use(requireAuth)

//GET all books
router.get('/' , getBooks)


//GET a single book
router.get('/:id' , getSingleBook)

//POST a single book
router.post('/' , createASingleBook)

//DELETE a single book
router.delete('/:id' , deleteBook)

//UPDATE a single book
router.patch('/:id' , updateBook)

module.exports = router;