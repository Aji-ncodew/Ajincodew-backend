// index.js
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser'); // Add this line for parsing request body
var app = express();
const PORT = process.env.PORT || 5050
const { getAllBooks, getBookById, createBook, updateBook, deleteBook } = require('./books.js');

// Enable CORS for all routes
app.use(cors());
app.use(bodyParser.json()); // Use bodyParser for parsing JSON requests

// CRUD routes
app.get('/books', getAllBooks);
app.get('/books/:bookId', getBookById);
app.post('/books', createBook);
app.put('/books/:bookId', updateBook);
app.delete('/books/:bookId', deleteBook);

app.get('/', (req, res) => {
    res.send('This is my demo project');
});

app.listen(PORT, function () {
    console.log('Demo project at: ' + PORT);
});
