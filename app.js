const express = require("express");
const { questionsRouter } = require("./routers/questions/questions.router");
const { playersRouter } = require("./routers/players/players.router");
const app = express();
const cookieSession = require("cookie-session");
app.use(
  cookieSession({
    secret: "s3cr3t",
    maxAge: 1000 * 1000,
    httpOnly: false,
  })
);

app.use(express.json());

app.use("/api/questions", questionsRouter);

app.use("/api/players", playersRouter);

app.use((err, req, res, next) => {
  console.log(err);
  const status = err.statusCode || 500;
  res.status(status).json(err.message);
});

module.exports = { app };
