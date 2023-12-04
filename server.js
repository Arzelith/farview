const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connect = require('./db/db-connect');
const createRootAdmin = require('./utils/create-root-admin');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middlewares/error-handler');
//routes imports
const authRoutes = require('./routes/auth-routes');
const adminRoutes = require('./routes/admin-routes');
const refreshTokenRoutes = require('./routes/refresh-routes');
const logoutRoutes = require('./routes/logout-routes');
const appointmentRoutes = require('./routes/appointments-routes');
//end routes imports

const app = express();
dotenv.config();

// app.use(
//   cors({
//     origin:
//       process.env.NODE_ENV !== 'production'
//         ? ['http://localhost:3000']
//         : [process.env.ORIGIN],
//     credentials: true,
//     methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
//     optionSuccessStatus: 200,
//   })
// );

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '20mb' }));
app.use(cookieParser());

if (process.env.NODE_ENV !== 'production') {
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

//routes
const v1 = '/farview-app/v1';
app.use(`${v1}/auth`, authRoutes);
app.use(`${v1}/admin`, adminRoutes);
app.use(`${v1}/refresh`, refreshTokenRoutes);
app.use(`${v1}/logout`, logoutRoutes);
app.use(`${v1}/appointment`, appointmentRoutes);

//end routes
app.use(errorHandler);

const port = process.env.PORT || 5000;
const startServer = async () => {
  try {
    await connect(process.env.MONGO_URI);
    await createRootAdmin();
    app.listen(port, () => {
      console.log(`server corriendo en puerto: ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
