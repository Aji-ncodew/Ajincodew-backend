require('dotenv').config();

const express = require('express');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT;
const blogRoutes = require('./routes/blogRoutes');

router.use('/', blogRoutes);

app.use(cors());
app.use(bodyParser.json());

app.use('/', blogRoutes);

app.get('/', (req, res) => {
    res.send('Ajincodew api');
});

app.listen(PORT, function () {
    console.log('Demo project at: ' + PORT);
});
