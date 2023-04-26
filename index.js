import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import * as OperationController from "./controllers/OperationController.js";
import * as CashController from "./controllers/CashController.js";
import * as DebtController from "./controllers/DebtController.js";
import * as InvoiceController from "./controllers/InvoiceController.js";

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

app.get('/cash', CashController.getCurrentCash);

app.get('/debts', DebtController.getAllDebts);
app.post('/debts', DebtController.createDebt);

app.get('/invoices', InvoiceController.getAllInvoices);
app.post('/invoices', InvoiceController.createInvoice);

app.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log(`Express app started at http://localhost:${port}`)
});
