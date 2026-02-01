import request from "supertest";
import { app } from "../src/app/app";

describe("Urgency endpoint", () => {
  test("resolved ticket => minimal", async () => {
    const res = await request(app).get("/api/v1/tickets/7/urgency");
    expect(res.status).toBe(200);
    expect(res.body.data.urgencyScore).toBe(0);
    expect(res.body.data.urgencyLevel).toContain("Minimal");
  });

  test("missing ticket => 404", async () => {
    const res = await request(app).get("/api/v1/tickets/999/urgency");
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Ticket not found");
  });
});

describe("Validation", () => {
  test("POST missing title => 400", async () => {
    const res = await request(app).post("/api/v1/tickets").send({
      description: "x",
      priority: "low"
    });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Missing required field: title");
  });
});
