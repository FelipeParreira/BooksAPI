const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// define port number
const port = process.env.PORT || 3000;


// initialize server
const app = express();

// middleware
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));

// routes

// post a new book
app.post('/book', (req, res) => {
  console.log('inside post route!');
  console.log('BODY', req.body);
  res.send('inside post route...');
});

// get a book
app.get('/book/:id', (req, res) => {
  
});

// get kotlin books
app.get('/books', (req, res) => {

});

// listening on port
app.listen(port, () => console.log(`listening on port ${port}...`));
