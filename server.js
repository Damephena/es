require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const usersRouter = require('./routes/user.route')

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Successfully connected to DB')
}).catch(err => {
    console.log('Couldn\'t connect to DB. Exiting now...', err)
    process.exit()
})

app = express()
PORT = process.env.PORT

app.get('/', (req, res) => {
    res.send('Index page baby!')
})

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use('/accounts', usersRouter)

app.listen(PORT, () => {
    console.log('Server started at', PORT)
})
