const express = require ('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

const port = process.env.port || 3000

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');

db.serialize(function() {
db.run("CREATE TABLE IF NOT EXISTS confirmation (info TEXT)");
db.run("CREATE TABLE IF NOT EXISTS validation (info TEXT)");


app.get("/" , (req, res) => res.send("Hello world"))

app.post('/confirmation', (req, res) => {
    console.log('....................... confirmation .............')
    var body = JSON.stringify(req.body)

    console.log(body)


    if(body.length > 3){
        var stmt = db.prepare("INSERT INTO confirmation VALUES (?)");
        stmt.run("Ipsum " + body);
        stmt.finalize();
    }


    db.all("SELECT * FROM confirmation", function(err, row) {
         console.log(err)
         console.log(row)
         res.send(row)
    });
});


})

app.post('/validation', (req, res) => {
    console.log('....................... validation .......................')

    var body = JSON.stringify(req.body)
    console.log(body)


    if(body.length > 3){
        var stmt = db.prepare("INSERT INTO validation VALUES (?)");
        stmt.run("Ipsum " + body);
        stmt.finalize();
    }


    db.all("SELECT * FROM validation", function(err, row) {
         console.log(err)
         console.log(row)
         res.send(row)
    });
});


app.listen(process.env.PORT || 3000 , () => {
    console.log("App listening on port " + port)
})







