const express = require('express')
const cors = require('cors')
require('dotenv').config()


// set up our app and middleware
const app = express();
app.use(cors())
app.use(express.json());

app.use(express.urlencoded({ extended: true}));

app.use(express.static('public')); 

// Import router
const mlRoutes = require('./routes/ml')
app.use('/api/ml', mlRoutes);

// Start server
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server listening on PORT ${port}`)
})