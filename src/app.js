import express from "express";
import { routers } from "./routes";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", routers);

export { app };
