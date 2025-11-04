import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  console.log("Hello World");
  return res.json({ msg: "Hello World!" });
});
app.get("/api/user/:id", (req, res) => {
  const users = [
    { "id": 1, "nome": "Thiago" },
    { "id": 2, "nome": "João" }
  ]
  const id = parseInt(req.params.id);
  const user = users.filter(usr => usr.id === id)[0];

  return res.json(user);
});

app.listen(3000, () => {
  console.log("servidor rodando na porta 3000");
});
