const mongoose = require("mongoose");
const BlogSchema = new mongoose.Schema({
  title: String,
  content: String,
  userId: String
});
module.exports = mongoose.model("Blog", BlogSchema);