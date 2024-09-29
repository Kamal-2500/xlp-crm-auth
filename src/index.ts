import express from "express";
import { authRouter } from "./routes";
import { configs } from "./configs";
import { errorHandler } from "./middlewares";

const app = express();

app.use(express.json());

app.use("/auth", authRouter);

app.listen(configs.server.port, () => {
    console.log(`Server is running on port: ${configs.server.port}`);
});

app.use(errorHandler);