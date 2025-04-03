const reservations = require("./reservations");
const Reservation = require("./schema/reservation");

describe('fetch', () => {
  let reservations;

  beforeAll(async () => {
    jest.mock('./reservations');
    reservations = require('./reservations');
  })
})

describe("validate", () => {
  it("should resolve with no optional fields", async () => {
    const reservation = new Reservation({
      date: "2017/06/10",
      time: "06:02 AM",
      party: 4,
      name: "Family",
      email: "username@example.com",
    });

    await expect(reservations.validate(reservation)).resolves.toEqual(
      reservation
    );
  });

  it("should reject with an invalid email", () => {
    const reservation = new Reservation({
      date: "2017/06/10",
      time: "06:02 AM",
      party: 4,
      name: "Family",
      email: "username",
    });

    expect.assertions(1);

    return reservations
      .validate(reservation)
      .catch((error) => expect(error).toBeInstanceOf(Error));
  });

  describe('create', () => {
    it('should reject if validation fails', async () => {
      const original = reservations.validate;

      const error = new Error('fail');

      // Mock the function
      reservations.validate = jest.fn(() => Promise.reject(error));
      await expect(reservations.create()).rejects.toBe(error);

      expect(reservations.validate).toBeCalledTimes(1);

      // Restore
      reservations.validate = original;
    })
  })
});
