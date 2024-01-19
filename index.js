var express = require('express');
var cors = require('cors');
var app = express();
const PORT = process.env.PORT || 5050
const { books } = require('./books.js');

// Enable CORS for all routes
app.use(cors());

app.get('/books', books);

app.get('/', (req, res) => {
    res.send('This is my demo project');
});

app.listen(PORT, function () {
    console.log('Demo project at: ' + PORT);
});
