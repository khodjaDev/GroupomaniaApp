import path from 'path'

const express = require('express');
const dotenv = require('dotenv')
dotenv.config({path: './config/.env'})
const app = express();

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!</h1>')
    res.sendFile(path.resolve(__dirname, 'static', 'index.html'))
})

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})