const express = require ('express')
const app = express()
const port = process.env.port || 3000

app.get("/" , (req, res) => res.send("Hello world"))

app.post('/confirmation', (req, res) => {
    console.log('....................... confirmation .............')
    console.log(req.body)
})

app.post('/validation', (req, resp) => {
    console.log('....................... validation .............')
    console.log(req.body)
})

app.listen(port , () => {
    console.log("App listening on port" + port)
})
