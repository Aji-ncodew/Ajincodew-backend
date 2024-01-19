// app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5050;
const routes = require('./routes/blogRoutes');

app.use(cors());
app.use(bodyParser.json());

app.use('/', routes);

app.get('/', (req, res) => {
    res.send('This is my demo project');
});

app.listen(PORT, function () {
    console.log('Demo project at: ' + PORT);
});
