import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../../index";

describe("POST /questionnaire/submit", () => {
    it("should return 200", async () => {
        const answerSheet = {
            id: "af997add-5175-4030-bc6f-08621b164b5b",
            responses: [
                {
                    id: "A",
                    selectedChoices: ["a"],
                },
            ],
        };

        const res = await request(app)
            .post("/questionnaire/submit")
            .send(answerSheet)
            .set("Content-Type", "application/json");

        expect(res.status).toBe(200);
        expect(res.body.tallies).toBeDefined();
    });

    it("should fail on an empty answer sheet", async () => {
        const res = await request(app)
            .post("/questionnaire/submit")
            .send({})
            .set("Content-Type", "application/json");

        expect(res.status).toBe(400);
        expect(res.body.tallies).not.toBeDefined();
    });
});
