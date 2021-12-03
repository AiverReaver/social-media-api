import express from "express";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("*", (req, res) =>
  res.status(200).send({
    message: "Hello World!",
  })
);

export { app };
