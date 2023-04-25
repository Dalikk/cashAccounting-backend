import dotenv from "dotenv";
import express from "express";

dotenv.config();

const port = process.env.PORT || 5001;

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({"msg": "hello!"});
})

app.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log(`Express app started at http://localhost:${port}`)
});
