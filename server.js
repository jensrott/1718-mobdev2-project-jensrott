const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const cors = require('cors');

const auth = require('./server/config/passport')(); // Passport strategies authentication

/* DB Config */
const db = require('./server/config/keys').mongoURI;
const hostname = 'localhost';
const port = process.env.PORT || 5000;

/* Custom Routes API */
const routes = require('./server/config/routes');


/* Body Parser middleware */
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json()); 

/* Passport middleware */
app.use(passport.initialize());
app.use(passport.session());

/* Passport config JWT strategy */
app.use(auth.initialize());
app.use('', routes);

/* Cors options */
const corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));

// server static assets if production, on our server heroku
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

/* Connect to MongoDB */
mongoose
    .connect(db)
    .then(() => console.log('Connected To MongoDB!'))
    .catch(() => console.log('Oops try again later!'))

app.listen(port, () => console.log(`Server running on http://${hostname}:${port}`));


