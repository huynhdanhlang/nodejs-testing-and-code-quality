const request = require("supertest");
const TestAgent = require("supertest/lib/agent"); // eslint-disable-line no-unused-vars
/**
 * @type {TestAgent}
 */
let app;

beforeAll(() => {
  jest.mock("./", () => require("./reservations"));
  jest.mock("morgan", () => () => {
    const morganMocked = jest.fn((req, res, next) => next());
    return morganMocked;
  });

  jest.mock("../lib/knex", () => () => {
    const mockInsert = jest.fn().mockResolvedValue([1234]);
    return {
      insert: mockInsert,
    };
  });

  app = request(require("../app"));
});

afterAll(() => {
  jest.unmock("./");
  jest.unmock("morgan");
  jest.unmock("../lib/knex");
});

describe("GET", () => {
  it("should be return the reservation form", async () => {
    const response = await app
      .get("/reservations")
      .expect("Content-Type", /html/)
      .expect(200);

    expect(response.text).toContain(
      "To make reservations please fill out the following form"
    );
  });
});

describe("POST", () => {
  it("should be reject an invalid reservation request", async () => {
    const response = await app.post("/reservations").type("form").send({
      date: "2025/06/10",
      time: "06:10 AM",
      party: "bananas",
      name: "Family",
      email: "username@example.com",
    });

    expect(response.text).toContain(
      "Sorry, there was a problem with your booking request"
    );
    expect(response.status).toBe(400);
  });

  it("should be accept a valid reservation request", async () => {
    const response = await app
      .post("/reservations")
      .type("form")
      .send({
        date: "2025/06/10",
        time: "06:10 AM",
        party: 4,
        name: "Family",
        email: "username@example.com",
      })
      .expect(200);

    expect(response.text).toContain("Thanks, your booking request #1234");
    expect(response.status).toBe(200);
  });
});
