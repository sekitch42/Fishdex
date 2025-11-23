// imports express framework
const express = require('express')
// creates express application instance 
const app = express()
const port = 3000

// sends message when user visits site's rool url
app.get('/', (req, res) => {
  res.send('Fishdex Tracker!')
})

// starts server and listens for incoming requests
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
