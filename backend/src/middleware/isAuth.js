const jwt = require("express-jwt");

const getTokenFromHeader = (req) => {

  const authHeader = req.get('Authorization');

  if (!authHeader) {
    const error = new Error('Not Authenticated');
    error.statusCode = 401;
    throw error;
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    const error = new Error('No Bearer Token');
    error.statusCode = 500;
    throw error;
  }

  return token;
};

const isAuth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: "token",
  getToken: getTokenFromHeader,
});

module.exports = {
  getTokenFromHeader,
  isAuth,
}
