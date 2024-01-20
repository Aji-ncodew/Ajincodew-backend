// routes/blogRoutes.js
const express = require('express');
const blogRoutes = express.Router();
const {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog
} = require('../controllers/blogController');

// CRUD routes
blogRoutes.get('/blogs', getAllBlogs);
blogRoutes.get('/blogs/:blogId', getBlogById);
blogRoutes.post('/blogs', createBlog);
blogRoutes.put('/blogs/:blogId', updateBlog);
blogRoutes.delete('/blogs/:blogId', deleteBlog);

module.exports = blogRoutes;
