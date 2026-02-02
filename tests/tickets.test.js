"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../src/app/app");
describe("API basics", () => {
    test("GET /api/v1/health", async () => {
        const res = await (0, supertest_1.default)(app_1.app).get("/api/v1/health");
        expect(res.status).toBe(200);
        expect(res.body.status).toBe("OK");
    });
    test("GET /api/v1/tickets", async () => {
        const res = await (0, supertest_1.default)(app_1.app).get("/api/v1/tickets");
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.data)).toBe(true);
    });
    test("GET /api/v1/tickets/999 => 404", async () => {
        const res = await (0, supertest_1.default)(app_1.app).get("/api/v1/tickets/999");
        expect(res.status).toBe(404);
        expect(res.body.message).toBe("Ticket not found");
    });
});
