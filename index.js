const express = require ('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

const port = process.env.port || 3000

app.get("/" , (req, res) => res.send("Hello world"))

app.post('/confirmation', (req, res) => {
    console.log('....................... confirmation .............')
    console.log(JSON.stringify(req.body))

    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database(':memory:');

    db.serialize(function() {
    db.run("CREATE TABLE lorem (info TEXT)");

    var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
    stmt.run("Ipsum " + JSON.stringify(req.body));
    stmt.finalize();

    db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
         console.log(row.id + ": " + row.info);
         res.send(row.id + ": " + row.info)
    });
});

db.close();

})

app.post('/validation', (req, resp) => {
    console.log('....................... validation .............')
    console.log(req.body)
})

app.listen(process.env.PORT || 3000 , () => {
    console.log("App listening on port" + port)
})
