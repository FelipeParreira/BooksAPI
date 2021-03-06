# Books API

This is a simple API/back-end app built with NodeJS (using ExpressJS) and MongoDB to persist data.

## Endpoints
1. POST `/book`
   * Adds a new book to the database;
   * Body (request):
     ```
      {
        "title": "Book title example",
        "description": "Book description example",
        "isbn": "9781617293290",
        "language": "BR"
      }
     ```
2. GET `/book/:bookId`
   * Queries for a book by its id;
   * Body (response):
     ```
       {
         "_id": "1234",
         "title": "Book title example",
         "description": "Book description example",
         "isbn": "9781617293290",
         "language": "BR"
        }
     ```
3. GET `/books?keyWord=[...]`
   * Search books using the Google Books API;
   * Returns, at most, 24 results;
   * The body of the request can have a `query` property; if it is not specified, it searches "kotlin" by default;
   * Body (response):
     ```
       {
             "numberBooks": 24,
             "books": [
             {
               "id": "1234",
               "title": "Book title example",
               "description": "Book description example",
               "isbn": "9780134854229",
               "language": "en"
             },
             {"..."},
             {"..."}]
       }
     ```

  ## Running the app
  1. Clone or download the repo;
  2. Navigate to the root folder via the terminal and run `npm install`;
  3. Run `sudo mongod` to start the database;
  4. In a new terminal tab, run `npm start`;
  5. You can test the API with Postman (the defaut port is `3000`);
  6. Have fun!

  ** After running the app, the tests can be run with the command `npm test`.
