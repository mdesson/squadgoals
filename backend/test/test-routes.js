var fs = require("fs");
var path = require("path");
var chai = require("chai");
var chaiHttp = require("chai-http");
var app = require("../src/index");

let should = chai.should();
let expect = chai.expect;

chai.use(chaiHttp);

describe("User Routes", () => {
  it("Should return 1 user", (done) => {
    chai
      .request(app)
      .get("/users/1")
      .end((err, res) => {
        res.should.have.status(200);
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
  it("Should create 1 user", async () => {
    const res = await chai
      .request(app)
      .post("/users")
      .set("content-type", "application/x-www-form-urlencoded")
      .field("firstName", "Postman")
      .field("lastName", "Pat")
      .field("email", "pat@royalmail.co.uk")
      .field("aspirationalMessage", "Postman Pat and his black and white cat")
      .attach(
        "avatar",
        fs.readFileSync(path.join(__dirname, "sampleData/avatar.jpg")),
        "avatar.jpg"
      );
    //   .field("user", {
    //     firstName: "Postman",
    //     lastName: "Pat",
    //     email: "123@royalmail.co.uk",
    //     aspirationalMessage: "Postman Pat and his black and white cat",
    //   })
    expect(res.body).to.be.an("object");
  });
});
