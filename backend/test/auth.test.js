require("dotenv/config");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const sequelize = require("../src/util/database");
const authMiddleware = require("../src/middleware/isAuth");
const authService = require("../src/services/authService");

const expect = chai.expect;

describe("Authentication Tests", () => {
  before(async () => {
    await sequelize.sync({ force: true });

    const firstName = "foo";
    const lastName = "bar";
    const email = "foo@bar.com";
    const aspirationalMessage = "foobar";
    const password = "foobar1";

    await authService.SignUp(firstName, lastName, email, aspirationalMessage, password);
  });

  describe("Auth Middleware", () => {
    it("should throw an error if no authorization header is present", () => {
      const req = {
        get: (headerName) => {
          return null;
        },
      };

      expect(authMiddleware.getTokenFromHeader.bind(this, req)).to.throw("Not Authenticated");
    });

    it("should throw an error if the authorization header contains no token", () => {
      const req = {
        get: (headerName) => {
          return "foobar";
        },
      };

      expect(authMiddleware.getTokenFromHeader.bind(this, req)).to.throw("No Bearer Token");
    });

    it("should return a token for the jwt authentication method", () => {
      const req = {
        get: (headerName) => {
          return "Bearer foobar";
        },
      };

      const result = authMiddleware.getTokenFromHeader(req);

      expect(result).to.equal("foobar");
    });
  });

  describe("Auth Service", () => {
    it("should throw an error if not all user information is provided when creating a user", async () => {
      const firstName = "foo";
      const lastName = "bar";
      const email = "foo@bar.com";
      const aspirationalMessage = null;

      await expect(authService.SignUp(firstName, lastName, email, aspirationalMessage)).to.be.rejectedWith(
        "notNull Violation: user.aspirationalMessage cannot be null"
      );
    });

    it("should return a token and user after successful signup", async () => {
      const firstName = "test";
      const lastName = "user";
      const email = "test@user.com";
      const aspirationalMessage = "testuser";
      const password = "testuser123";

      const result = await authService.SignUp(firstName, lastName, email, aspirationalMessage, password);

      expect(result).to.have.property("token");
      expect(result).to.have.property("user");
    });

    it("should throw an error during login if the user does not exist", async () => {
      const email = "foo2@bar.com";
      const password = "foobar1";

      result = await authService.Login(email, password);

      expect(result).to.have.property("error", "Invalid username or password");
    });

    it("should throw an error during login if the password is incorrect", async () => {
      const email = "foo@bar.com";
      const password = "foobar2";

      result = await authService.Login(email, password);

      expect(result).to.have.property("error", "Invalid username or password");
    });

    it("should allow the user to login if the email and password is correct", async () => {
      const email = "foo@bar.com";
      const password = "foobar1";

      result = await authService.Login(email, password);

      expect(result).to.have.property("token");
      expect(result).to.have.property("user");
    });
  });
});
