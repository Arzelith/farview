const Admin = require('../models/admin-model');
const asyncHandler = require('../utils/async-handler');
const RequestError = require('../errors/request-error');
const jwt = require('jsonwebtoken');
const { generateAccessToken } = require('../utils/token-manager');

const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies.refreshToken) {
    throw new RequestError(401, 'Cookie no contiene refresh token');
  }
  const refreshToken = cookies.refreshToken;
  console.log(refreshToken)
  const foundAdmin = await Admin.findOne({ refreshToken });
  if (!foundAdmin) {
    throw new RequestError(403, 'Refresh token no concuerda');
  }
  try {
    const { _id } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);
    const admin = await Admin.findById(_id);
    const accessToken = await generateAccessToken(admin);
    res.status(200).json({ accessToken });
  } catch (error) {
    throw new RequestError(403, 'Autorización inválida');
  }
});

module.exports = { handleRefreshToken };
