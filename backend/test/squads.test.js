const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const app = require("../src/index");
const sequelize = require("../src/util/database");
const AuthService = require("../src/services/authService");

const should = chai.should();
const expect = chai.expect;

describe("Squad & SquadMember Tests", () => {
  let testUser1;
  let testUser2;
  let testUser3;

  let testSquad1;
  let testSquad2;

  before(async () => {
    await sequelize.sync({ force: true });

    testUser1 = await AuthService.SignUp("foo1", "bar1", "foo1@bar.com", "foobar1", "foobar1");
    testUser2 = await AuthService.SignUp("foo2", "bar2", "foo2@bar.com", "foobar2", "foobar2");
    testUser3 = await AuthService.SignUp("foo3", "bar3", "foo3@bar.com", "foobar3", "foobar3");

    testSquad1 = await testUser1.user.createSquad({
      name: "testSquad1",
      description: "testDescription1",
      memberCount: 1,
    });

    testSquad2 = await testUser1.user.createSquad({
      name: "testSquad2",
      description: "testDescription2",
      memberCount: 1,
    });

    await testSquad2.addUser(testUser2.user);
    await testSquad2.addUser(testUser3.user);
    await testSquad2.increment("memberCount", { by: 2 });

    await AuthService.Login("foo1@bar.com", "foobar1");
    await AuthService.Login("foo2@bar.com", "foobar2");
  });

  describe("GET Routes", () => {
    it("should return status code 404 if the squad cannot be found", async () => {
      await chai
        .request(app)
        .get(`/squads/99999`)
        .set("Authorization", `Bearer ${testUser1.token}`)
        .then((res) => {
          res.should.have.status(404);
        });
    });

    it("should return status code 200 and squad details", async () => {
      await chai
        .request(app)
        .get(`/squads/${testSquad1.id}`)
        .set("Authorization", `Bearer ${testUser1.token}`)
        .then((res) => {
          res.should.have.status(201);
          res.body.should.be.eql({
            id: testSquad1.id,
            description: testSquad1.description,
            memberCount: testSquad1.memberCount,
            name: testSquad1.name,
            userId: testSquad1.userId,
          });
        });
    });

    it("should return status code 200 and list of all of the user's squads", async () => {
      await chai
        .request(app)
        .get(`/squads`)
        .set("Authorization", `Bearer ${testUser1.token}`)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.have.lengthOf(2);
        });
    });

    it("should return status code 204 if the user has not created any squads", async () => {
      await chai
        .request(app)
        .get(`/squads`)
        .set("Authorization", `Bearer ${testUser2.token}`)
        .then((res) => {
          res.should.have.status(204);
        });
    });

    it("should return status code 201 and list of all squad members", async () => {
      await chai
        .request(app)
        .get(`/squads/${testSquad2.id}/users`)
        .set("Authorization", `Bearer ${testUser1.token}`)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.have.lengthOf(2);
        });
    });
  });

  describe("POST Routes", () => {
    it("should return status code 201 and have a member count of 1 after creating a squad", async () => {
      const res = await chai
        .request(app)
        .post(`/squads`)
        .set("content-type", "application/x-www-form-urlencoded")
        .set("Authorization", `Bearer ${testUser1.token}`)
        .send({ squadName: "foo", squadDescription: "bar" });
      res.should.have.status(201);
      res.body.memberCount.should.be.eql(1);
    });

    it("should return status of 400 if the user has already been added to the squad", async () => {
      const res = await chai
        .request(app)
        .post(`/squads/${testSquad2.id}/users/${testUser2.user.id}`)
        .set("Authorization", `Bearer ${testUser1.token}`);
      res.should.have.status(400);
    });

    it("should return status of 201 if the user was successfully added to the squad", async () => {
      const res = await chai
        .request(app)
        .post(`/squads/${testSquad1.id}/users/${testUser2.user.id}`)
        .set("Authorization", `Bearer ${testUser1.token}`);
      res.should.have.status(201);
    });
  });

  describe("PUT Routes", () => {
    it("should return status code 200 when updating a squad", async () => {
      const res = await chai
        .request(app)
        .put(`/squads/${testSquad1.id}`)
        .set("content-type", "application/x-www-form-urlencoded")
        .set("Authorization", `Bearer ${testUser1.token}`)
        .send({ squadName: "squad updated name", squadDescription: "squad updated description" });
      res.should.have.status(200);
    });

    it("should return status code 404 if squad is not found", async () => {
      const res = await chai
        .request(app)
        .put(`/squads/99999`)
        .set("content-type", "application/x-www-form-urlencoded")
        .set("Authorization", `Bearer ${testUser1.token}`);
      res.should.have.status(400);
    });
  });

  describe("DELETE Routes", () => {
    it("should return status code 201 when a squad is successfully deleted", async () => {
      const res = await chai
        .request(app)
        .delete(`/squads/${testSquad1.id}`)
        .set("content-type", "application/x-www-form-urlencoded")
        .set("Authorization", `Bearer ${testUser1.token}`);
      res.should.have.status(201);
    });

    it("should return status code 404 if a squad to be deleted cannot be found", async () => {
      const res = await chai
        .request(app)
        .delete(`/squads/${testSquad1.id}`)
        .set("content-type", "application/x-www-form-urlencoded")
        .set("Authorization", `Bearer ${testUser1.token}`);
      res.should.have.status(404);
    });

    it("should return status code 201 when a squad member is successfully deleted", async () => {
      const res = await chai
        .request(app)
        .delete(`/squads/${testSquad2.id}/users/${testUser2.user.id}`)
        .set("content-type", "application/x-www-form-urlencoded")
        .set("Authorization", `Bearer ${testUser1.token}`);
      res.should.have.status(201);
    });

    it("should return status code 404 if a squad member to be deleted cannot be found", async () => {
      const res = await chai
        .request(app)
        .delete(`/squads/${testSquad2.id}/users/${testUser2.user.id}`)
        .set("content-type", "application/x-www-form-urlencoded")
        .set("Authorization", `Bearer ${testUser1.token}`);
      res.should.have.status(404);
    });
  });
});
