const jwt = require('jsonwebtoken');
const RequestError = require('../errors/request-error');

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new RequestError(401, 'Autorización inválida');
  }
  const accessToken = authHeader.split(' ')[1];
  try {
    const { admin } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY);
    req.admin = admin;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new RequestError(403, 'Token expirado');
    }
    throw new RequestError(401, 'Autorización inválida');
  }
};

module.exports = auth;
