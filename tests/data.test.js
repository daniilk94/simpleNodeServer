import app from "../api/mainapp.js";
import request from "supertest";
import express from "express";
import router from "../api/data.js";

const testApp = express();
testApp.use(express.json());
testApp.use("/data", router);

describe("Test GET requests", () => {
  test("Get /data (should return all users)", async () => {
    const response = await request(app).get("/data");
    expect(response.status).toEqual(200);
  });

  test("Get /data/id (should return user with certain id)", async () => {
    const response = await request(app).get("/data/2");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", 2);
  });
  test("Get /data/non-existing id (should return 404)", async () => {
    const response = await request(app).get("/data/522");
    expect(response.status).toBe(404);
  });
});

describe("Test POST requests", () => {
  test("POST /data with incorrect data type(expect 415)", async () => {
    const newUser = 'forename: "David", surname: "Backham"';
    const response = await request(app)
      .post("/data")
      .send(newUser)
      .set("content-type", "text/plain");
    expect(response.status).toBe(415);
    expect(response.body).toEqual({ Error: "Unsupported Media Type" });
  });

  test("POST /data (creates new user with and return status 201)", async () => {
    const newUser = { forename: "David", surname: "Backham" };
    const response = await request(app)
      .post("/data")
      .send(newUser)
      .set("content-type", "application/json");
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      New_user: {
        id: 5,
        forename: "David",
        surname: "Backham",
      },
    });
  });
});

describe("Test DELETE request", () => {
  test("Delete /data/id (deletes user with certain id. returns status 204)", async () => {
    const response = await request(app).delete("/data/4");
    expect(response.status).toBe(204);
  });

  test("Delete /data/id (if id doesnt exists, returns 404)", async () => {
    const response = await request(app).delete("/data/444");
    expect(response.status).toBe(404);
  });
});

describe("Test PUT request", () => {
  test("Put /data/id with unsupported data type", async () => {
    const newData = 'forename: "Diego", surname: "Maradona"';
    const response = await request(app)
      .put("/data/5")
      .send(newData)
      .set("content-type", "text/plain");
    expect(response.status).toBe(415);
    expect(response.body).toEqual({ Error: "Unsupported Media Type" });
  });
  test("Put /data/id when id does not exist(create new user)", async () => {
    const newData = { forename: "Diego", surname: "Maradona" };
    const response = await request(app)
      .put("/data/15")
      .send(newData)
      .set("content-type", "application/json");
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      New_user: {
        id: 5,
        forename: "Diego",
        surname: "Maradona",
      },
    });
  });
  test("Put /data/id when id exists(update user)", async () => {
    const newData = { forename: "Cristiano", surname: "Ronaldo" };
    const response = await request(app)
      .put("/data/5")
      .send(newData)
      .set("content-type", "application/json");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      Updated_user: {
        id: 5,
        forename: "Cristiano",
        surname: "Ronaldo",
      },
    });
  });
});
