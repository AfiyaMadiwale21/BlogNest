const express = require("express");
const Blog = require("../models/Blog");
const router = express.Router();

router.post("/", async (req, res) => {
  const { title, content, userId } = req.body;
  const blog = new Blog({ title, content, userId });
  await blog.save();
  res.json(blog);
});

router.get("/", async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
});

router.delete("/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;