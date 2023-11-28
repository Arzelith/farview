const jwt = require('jsonwebtoken');

const generateAccessToken = async (admin) => {
  try {
    const accessToken = jwt.sign(
      {
        admin: {
          _id: admin._id,
          firstName: admin.firstName,
          lastName: admin.lastName,
          userName: admin.userName,
          role:admin.role
        },
      },
      process.env.ACCESS_TOKEN_KEY,
      { expiresIn: process.env.ACCESS_TOKEN_EXP }
    );
    return accessToken;
  } catch (error) {
    console.log(error);
  }
};

const generateRefreshToken = async (admin, res) => {
  try {
    const refreshToken = jwt.sign({ _id: admin._id }, process.env.REFRESH_TOKEN_KEY, {
      expiresIn: process.env.REFRESH_TOKEN_EXP,
    });
    const date = new Date();
    date.setTime(date.getTime() + 45 * 1000);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: date,
      sameSite: 'Lax',
    });
    return refreshToken;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { generateAccessToken, generateRefreshToken };
