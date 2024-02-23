const express = require("express");
const blogRouter = express.Router();
const Blog = require("../models/blog");
const { fetchUser } = require("../utils/middleware");
const mongoose = require(`mongoose`);

//!Fetch all the blogs |Done
blogRouter.get("/allBlogs", async (req, res) => {
  try {
    const blogs = await Blog.find().populate({
      path: "author",
      select: "username",
    });

    res.json(blogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//!Fetch all blogs from a specific auther
blogRouter.get("/blogsByAuthor/:authorId", async (req, res) => {
  try {
    const authorId = req.params.authorId;

    const blogs = await Blog.find({ author: authorId }).populate("author");

    if (blogs.length === 0) {
      return res
        .status(404)
        .json({ message: "No blogs found for this author." });
    }

    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs by author:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

//! Get all blogs from the users that the current user follows
blogRouter.get("/blogs/following", async (req, res) => {
  try {
    const currentUser = req.user;

    const following = currentUser.following;

    const blogs = await Blog.find({ author: { $in: following } })
      .populate("author", "name")
      .sort({ createdAt: -1 });

    res.json(blogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//! Add a new blog |Done
blogRouter.post("/", async (req, res, next) => {
  const { title, content, videos, images } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  const blog = new Blog({
    title: title,
    content: content,
    author: req.user._id,
    videos: videos || [],
    images: images || [],
  });

  try {
    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

//! Edit a blog |Done
blogRouter.put("/:id", async (req, res) => {
  try {
    const { title, content, videos, images } = req.body;

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid blog ID" });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content, videos, images },
      { new: true }
    );
    res.json(updatedBlog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//! Delete a blog |Done
blogRouter.delete("/:id", async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//! Like a blog
blogRouter.put("/:id/like", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    blog.likes.push(req.user._id);
    await blog.save();
    res.json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//! Comment on a blog
blogRouter.post("/:id/comment", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    const { text } = req.body;
    blog.comments.push({ text, postedBy: req.user._id }); // Assuming req.user contains user's ID
    await blog.save();
    res.json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = blogRouter;
