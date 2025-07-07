const express = require('express');
const aiRoutes = require('./routes/ai.routes')
const cors = require('cors')
const app = express()

app.use(cors())

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use('/ai', aiRoutes)


module.exports = app;