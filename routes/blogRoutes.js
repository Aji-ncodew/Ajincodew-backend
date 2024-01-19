// routes/blogRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog
} = require('../controllers/blogController');

// CRUD routes
router.get('/blogs', getAllBlogs);
router.get('/blogs/:blogId', getBlogById);
router.post('/blogs', createBlog);
router.put('/blogs/:blogId', updateBlog);
router.delete('/blogs/:blogId', deleteBlog);

module.exports = router;
