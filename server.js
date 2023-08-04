require ('dotenv').config()

const fileRoute = "./routes/books.js"
const express = require('express')
const mongoose = require('mongoose')
const bookRoutes = require(fileRoute)
const userRoutes = require('./routes/user')

/* Start up the express app by invoking express() and store it in a variable*/
const app = express()

/*Middleware - 

used to check if any request that comes through has some (body) data that we are sending to the server, it then parses it and attaches it to the request handler
*/

app.use(express.json())



//Setting up route handler
app.use('/api/books', bookRoutes)
app.use('/api/user', userRoutes)

//Connect to DB
mongoose.connect(process.env.MONGO_URI)
.then(() =>{
//Listen for requests - specifically in port 4000 once we have connected to the database
app.listen((process.env.PORT),() => {
    console.log('Connected to DB and now Listening on port', process.env.PORT)
})
})
.catch(err =>{
    console.log(err)
})



