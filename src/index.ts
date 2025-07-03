import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import apiRoutes from "./routes/routes";
import { Client } from "pg";

dotenv.config();

const app = express();
const client = new Client({
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
});

const frontend = process.env.FRONTEND_URL;
if (!frontend) {
    throw new Error("no frontend url specified");
}
app.use(
    cors({
        origin: frontend,
    }),
);

const init = async () => {
    await client.connect();
    app.locals.pg = client;

    const port = process.env.PORT || 3000;

    app.use(express.json());
    app.use("/", apiRoutes);

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
};

init();

export default app;
