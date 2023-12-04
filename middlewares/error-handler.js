const RequestError = require('../errors/request-error');

const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  let message;
  if (statusCode === 500) {
    message = 'Ha ocurrido un error inesperado, intente más tarde....';
  } else {
    message = error.message;
  }

  const defaultError = {
    statusCode,
    message,
  };

  if (error.name === 'ValidationError') {
    defaultError.statusCode = 400;
    defaultError.message = Object.values(error.errors)
      .map((errorItem) => errorItem.message)
      .join(', ');
  }

  if (error instanceof RequestError) {
    defaultError.statusCode = error.statusCode;
    defaultError.message = error.message;
  }
  res.status(defaultError.statusCode).json({ message: defaultError.message });
};

module.exports = errorHandler;
