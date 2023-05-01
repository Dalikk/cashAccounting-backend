import DebtModel from "../models/Debt";

export const getAllDebts = async (req, res) => {
  try {
      const debts = await DebtModel.find().exec();
      res.json(debts);
  } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "Something went wrong" });
  }
}

export const createDebt = async (req, res) => {
  try {
      const doc = new DebtModel({
        clientName: req.body.clientName,
        value: req.body.value,
        description: req.body.description,
        isRepaid: false,
      })

      const debt = await doc.save();
      return res.json(debt);
  } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "Something went wrong" });
  }
}
