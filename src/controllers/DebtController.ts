import { Response } from 'express';
import DebtModel, { DebtCreateType, DebtType } from '../models/Debt';
import { Error } from '@/types/common';
import { RequestWithBody } from '@/types/generics';

export const getAllDebts = async (req, res: Response<DebtType[] | Error>) => {
  try {
    const debts = await DebtModel.find().exec();
    res.json(debts);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    res.status(500).json({ msg: 'Something went wrong' });
  }
};

export const createDebt = async (
  req: RequestWithBody<DebtCreateType>,
  res: Response<DebtType | Error>,
) => {
  try {
    const doc = new DebtModel({
      clientName: req.body.clientName,
      value: req.body.value,
      description: req.body.description,
      isRepaid: false,
    });

    const debt = await doc.save();
    return res.json(debt);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    res.status(500).json({ msg: 'Something went wrong' });
  }
};
