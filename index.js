import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import * as OperationController from "./controllers/OperationController.js";

dotenv.config();

const port = process.env.PORT || 5001;
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) throw new Error("Mongo URI required");
console.log(mongoUri);

mongoose.connect(mongoUri)
  .then(() => {
    console.log('Connected to DB')
  })
  .catch((err) => {
    console.error("Failed to connect DB")
    console.error(err)
  })

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({"msg": "hello!"});
})

app.get('/operations', OperationController.getAllOperations);
app.post('/operations', OperationController.createOperation);

app.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log(`Express app started at http://localhost:${port}`)
});
