const Book = require('./schema.js');
const db = require('./index.js');
const Promise = require("bluebird");
const books = Promise.promisifyAll(require('google-books-search'));

const postBook = (data, res) => {
  const { title } = data;

  Book.findOneAndUpdate({ title }, data, { upsert: true })
   .then(book => {
      res.status(201);
      res.json(book);
   })
   .catch(err => {
      res.status(400);
      res.send('Error creating the book.');
   });
};

const getBookById = (id, res) => {
  Book.findById(id)
    .then(book => {
      res.status(200);
      res.json(book);
    })
    .catch(err => {
      res.status(404);
      res.send('Book couldn\'t be found.');
    });
};

// not a global variable, since it is not being exported
const options = {
  field: 'title',
  limit: 24,
  type: 'books'
};

const getBooks = (query, res) => {
  books.searchAsync(query, options)
    .then(books => {
      books = books
                .map(({ id, language, title, description, industryIdentifiers }) => {
                  const isbn = !industryIdentifiers ? 'Unavailable' : industryIdentifiers[0].identifier;
                  return { id, title, description, language, isbn };
                });

      const results = { numberBooks: books.length, books };

      res.status(200);
      res.json(results);
    })
    .catch(err => {
      res.status(404);
      res.send('Couldn\'t find books matching the query.');
    });
};

module.exports = {
  postBook,
  getBookById,
  getBooks
};
