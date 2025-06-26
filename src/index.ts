import express from "express";
import dotenv from "dotenv";
import apiRoutes from "./routes/routes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/", apiRoutes);

export default app;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
