const request = require("supertest");
const TestAgent = require("supertest/lib/agent"); // eslint-disable-line no-unused-vars
/**
 * @type {TestAgent}
 */
let app;

beforeAll(() => {
  jest.mock("./", () => require("./homepage"));
  jest.mock("morgan", () => () => {
    const mockMorgan = jest.fn((req, res, next) => next());
    return mockMorgan;
  });
  app = request(require("../app"));
});

afterAll(() => {
  jest.unmock("./");
  jest.unmock("morgan");
  jest.unmock("../lib/knex");
});

describe("GET", () => {
  it('should contain the word "Nadia"', async () => {
    const response = await app.get("/").expect(200);

    expect(response.text).toContain("Nadia");
  });
});

describe("DELETE", () => {
  it("should fail to delete the homepage", () => {
    return app.delete("/").expect(500);
  });
});
