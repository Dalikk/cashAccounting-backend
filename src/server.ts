import * as dotenv from "dotenv";
import * as express from "express";
import mongoose from "mongoose";
import * as morgan from "morgan";
import * as rfs from "rotating-file-stream";
import * as path from "path";

import * as OperationController from "./controllers/OperationController";
import * as CashController from "./controllers/CashController";
import * as DebtController from "./controllers/DebtController";
import * as InvoiceController from "./controllers/InvoiceController";
import checkApiKey from "./utils/checkApiKey";
import { operationCreateValidation } from "./utils/validations";
import handleValidationErrors from "./utils/handleValidationErrors";

dotenv.config({path: path.join(__dirname, '../.local.env')});

const port = process.env.PORT || 5001;
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) throw new Error("Mongo URI required");
console.log(mongoUri);

// create a rotating write stream
const accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, '..', 'log')
});

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
app.use(morgan("combined", { stream: accessLogStream }));
app.use(checkApiKey);

app.get('/', (req, res) => {
  res.json({"msg": "hello!"});
})

app.get('/operations', OperationController.getAllOperations);
app.post('/operations', operationCreateValidation, handleValidationErrors, OperationController.createOperation);
app.delete('/operations/:_id', OperationController.deleteOperation)

app.get('/cash', CashController.getCurrentCash);

app.get('/debts', DebtController.getAllDebts);
app.post('/debts', DebtController.createDebt);

app.get('/invoices', InvoiceController.getAllInvoices);
app.post('/invoices', InvoiceController.createInvoice);

try {
  app.listen(port, () => {
    console.log(`Express app started at http://localhost:${port}`)
  });
} catch (err) {
  console.log(err);
}
