const Admin = require('../models/admin-model');
const asyncHandler = require('../utils/async-handler');
const RequestError = require('../errors/request-error');
const { generateAccessToken, generateRefreshToken } = require('../utils/token-manager');

const login = asyncHandler(async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    throw new RequestError(400, 'Todos los campos son requeridos');
  }
  const admin = await Admin.findOne({ userName });
  if (!admin) {
    throw new RequestError(401, 'Nombre de usuario incorrecto');
  }
  const isPassCorrect = await admin.comparePassword(password);
  if (!isPassCorrect) {
    throw new RequestError(401, 'Password incorrecto');
  }

  const accessToken = await generateAccessToken(admin);
  const refreshToken = await generateRefreshToken(admin, res);
  admin.refreshToken = refreshToken;
  await admin.save();
  res.status(200).json({ admin, accessToken });
});

module.exports = { login };
