import express from "express";

const app = express();

app.get("/", (req, res) => {
  console.log("Hello World");
  return res.json({ msg: "Hello World!" });
});

app.listen(3000, () => {
  console.log("servidor rodando na porta 3000");
});
