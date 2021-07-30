const express = require ('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

const port = process.env.port || 3000

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');

db.serialize(function() {
db.run("CREATE TABLE IF NOT EXISTS lorem (info TEXT)");


app.get("/" , (req, res) => res.send("Hello world"))

app.post('/confirmation', (req, res) => {
    console.log('....................... confirmation .............')
    var body = JSON.stringify(req.body)

    console.log(body)


    if(body.length > 3){
        var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
        stmt.run("Ipsum " + body);
        stmt.finalize();
    }


    db.all("SELECT * FROM lorem", function(err, row) {
         console.log(err)
         console.log(row)
         res.send(row)
    });
});

// db.close();

})

app.post('/validation', (req, resp) => {
    console.log('....................... validation .......................')
    console.log(req.body)
})

app.listen(process.env.PORT || 3000 , () => {
    console.log("App listening on port " + port)
})







