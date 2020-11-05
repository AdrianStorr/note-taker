const path = require('path');
const fs = require('fs');
const util = require("util");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// db.json file path
const DB_PATH = path.join(__dirname, "../db/db.json");

module.exports = function (app) {

    // response with the list of notes
    app.get('/api/notes', async (req, res) => {

        let notes = await readFileAsync(DB_PATH, "utf-8");

        if (notes) {
            notes = JSON.pa