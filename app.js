const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config/database');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const sessionRoute = require('./routes/session');

//connect to db
mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
    console.log('Connected to database: ' + config.database);
});
mongoose.connection.on('error', (err) => {
    console.log('There was an error connecting to the database.. Error: ' + err);
});


//init app
const app = express();
//port
const port = 8080;

//Middleware
app.use(cors());
app.use(bodyParser.json());

//Routes
app.use(userRoute);
app.use(postRoute);
app.use(sessionRoute);

//start server
app.listen(port, () => {
    console.log('App started on port: ' + port);
});

