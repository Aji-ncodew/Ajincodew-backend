const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
require("dotenv/config");

const app = express();
const port = process.env.PORT || 5000;
const dbPath = process.env.DB_PATH || "./database.db";

const corsOptions = {
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsOptions));

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connected to SQLite database");
    createTables();
  }
});

function createTables() {
  db.run(`
    CREATE TABLE IF NOT EXISTS Course (
      _id INTEGER PRIMARY KEY AUTOINCREMENT,
      image TEXT,
      type TEXT,
      title TEXT,
      speakers TEXT,
      Year TEXT,
      Duration TEXT,
      link TEXT
    )
  `);
}

app.get("/time", (req, res) => {
  const currentTime = new Date();
  res.status(200).json({ time: currentTime });
});

// CRUD API routes for Courses
app.get("/", (req, res) => {
  const query = "SELECT * FROM Course";
  db.all(query, (err, courses) => {
    if (err) {
      console.error(err.message);
      res.status(400).json({ message: "Error fetching courses" });
    } else {
      res.status(200).json(courses);
    }
  });
});

app.post("/api/v1/courses", (req, res) => {
  const { image, type, title, speakers, Year, Duration,link } = req.body;
  const query = "INSERT INTO Course (image, type, title, speakers, Year, Duration,link) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.run(query, [image, type, title, speakers, Year, Duration,link], function (err) {
    if (err) {
      console.error(err.message);
      res.status(400).json({ message: "Error creating course" });
    } else {
      res.status(201).json({ message: "Course created", course_id: this.lastID });
    }
  });
});

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
