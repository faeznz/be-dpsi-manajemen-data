var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const authMiddleware = require('./middleware/auth');
const dotenv = require('dotenv');

dotenv.config();

var indexRouter = require('./routes/index');
const authRoutes = require('./routes/auth');
const itemRoutes = require('./routes/item');
const reportRoutes = require('./routes/report');
const userRoutes = require('./routes/user');

var app = express();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL);

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(cors());

app.use('/', indexRouter);
app.use('/auth', authRoutes);
app.use('/items', authMiddleware, itemRoutes);
app.use('/reports', authMiddleware, reportRoutes);
app.use('/users', authMiddleware, userRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
