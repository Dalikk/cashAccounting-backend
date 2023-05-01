import InvoiceModel from "../models/Invoice";

export const getAllInvoices = async (req, res) => {
  try {
    const invoices = await InvoiceModel.find().exec();
    res.json(invoices);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Something went wrong" });
  }
}

export const createInvoice = async (req, res) => {
  try {
    const doc = new InvoiceModel({
      organizationName: req.body.organizationName,
      value: req.body.value,
      description: req.body.description,
      isPaid: false,
    })

    const invoice = await doc.save();
    return res.json(invoice);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Something went wrong" });
  }
}
