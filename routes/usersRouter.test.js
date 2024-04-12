import mongoose from "mongoose";
import app from "../app.js";
import request from "supertest";
import "dotenv/config";

const { DB_HOST } = process.env;

describe("test /api/users/login route", () => {
  // треба підключитися до бази і запустити сервер
  let server = null;
  beforeAll(async () => {
    await mongoose.connect(DB_HOST);
    server = app.listen(3001);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  // afterEach(async () => {
  //   await mongoose.connection.close();
  //   server.close();
  // });

  test("test /api/users/login with valid data", async () => {
    const loginData = {
      email: "alex@g.com",
      password: "123456",
    };

    const response = await request(app)
      .post("/api/users/login")
      .send(loginData);
    const { statusCode, body } = response;
    console.log(statusCode);
    console.log(body);
    expect(statusCode).toBe(200);
    expect(body).toHaveProperty("token");

    const { user } = body;
    expect(typeof user.email).toBe("string");
    expect(typeof user.subscription).toBe("string");
  });
});
