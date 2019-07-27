const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

// Stores secrets in process env variables
require('dotenv').config()

const User = require('./models/User');
const errorCont = require('./controllers/errorCont');
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0-pvmln.mongodb.net/shop?`;

const app = express();

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions',
});

const csrfProtection = csrf();

// Tell express to use ejs template engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// Automatically parse any incoming data into res.body
app.use(bodyParser.urlencoded({ extended: false }));

// Statically serve public resources including the css stylesheet
app.use(express.static(path.join(__dirname, 'public/')));

// Add session middleware to allow multiple requests from the same connection without re-authentication
app.use(session({
  secret: 'my secret',
  resave: false,
  saveUninitialized: false,
  store: store,
}));

// Must be initialised after the session, as the session is used
app.use(csrfProtection);
// Used to res.redirect error messages back to client without persistent storage in session
app.use(flash());

// Fetch the user object using our mongoose user model and session stored user Id so all model methods are available for this request
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch(error => { throw new Error(error) })
});

// Add session authentication, csrf token and request path to all views
app.use((req, res, next) => {
  res.locals.path = req.originalUrl;
  res.locals.authenticated = req.session.authenticated;
  res.locals.csrfToken = req.csrfToken();
  next();
})

app.use('/admin', adminData.routes);
app.use(shopRoutes);
app.use(authRoutes);

// Serve 500 error page
app.get('/500', errorCont.error500);

// Catch any path not routed to a middleware and serve a 404 page, THIS INVOCATION OF app.use MUST COME LAST
app.use(errorCont.error404);

// Catch server errors thrown in application
app.use((error, req, res, next) => {
  console.log(error);
  res.status(error.statusCode).redirect(`/${error.statusCode}`);
})

// Connected to DB, now spin up server and listen for requests
mongoose.connect(MONGODB_URI, {useNewUrlParser: true})
.then(() => {
  app.listen(3000);
})
.catch(error => console.log(error));


