
const path = require('path');

module.exports = function (app) {
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname,'../public/index.html'));
    });
    // request to notes.html
    app.get('/notes', (req,res) => {
        res.sendFile(path.join(__dirname,'../public/notes.html'));
    });

    
    // default url
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname,'../public/index.html'));
    });
    
};