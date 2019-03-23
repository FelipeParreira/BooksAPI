const fetch = require('node-fetch');
const { toBeType } = require('jest-tobetype');

expect.extend({ toBeType });

describe('POST a new book saving it to the database', () => {
  let response;
  const bookData = {
    title: 'Book title example',
    description: 'Book description example',
    isbn: '9781617293290',
    language: 'BR',
  };

  beforeAll(async () => {
    response = await fetch('http://localhost:3000/book', {
        method: 'post',
        body: JSON.stringify(bookData),
        headers: { 'Content-Type': 'application/json' },
    });
  });

  test('it should have a status code of 201', async () => {
    const responseInternals = Object.getOwnPropertySymbols(response)[1];
    expect(response[responseInternals].status).toBe(201);
  });

  test('it should respond with the created book JSON', async () => {
    const book = await response.json();
    
    expect(book).toBeType('object');

    expect(book.title).toBe(bookData.title);
    expect(book.description).toBe(bookData.description);
    expect(book.isbn).toBe(bookData.isbn);
    expect(book.language).toBe(bookData.language);
    expect(book['_id']).toBeType('string');
  });
});

describe('GET a book by its id', () => {
  let response;
  const bookData = {
    title: 'Book title example 2',
    description: 'Book description example',
    isbn: '9781617293290',
    language: 'BR',
  };

  beforeAll(async () => {
    response = await fetch('http://localhost:3000/book', {
      method: 'POST',
      body: JSON.stringify(bookData),
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await response.json();
    response = await fetch(`http://localhost:3000/book/${data['_id']}`);
  });

  test('it should retrieve the book by its id', async () => {
    const book = await response.json();

    expect(book).toBeType('object');

    expect(book.title).toBe(bookData.title);
    expect(book.description).toBe(bookData.description);
    expect(book.isbn).toBe(bookData.isbn);
    expect(book.language).toBe(bookData.language);
    expect(book['_id']).toBeType('string');
  });
});

describe('GET books', () => {

  test('it should return 24 results of kotlin books by default', async () => {
    const response = await fetch('http://localhost:3000/books');
    const data = await response.json();

    expect(data).toBeType('object');
    expect(data.numberBooks).toBe(24);
    expect(data.books[0].title).toMatch(/kotlin/i);
  });

  test('it should search for other strings returning at most 24 books', async () => {
    const response = await fetch('http://localhost:3000/books?keyWord=JavaScript');
    const data = await response.json();

    expect(data).toBeType('object');
    expect(data.numberBooks).toBeLessThanOrEqual(24);
    expect(data.books[0].title).toMatch(/JavaScript/i);
  });

});