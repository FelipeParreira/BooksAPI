const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// database functions
const { postBook, getBookById, getBooks } = require('./database/controller.js');

// define port number
const port = process.env.PORT || 3000;

// initialize server
const app = express();

// middleware
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

 /* 
  ******* ROUTES *******
  */

// post a new book
app.post('/book', (req, res) => {
  const data = req.body;
  postBook(data, res);
});

// get a book
app.get('/book/:bookId', (req, res) => {
    const { params: { bookId } } = req;
    getBookById(bookId, res);
});

// get kotlin (default) books
app.get('/books', (req, res) => {
  const query = req.query.keyWord || 'kotlin';
  getBooks(query, res);
});

// listening on port
app.listen(port, () => console.log(`listening on port ${port}...`));
