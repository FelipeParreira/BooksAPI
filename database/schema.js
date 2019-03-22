const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { Types: { ObjectId } } = Schema;

const bookSchema = new Schema({
  id: ObjectId,
  title: String,
  description: String,
  isbn: String,
  language: String
}, { versionKey: false });

bookSchema.method('transform', function() {
  let obj = this.toObject();

  obj.id = obj._id;
  delete obj._id;

  return obj;
});

const Book = model('BookStorage', bookSchema);

module.exports = Book;
