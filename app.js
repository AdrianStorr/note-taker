// Dependencies
// =============================================================
const fs = require('fs');
const express = require('express');
const path = require('path');
const { request } = require('http');
const util = require("util");
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const DB_PATH = path.join(__dirname, "/db/db.json");


// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));








// notes Characters (DATA)
// =============================================================


// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get('/api/notes', async(req, res)=> {
    let notes = await readFileAsync(DB_PATH, "utf-8");
    if(notes) {
        notes = JSON.parse(notes);
        res.json(notes);
    } else {
        res.send(false);
    }
    res.end();


    
});

app.post('/api/notes', async(req, res) => {
    const { title , text } = req.body;
    const data = {
        title: title,
        text: text,
        id: Date.now()
    };
    let notes = await readFileAsync(DB_PATH, "utf-8");
    if(notes) {
        notes = JSON.parse(notes);
        notes.push(data);
    } else {
        notes = [data];
    }
    await writeFileAsync(DB_PATH, JSON.stringify(notes), "utf8");
    res.json(notes);
    res.end()
});

app.delete('/api/notes/:id', async(req,res) => {
    let { id } = req.params;
    id = parseInt(id);
    let notes = await readFileAsync(DB_PATH, "utf-8");
    if (notes){
        notes = JSON.parse(notes);
        notes = notes.filter(notes => notes.id !== id);
        await writeFileAsync(DB_PATH, JSON.stringify(notes), "utf8");
        res.json(notes);
        res.end();
    } else {
        res.send(false);
        res.end();
    }
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });




// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
