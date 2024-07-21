const express = require('express');
const morgan = require('morgan');
const mongoose = require("mongoose");
const Blog = require('./_models/blog');

// express app
const app = express();

const startListening = () => {
  // listen for requests
  app.listen(3000);
  console.log("listening on: http://localhost:3000");
}

const DbUser = 'node-cc-user';
const DbPassword = 'LQLgKdfwFryu1k6O';
const DbUrl = `mongodb+srv://${DbUser}:${DbPassword}@nodemongopractice.cu4nfv6.mongodb.net/NodeMongoPractice?retryWrites=true&w=majority&appName=NodeMongoPractice`;

mongoose.connect(DbUrl)
  .then( (result) => {
    console.log('connected to the DB');
    // console.log(result);
    startListening();
  })
  .catch( (err) => console.log(err) );


// register view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews');

// middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use( morgan('dev'));

app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: 'new blog',
    snippet: 'about my new blog',
    body: 'more about my new blog'
  });

  blog.save()
    .then( (result) => {
      res.send(result)
    })
    .catch( (err) => {
      console.log(err);
    });
});

app.get('/all-blogs', (req, res) => {
  Blog.find()
    .then( (result) => {
      res.send(result)
    })
    .catch( (err) => {
      console.log(err);
    });
});



// routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// Blog routes
app.get('/blogs', (req, res) => {
  Blog.find().sort( {createdAt : -1} )
    .then((result) => {
      res.render('index', { title: 'All blogs', blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post('/blogs', (req, res) => {
  console.table( req.body );
  const blog = new Blog(req.body);
  blog.save()
    .then((result) => {
      res.redirect('/blogs');
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/blog/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render('details', { title: 'Blog Details', blog: result });
    })
    .catch((err) => {
      console.log(err);
    })
});

app.delete('/blogs/:id', (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/blogs' });
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
