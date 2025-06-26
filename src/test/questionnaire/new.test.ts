import request from "supertest";
import { describe, it, expect, beforeAll } from "vitest";
import app from "../../index";
import { validate } from "uuid";

describe("GET /questionnaire/new", () => {
    let res: request.Response;

    beforeAll(async () => {
        res = await request(app).get("/questionnaire/new");
    });

    it("should return 200", () => {
        expect(res.status).toBe(200);
    });

    it("should return a valid ID", async () => {
        expect(validate(res.body.id)).toBeTruthy();
    });

    it("should return different IDs for each request", async () => {
        const other = await request(app).get("/questionnaire/new");
        expect(res.body.id).not.toBe(other.body.id);
    });
});
