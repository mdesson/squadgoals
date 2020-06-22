const userController = require('../../src/controllers/user');

const createTestUser = async (firstName, lastName, email, password, aspirationalMessage) => {
  // Create mock request
  const req = {
    body: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      aspirationalMessage: aspirationalMessage,
    }
  }

  // Create mock response
  const res = {
    statusCode: 0,
    responseData: {},
    status: function (code) {
      this.statusCode = code;
      return this;
    },
    send: function (data) {
      this.responseData = data;
      return this;
    }
  }

  // Create a mock user
  await userController.postUser(req, res, () => { });

  // Return the token and the user dataValues
  return {
    token: res.responseData.token,
    user: res.responseData.user.dataValues
  };
}

module.exports = createTestUser;