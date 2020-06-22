const squadController = require('../../src/controllers/squad');
const models = require('../../src/models/index');

const createTestSquad = async (testUser) => {
  // Create mock request
  const req = {
    body: {
      name: 'foobar',
    },
    user: {
      id: testUser.id,
    },
    context: {
      models: models,
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
  await squadController.postSquad(req, res, () => { });

  // Return the token and the user dataValues
  return res.responseData.dataValues;
}

module.exports = createTestSquad;