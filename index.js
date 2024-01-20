const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000 ;
const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/auth');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.use('/', authRoutes);
app.use('/', blogRoutes);

app.get('/', (req, res) => {
    res.send('Ajincodew api');
});

app.listen(PORT, function () {
    console.log('Ajincodew project at: ' + PORT);
});
