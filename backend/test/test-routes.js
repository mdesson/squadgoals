var app = require("../src/index");
var chai = require("chai");
var chaiHttp = require("chai-http");

let should = chai.should();

chai.use(chaiHttp);

describe("User Routes", () => {
  it("Should return 1 user", (done) => {
    chai
      .request(app)
      .get("/users/1")
      .end((err, res) => {
        res.should.have.status(200);
        // TODO: mock a consistent UID
        // TODO: test image payload
        // TODO: Get record from db using sequelize and just compare
        res.body.should.be.eql({
          firstName: "Johnny",
          lastName: "tester",
          email: "123@fake.com",
          aspirationalMessage: "If you can dream it, you can do it!",
        });
      });
    done();
  });
  it("Should create 1 user", () => {
    chai
      .request(app)
      .post("/users")
      .send({
        firstName: "Postman",
        lastName: "Pat",
        email: "123@royalmail.co.uk",
        aspirationalMessage: "Postman Pat and his black and white cat",
      })
      .end((err, res) => {
        res.should.have.status(200);
      });
  });
});
