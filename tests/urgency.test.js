"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../src/app/app");
describe("Urgency endpoint", () => {
    test("resolved ticket => minimal", async () => {
        const res = await (0, supertest_1.default)(app_1.app).get("/api/v1/tickets/7/urgency");
        expect(res.status).toBe(200);
        expect(res.body.data.urgencyScore).toBe(0);
        expect(res.body.data.urgencyLevel).toContain("Minimal");
    });
    test("missing ticket => 404", async () => {
        const res = await (0, supertest_1.default)(app_1.app).get("/api/v1/tickets/999/urgency");
        expect(res.status).toBe(404);
        expect(res.body.message).toBe("Ticket not found");
    });
});
describe("Validation", () => {
    test("POST missing title => 400", async () => {
        const res = await (0, supertest_1.default)(app_1.app).post("/api/v1/tickets").send({
            description: "x",
            priority: "low"
        });
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Missing required field: title");
    });
});
