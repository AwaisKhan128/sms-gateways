//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('dist/SMS-GATEWAY'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join('dist/SMS-GATEWAY/index.html',{ root: '.' }));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 4080);