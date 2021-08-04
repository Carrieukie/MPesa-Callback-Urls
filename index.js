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
db.run("CREATE TABLE IF NOT EXISTS b2c_timeout_url (info TEXT)");
db.run("CREATE TABLE IF NOT EXISTS b2c_result_url (info TEXT)");
db.run("CREATE TABLE IF NOT EXISTS stk_callback (info TEXT)");
db.run("CREATE TABLE IF NOT EXISTS status (info TEXT)");

});

app.get("/" , (req, res) => res.send("On this api send an empty POST request to /confirmation for confirmation  \n /validation for validation \n /status for transaction query status"))

app.post('/confirm', (req, res) => {
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



app.post('/validate', (req, res) => {
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

app.post('/b2c_timeout_url', (req, res) => {

    console.log('....................... status .......................')

    //Get the request body
    var body = JSON.stringify(req.body)
    console.log(body)

    //This is to avoid empty columns in the database
    //Insert the body into database if there's any
    if(body.length > 3){
        var stmt = db.prepare("INSERT INTO b2c_timeout_url VALUES (?)");
        stmt.run("Status " + body);
        stmt.finalize();
    }

    //Fetch everything from the database from the confrimation table
    db.all("SELECT * FROM b2c_timeout_url", function(err, row) {
    
         if(err){
             res.send(err)
         }else{
            res.send(row)
         }

    });
});

app.post('/b2c_result_url', (req, res) => {

    console.log('....................... b2c_result_url .......................')

    //Get the request body
    var body = JSON.stringify(req.body)
    console.log(body)

    //This is to avoid empty columns in the database
    //Insert the body into database if there's any
    if(body.length > 3){
        var stmt = db.prepare("INSERT INTO b2c_result_url VALUES (?)");
        stmt.run("b2c_result" + body);
        stmt.finalize();
    }

    //Fetch everything from the database from the confrimation table
    db.all("SELECT * FROM b2c_result_url", function(err, row) {
    
         if(err){
             res.send(err)
         }else{
            res.send(row)
         }

    });
});

app.post('/stk_callback', (req, res) => {

    console.log('....................... stk_callback .......................')

    //Get the request body
    var body = JSON.stringify(req.body)
    console.log(body)

    //This is to avoid empty columns in the database
    //Insert the body into database if there's any
    if(body.length > 3){
        var stmt = db.prepare("INSERT INTO stk_callback VALUES (?)");
        stmt.run("stk_callback " + body);
        stmt.finalize();
    }

    //Fetch everything from the database from the confrimation table
    db.all("SELECT * FROM stk_callback", function(err, row) {
    
         if(err){
             res.send(err)
         }else{
            res.send(row)
         }

    });
});

app.post('/status', (req, res) => {

    console.log('....................... status .......................')

    //Get the request body
    var body = JSON.stringify(req.body)
    console.log(body)

    //This is to avoid empty columns in the database
    //Insert the body into database if there's any
    if(body.length > 3){
        var stmt = db.prepare("INSERT INTO status VALUES (?)");
        stmt.run("Status " + body);
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







