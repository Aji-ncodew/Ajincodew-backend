// blogs.js
const { db } = require("../firebase/admin.js");

const blogsCollection = db.collection('blogs');

exports.getAllBlogs = async (req, res) => {
  try {
    const snapshot = await blogsCollection.get();
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(data);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong, please try again" });
  }
};

exports.getBlogById = async (req, res) => {
  const { blogId } = req.params;
  const blogRef = blogsCollection.doc(blogId);

  try {
    const doc = await blogRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "blog not found" });
    }

    const blogData = doc.data();
    console.log(blogData);
    return res.status(200).json(blogData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong, please try again" });
  }
};

exports.createBlog = async (req, res) => {
  const newBlog = req.body;

  try {
    // Automatically generate publishDate
    newBlog.publishDate = new Date();
    // Set updateDate to null by default
    newBlog.updateDate = null;

    const docRef = await blogsCollection.add(newBlog);
    const blogData = await docRef.get();
    console.log(blogData.data());
    return res.status(201).json({ message: "blog created successfully", blogId: docRef.id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong, please try again" });
  }
};

exports.updateBlog = async (req, res) => {
  const { blogId } = req.params;
  const updatedBlog = req.body;

  try {
    const blogRef = blogsCollection.doc(blogId);
    const doc = await blogRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "blog not found" });
    }

    // Ensure that the author exists before updating the blog
    if (updatedBlog.authorId) {
      const authorSnapshot = await authorsCollection.doc(updatedBlog.authorId).get();

      if (!authorSnapshot.exists) {
        return res.status(404).json({ error: "Author not found" });
      }
    }

    // Set updateDate to the current date
    updatedBlog.updateDate = new Date();

    await blogRef.update(updatedBlog);
    const updatedData = await blogRef.get();
    console.log(updatedData.data());
    return res.status(200).json({ message: "blog updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong, please try again" });
  }
};

exports.deleteBlog = async (req, res) => {
  const { blogId } = req.params;
  const blogRef = blogsCollection.doc(blogId);

  try {
    const doc = await blogRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "blog not found" });
    }

    await blogRef.delete();
    console.log("blog deleted successfully");
    return res.status(200).json({ message: "blog deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong, please try again" });
  }
};
