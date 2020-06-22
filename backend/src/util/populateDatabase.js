const fs = require("fs");

const authService = require("../services/authService");

// Populate database functions
const populateDatabase = async () => {
  // Create users and their associated auth
  let signUp1 = await authService.SignUp(
    "Postman",
    "Pat",
    "pat@royal-mail.co.uk",
    "mailPaatternBaldness",
    "Post man Pat and his black and white cat"
  );
  let signUp2 = await authService.SignUp(
    "Fireman",
    "Sam",
    "sam@firestation.com",
    "imFireOnTheDanceFloor",
    "He's always on the scene, Fireman Sam!"
  );

  // Create users' avatars
  fs.copyFile(
    "test/sampleData/avatar.jpg",
    `data/${signUp1.user.dataValues.id}.jpg`,
    (err) => {
      if (err) throw err;
    }
  );
  fs.copyFile(
    "test/sampleData/avatar.jpg",
    `data/${signUp2.user.dataValues.id}.jpg`,
    (err) => {
      if (err) throw err;
    }
  );
};

module.exports = populateDatabase;