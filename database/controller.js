const Book = require('./schema.js');
const db = require('./index.js');

const postBook = (data, res) => {
  const { title } = data;
  Book.findOneAndUpdate({ title }, data, { upsert: true })
   .then(book => {
      res.status(201);
      res.send('Book inserted succesfully!');
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
      res.send(book);
    })
    .catch(err => {
      res.status(404);
      res.send('Book couldn\'t be found.');
    });
};

const getBooks = res => {

};

module.exports = {
  postBook,
  getBookById,
  getBooks
};
