const sendToken = (user, statusCode, res) => {
  const token = user.getJwtToken();
  const options = {
    expiresIn: new Date(Date.now() + process.env.JWT_COOKIE * 24 * 60 * 1000),
    httpOnly: true,
  };
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, user, token });
};
module.exports = sendToken;
