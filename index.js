const path = require('path')
const express = require('express');
const dotenv = require('dotenv')
dotenv.config({path: './config/.env'})
const app = express();
const bodyParser = require('body-parser')
const apiRoutes = require('./routes/api/apiRoute')
const pageRoutes = require('./routes/pages/pagesRoutes')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// set the view engine to ejs
app.set('view engine', 'ejs');

// use route 
app.use('/', apiRoutes)
app.use('/', pageRoutes)


app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})