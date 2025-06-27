import express from "express";
import dotenv from "dotenv";
import apiRoutes from "./routes/routes";
import { Client } from "pg";

dotenv.config();

const app = express();
const client = new Client();

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
