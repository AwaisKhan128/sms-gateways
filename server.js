//Install express server
const express = require('express');
const app = express();
const path = require('path');
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration


// Serve only the static files form the dist directory
app.use(express.static('./dist/SMS-Gateway'));

app.get('/*', function(req,res) {
    
res.sendFile('index.html',{ root: 'dist/SMS-Gateway/' });
});


// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 4080);