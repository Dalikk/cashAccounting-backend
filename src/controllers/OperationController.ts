import OperationModel, {
  OperationType,
  OperationTypeCreate,
} from '../models/Operation';
import { Request, Response } from 'express';
import { Error } from '@/types/common';
import { DeleteResult } from 'mongodb';
import { RequestWithBody, RequestWithParams } from '@/types/generics';

export const getAllOperations = async (
  req: Request,
  res: Response<OperationType[] | Error>,
) => {
  try {
    const operations = await OperationModel.find().exec();
    res.json(operations);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    res.status(500).json({ msg: 'Something went wrong' });
  }
};
interface ICreateOperationRequestBody {
  type: 'cash' | 'credit' | 'mobileBank';
  value: number;
  description?: string;
}
export const createOperation = async (
  req: RequestWithBody<ICreateOperationRequestBody>,
  res: Response<OperationType | Error>,
) => {
  try {
    const doc = new OperationModel<OperationTypeCreate>({
      type: req.body.type,
      value: req.body.value,
      description: req.body.description,
    });

    const operation = await doc.save();

    return res.json(operation);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    res.status(500).json({ msg: 'Something went wrong' });
  }
};

export const deleteOperation = async (
  req: RequestWithParams<{ _id }>,
  res: Response<DeleteResult | Error>,
) => {
  try {
    const _id = req.params._id;
    const operation = await OperationModel.deleteOne({ _id });
    res.json(operation);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    res.status(500).json({ msg: 'Something went wrong' });
  }
};
