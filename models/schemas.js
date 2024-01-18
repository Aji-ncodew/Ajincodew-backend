const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  title: { type: String, required: true },
  cell: { type: String, required: true },
  type: { type: String, required: true },
  image: { type: String, required: true },
  file: { type: String, required: true },
  speakers: { type: [String], required: true },
  tags: { type: [String], required: true },
  academicYear: { type: String, required: true },
});

const analyticsSchema = new Schema({
  visits: { type: Number, required: true },
  views: { type: Number, required: true },
});

const blogSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  author: { type: String, required: true },
  link: { type: String, required: true },
  date: { type: String, required: true },
  tags: { type: [String], required: true },
});

const Sessions = mongoose.model("Sessions", sessionSchema, "sessions");
const Analytics = mongoose.model("Analytics", analyticsSchema, "analytics");
const Blogs = mongoose.model("Blogs", blogSchema, "blogs");

module.exports = { Sessions, Analytics, Blogs };
