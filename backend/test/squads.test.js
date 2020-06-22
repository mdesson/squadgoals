const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const app = require("../src/index");

// Models
const User = require("../src/models/user");
const Squad = require("../src/models/squad");

// Util
const createTestUser = require("./util/createTestUser");
const createTestSquad = require("./util/createTestSquad");

const should = chai.should();
const expect = chai.expect;

describe("Squad Tests", () => {
	let token1;
	let token2;

	let testUser1;
	let testUser2;

	let testSquad1;
	let testSquad2;

	let userObject1;
	let userObject2;

	before(async () => {
		userObject1 = await createTestUser("foo1", "bar1", "foo1@bar.com", "foobar1", "foobar1");
		userObject2 = await createTestUser("foo2", "bar2", "foo2@bar.com", "foobar2", "foobar2");

		testUser1 = userObject1.user;
		token1 = userObject1.token;

		testUser2 = userObject2.user;
		token2 = userObject2.token;

		testSquad1 = await createTestSquad(testUser1);
		testSquad2 = await createTestSquad(testUser1);
	});

	after(async () => {
		await User.destroy({ where: {} });
		await Squad.destroy({ where: {} });
	});

	describe("GET Routes", () => {
		it("should return status code 404 if the squad cannot be found", async () => {
			await chai
				.request(app)
				.get(`/squads/99999`)
				.set("Authorization", `Bearer ${token1}`)
				.then((res) => {
					res.should.have.status(404);
				});
		});

		it("should return status code 200 and squad details", async () => {
			await chai
				.request(app)
				.get(`/squads/${testSquad1.id}`)
				.set("Authorization", `Bearer ${token1}`)
				.then((res) => {
					res.should.have.status(201);
					res.body.should.be.eql({
						id: testSquad1.id,
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
				.set("Authorization", `Bearer ${token1}`)
				.then((res) => {
					res.should.have.status(200);
					res.body.should.have.lengthOf(2);
				});
		});

		it("should return status code 204 if the user has not created any squads", async () => {
			await chai
				.request(app)
				.get(`/squads`)
				.set("Authorization", `Bearer ${token2}`)
				.then((res) => {
					res.should.have.status(204);
				});
		});
	});

	describe("POST Routes", () => {
		it("should return status code 201 and have a member count of 1 after creating a squad", async () => {
			const res = await chai
				.request(app)
				.post(`/squads`)
				.set("content-type", "application/x-www-form-urlencoded")
				.set("Authorization", `Bearer ${token1}`)
				.send({ name: "squad foobar" });
			res.should.have.status(201);
			res.body.memberCount.should.be.eql(1);
		});
	});

	describe("PUT Routes", () => {
		it("should return status code 200 when updating a squad", async () => {
			const res = await chai
				.request(app)
				.put(`/squads/${testSquad1.id}`)
				.set("content-type", "application/x-www-form-urlencoded")
				.set("Authorization", `Bearer ${token1}`)
				.send({ name: "squad updated foobars" });
			res.should.have.status(200);
		});

		it("should return status code 404 if squad is not found", async () => {
			const res = await chai
				.request(app)
				.put(`/squads/99999`)
				.set("content-type", "application/x-www-form-urlencoded")
				.set("Authorization", `Bearer ${token1}`)
				.send({});
			res.should.have.status(400);
		});
	});

	describe("DELETE Routes", () => {
		it("should return status code 201 when a squad is successfully deleted", async () => {
			const res = await chai
				.request(app)
				.delete(`/squads/${testSquad1.id}`)
				.set("content-type", "application/x-www-form-urlencoded")
				.set("Authorization", `Bearer ${token1}`);
			res.should.have.status(201);
		});

		it("should return status code 404 if a squad to be deleted cannot be found", async () => {
			const res = await chai
				.request(app)
				.delete(`/squads/${testSquad1.id}`)
				.set("content-type", "application/x-www-form-urlencoded")
				.set("Authorization", `Bearer ${token1}`);
			res.should.have.status(404);
		});
	});
});
