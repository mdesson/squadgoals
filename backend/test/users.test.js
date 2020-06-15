const fs = require("fs");
const path = require("path");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const app = require("../src/index");

// Models
const User = require('../src/models/user');

// Util
const createTestUser = require('./util/createTestUser');

const should = chai.should();
const expect = chai.expect;

describe('User Tests', () => {

  let token;
  let testUser;

  before(async () => {
    userObject = await createTestUser(
      'foo',
      'bar',
      'foo@bar.com',
      'foobar1',
      'foobar',
    );

    token = userObject.token;
    testUser = userObject.user;
  })

  after(async () => {
    await User.destroy({ where: {} });
  })

  describe("GET Routes", () => {
    it("should return status code 200 and all information pertaining to one user", (done) => {
      chai
        .request(app)
        .get(`/users/${testUser.id}`)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.eql({
            id: testUser.id,
            email: "foo@bar.com",
            firstName: "foo",
            lastName: "bar",
            aspirationalMessage: "foobar",
          });
        });
      done();
    });

    it("should return status code 200 and a single user's avatar", (done) => {
      chai
        .request(app)
        .get(`/users/avatar/${testUser.id}`)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
        });
      done();
    });

    it("should return status code 404 when a user's avatar was not found", (done) => {
      chai
        .request(app)
        .get("/users/avatar/99999")
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(404);
        });
      done();
    });
  });

  describe("POST Routes", () => {
    it("should return status code 201 when successfully creating one user", async () => {
      const res = await chai
        .request(app)
        .post("/users")
        .set("content-type", "application/x-www-form-urlencoded")
        .field("firstName", "Sally")
        .field("lastName", "Successful")
        .field("email", "sally@test.com")
        .field("password", "sallysally")
        .field(
          "aspirationalMessage",
          "I love nothing more than a good POST that hits the db"
        )
        .attach(
          "avatar",
          fs.readFileSync(path.join(__dirname, "sampleData/avatar.jpg")),
          "avatar.jpg"
        );
      res.should.have.status(201);
    });

    it("should return status code 201 and create one user with default avatar", async () => {
      const res = await chai
        .request(app)
        .post("/users")
        .set("content-type", "application/x-www-form-urlencoded")
        .field("firstName", "Daniel")
        .field("lastName", "Default")
        .field("email", "default@test.com")
        .field("password", "defaultdefault")
        .field("aspirationalMessage", "Set it and forget it");
      res.should.have.status(201);
    });

    it("should return staus code 400 when adding user with duplicate email address", async () => {
      const res = await chai
        .request(app)
        .post("/users")
        .set("content-type", "application/x-www-form-urlencoded")
        .field("firstName", "Dolly")
        .field("lastName", "Duplicate")
        .field("email", "sally@test.com")
        .field("password", "duplicate")
        .field("aspirationalMessage", "Duplicate email address")
        .attach(
          "avatar",
          fs.readFileSync(path.join(__dirname, "sampleData/avatar.jpg")),
          "avatar.jpg"
        );
      res.should.have.status(400);
    });

    it("should return status code 400 when adding user without filling all fields", async () => {
      const res = await chai
        .request(app)
        .post("/users")
        .set("content-type", "application/x-www-form-urlencoded")
        .field("lastName", "Failure")
        .field("email", "123@fake.com")
        .field("password", "123456")
        .field("aspirationalMessage", "This will not work, no firstname")
        .attach(
          "avatar",
          fs.readFileSync(path.join(__dirname, "sampleData/avatar.jpg")),
          "avatar.jpg"
        );
      res.should.have.status(400);
    });
  });
});