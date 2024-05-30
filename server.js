const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const connect = require('./db/db-connect');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middlewares/error-handler');
//routes imports
const appointmentRoutes = require('./routes/appointments-routes');
const contactRoutes = require('./routes/contact-routes');
//end routes imports

const app = express();
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '20mb' }));
app.use(cookieParser());

if (process.env.NODE_ENV !== 'production') {
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

//routes
const v1 = '/farview-app/v1';
app.use(`${v1}/appointment`, appointmentRoutes);
app.use(`${v1}/contact`, contactRoutes);
//end routes

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, './farview-front-end/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './farview-front-end/dist/index.html'));
  });
}

app.use(errorHandler);

const port = process.env.PORT || 5000;
const startServer = async () => {
  try {
    await connect(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server corriendo en puerto: ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
