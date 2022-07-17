const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');


const app = express()

// init Middleware
app.use(logger)

// Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Static Folder
app.use(express.static(path.join(__dirname, 'public')))

// Get Members
app.use('/api/members', require('./routes/api/members'))

// Assigning Port
const PORT = process.env.PORT || 5000

// Add Server & Listner
app.listen(PORT, () => console.log(`Server started at ${PORT}`)) 
