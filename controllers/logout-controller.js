const Admin = require('../models/admin-model');
const asyncHandler = require('../utils/async-handler');

const logout = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies.refreshToken) {
    return res.sendStatus(204);
  }

  const refreshToken = cookies.refreshToken;
  const admin = await Admin.findOne({ refreshToken });

  if (!admin) {
    res.clearCookie('refreshToken');
    return res.sendStatus(204);
  }

  res.clearCookie('refreshToken');
  admin.refreshToken = '';
  await admin.save();
  return res.sendStatus(204);
});

module.exports = {
  logout,
};
