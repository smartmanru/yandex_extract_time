// Require packages and set the port
//
//  запуск командой: npm start
//
const express = require('express');
const port = 3002;
const routes = require('./routes');
const app = express();
 
routes(app);

// Start the server
const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);
 
    console.log(`Server listening on port ${server.address().port}`);
});
