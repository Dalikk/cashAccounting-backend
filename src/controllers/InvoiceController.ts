import { Response } from 'express';
import InvoiceModel, {
  InvoiceCreateType,
  InvoiceType,
} from '../models/Invoice';
import { Error } from '@/types/common';
import { RequestWithBody } from '@/types/generics';

export const getAllInvoices = async (
  req,
  res: Response<InvoiceType[] | Error>,
) => {
  try {
    const invoices = await InvoiceModel.find().exec();
    res.json(invoices);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    res.status(500).json({ msg: 'Something went wrong' });
  }
};

export const createInvoice = async (
  req: RequestWithBody<InvoiceCreateType>,
  res: Response<InvoiceType | Error>,
) => {
  try {
    const doc = new InvoiceModel({
      organizationName: req.body.organizationName,
      value: req.body.value,
      description: req.body.description,
      isPaid: false,
    });

    const invoice = await doc.save();
    return res.json(invoice);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    res.status(500).json({ msg: 'Something went wrong' });
  }
};
