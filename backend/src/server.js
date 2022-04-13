const express = require('express')
const cors = require('cors')

const app = express()
const port = 3000

const controllers = require('./controllers')

app.use(cors())
app.use('/', controllers)

app.listen(port, () => console.log(`Beer server running on port ${port}!`))
