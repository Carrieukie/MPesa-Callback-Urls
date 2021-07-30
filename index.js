const express = require ('express')
const app = express()
const port = process.env.port || 3000

app.get("/" , (req, res) => res.send("Hello world"))

app.post('/confirmation', (req, res) => {
    console.log('....................... confirmation .............')
    console.log(req.body)

    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database(':memory:');

    db.serialize(function() {
    db.run("CREATE TABLE confirmation (info TEXT)");
    var stmt = db.prepare("INSERT INTO confirmation VALUES (?)");
    stmt.run("Confirmation " + req.body);
    stmt.finalize();

    db.each("SELECT rowid AS id, info FROM confirmation", function(err, row) {
         console.log(row.id + ": " + row.info);
         res.send(row.id + ": " + row.info)
        });
    });

    db.close();

})

app.post('/validation', (req, resp) => {
    console.log('....................... validation .............')
    console.log(req.body)


    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database(':memory:');

    db.serialize(function() {
    db.run("CREATE TABLE validation (info TEXT)");
    var stmt = db.prepare("INSERT INTO validation VALUES (?)");
    stmt.run("Confirmation " + req.body);
    stmt.finalize();

    db.each("SELECT rowid AS id, info FROM validation", function(err, row) {
         console.log(row.id + ": " + row.info);
         res.send(row.id + ": " + row.info)
        });
    });

    db.close();

})

app.listen(process.env.PORT || 3000 , () => {
    console.log("App listening on port" + port)
})
