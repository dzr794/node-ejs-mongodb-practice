const express = require('express');
const Blog = require('../_models/blog');

const blogRouter = express.Router();



blogRouter.get('/', (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then((result) => {
      res.render('index', { title: 'All blogs', blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

blogRouter.post('/', (req, res) => {
  console.table(req.body);
  const blog = new Blog(req.body);
  blog.save()
    .then((result) => {
      res.redirect('/blogs');
    })
    .catch((err) => {
      console.log(err);
    });
});

blogRouter.get('/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

blogRouter.get('/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render('details', { title: 'Blog Details', blog: result });
    })
    .catch((err) => {
      console.log(err);
    })
});

blogRouter.delete('/:id', (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/blogs' });
    })
    .catch(err => {
      console.log(err);
    });
});



module.exports = blogRouter;