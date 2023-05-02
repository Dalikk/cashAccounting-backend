import OperationModel from '../models/Operation';
import DebtModel, { DebtType } from '../models/Debt';
import InvoiceModel from '../models/Invoice';

// export const getCurrentCashState = async (req, res) => {
const getOperationsSum = async () => {
  const operations = await OperationModel.find().exec();
  const operationsSum = operations.reduce(
    (acc, item) => (item.type !== 'cash' ? acc + item.value : acc - item.value),
    0,
  );
  return operationsSum;
};

export const getCurrentCash = async (req, res) => {
  try {
    const cashByProgram = req.body.programsCash;
    const operationsSum = await getOperationsSum();
    const debts: DebtType[] = await DebtModel.find({ isRepaid: false }).exec();
    const debtsSum = debts.reduce((acc, item) => acc + item.value, 0);

    const invoicesSum = (await InvoiceModel.find().exec()).reduce(
      (acc, item) => acc + item.value,
      0,
    );

    const realCash = cashByProgram - operationsSum - debtsSum - invoicesSum;
    return res.json({ cash: realCash });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    res.status(500).json({ msg: 'Something went wrong' });
  }
};
