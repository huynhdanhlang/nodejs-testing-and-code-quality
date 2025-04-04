const request = require("supertest");
const TestAgent = require("supertest/lib/agent"); // eslint-disable-line no-unused-vars

/**
 * @type {TestAgent}
 */
let app;

beforeAll(() => {
  // Mock index route
  jest.mock('./', () => require('./admin'));

  /// Mock logger
  jest.mock("morgan", () => () => {
    const mockMorgan = jest.fn((req, res, next) => next());
    return mockMorgan;
  });
  jest.mock("../lib/knex", () => {
    const mockTable = jest.fn().mockResolvedValue([]);

    return { select: () => ({ table: mockTable }) };
  });
  app = request(require("../app"));
});

afterAll(() => {
  jest.unmock('./');
  jest.unmock("morgan");
  jest.unmock("../lib/knex");
});

describe("GET", () => {
  it("should allow access with a password", () => {
    return app.get("/admin").auth("admin", "admin").expect(200);
  });

  it("should reject access without a password", () => {
    return app.get("/admin").expect(401);
  });
});
