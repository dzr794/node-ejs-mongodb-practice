const express = require('express');
const blogRouter = require('./routes/blogRoutes');
const morgan = require('morgan');
const mongoose = require("mongoose");

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


// routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// Blog routes
app.use('/blogs',blogRouter);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
