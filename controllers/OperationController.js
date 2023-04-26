import OperationModel from "../models/Operation.js";

export const getAllOperations = async (req, res) => {
  try {
    const operations = await OperationModel.find().exec();
    res.json(operations);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Something went wrong" });
  }
}

export const createOperation = async (req, res) => {
  try {
      const doc = new OperationModel({
        type: req.body.type,
        value: req.body.value,
        description: req.body.description
      });

      const operation = await doc.save();

      return res.json(operation);
  } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "Something went wrong" });
  }
}