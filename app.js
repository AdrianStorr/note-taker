const express = require('express');
const PORT = process.env.PORT || 3000;
const HOST = "http://localhost:3000";
const app = express();
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
app.listen(PORT, (req, res) => {
    console.log("The server has started listening in port " + PORT + " : " + HOST);
});