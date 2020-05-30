var fs = require("fs");
var path = require("path");
var chai = require("chai");
var chaiHttp = require("chai-http");
var app = require("../src/index");

let should = chai.should();
let expect = chai.expect;

chai.use(chaiHttp);

describe("GET Routes", () => {
  it("Should return 1 user", (done) => {
    chai
      .request(app)
      .get("/users/1")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.eql({
          id: 1,
          email: "pat@royal-mail.co.uk",
          firstName: "Postman",
          lastName: "Pat",
          aspirationalMessage: "Post man Pat and his black and white cat",
        });
      });
    done();
  });

  it("Should return avatar", (done) => {
    chai
      .request(app)
      .get("/users/avatar/1")
      .end((err, res) => {
        res.should.have.status(200);
      });
    done();
  });

  it("Should return avatar not found", (done) => {
    chai
      .request(app)
      .get("/users/avatar/3")
      .end((err, res) => {
        res.should.have.status(404);
      });
    done();
  });
});

describe("POST Routes", () => {
  it("Should create one user", async () => {
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

  it("Should create one with default avatar", async () => {
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

  it("Should fail to user with duplicate email address", async () => {
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

  it("Should fail with status 400 (bad request)", async () => {
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
