const express = require ('express')
const bodyParser = require('body-parser')
const port = process.env.port || 3000

//Initialize express app
const app = express()
app.use(bodyParser.json())

//I will use sqlite for this project. The're better Db's though
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');

//Initialize database tables which will hold data sent to each endpoint
db.serialize(function() {
db.run("CREATE TABLE IF NOT EXISTS confirmation (info TEXT)");
db.run("CREATE TABLE IF NOT EXISTS validation (info TEXT)");
db.run("CREATE TABLE IF NOT EXISTS status (info TEXT)");
});

app.get("/" , (req, res) => res.send("On this api send an empty POST request to /confirmation for confirmation  \n /validation for validation \n /status for transaction query status"))

app.post('/confirmation', (req, res) => {
    console.log('....................... confirmation ................... ')
    var body = JSON.stringify(req.body)

    console.log(body)

    //This is to avoid empty columns in the database
    if(body.length > 3){
        var stmt = db.prepare("INSERT INTO confirmation VALUES (?)");
        stmt.run("Ipsum " + body);
        stmt.finalize();
    }


    //Fetch everything from the database from the confrimation table
    db.all("SELECT * FROM confirmation", function(err, row) {
         console.log(err)
         console.log(row)
         res.send(row)
    });
});



app.post('/validation', (req, res) => {
    console.log('....................... validation .......................')

    var body = JSON.stringify(req.body)
    console.log(body)

    //This is to avoid empty columns in the database
    if(body.length > 3){
        var stmt = db.prepare("INSERT INTO validation VALUES (?)");
        stmt.run("Ipsum " + body);
        stmt.finalize();
    }

    //Fetch everything from the database from the confrimation table
    db.all("SELECT * FROM validation", function(err, row) {
         console.log(err)
         console.log(row)
         res.send(row)
    });
});

app.post('/status', (req, res) => {
    console.log('....................... status .......................')

    var body = JSON.stringify(req.body)
    console.log(body)

    //This is to avoid empty columns in the database
    if(body.length > 3){
        var stmt = db.prepare("INSERT INTO status VALUES (?)");
        stmt.run("Ipsum " + body);
        stmt.finalize();
    }



    //Fetch everything from the database from the confrimation table
    db.all("SELECT * FROM status", function(err, row) {
    
         if(err){
             res.send(err)
         }else{
            res.send(row)
         }

    });
});

app.listen(process.env.PORT || 3000 , () => {
    console.log("App listening on port " + port)
})







