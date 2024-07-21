const mongoose = require('mongoose');
const blogSchema = require('../_schemas/blog');

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
