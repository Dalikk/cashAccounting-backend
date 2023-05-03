import * as moment from 'moment';
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
    const year = req.query.year;
    const month = req.query.month;
    const day = req.query.day;

    if (year || month || day) {
      if (year && month && day) {
        // const filterDate = new Date(`${year}-${month}-${day}`);
        const filterDate = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD');
        const operations = await OperationModel.find({
          dateTime: {
            $gte: filterDate.startOf('day').toDate(),
            $lte: filterDate.endOf('day').toDate(), // Add 24 hours to filter by the whole day
          },
        });
        return res.json(operations);
      }
      if (year && month && !day) {
        const filterDate = moment(`${year}-${month}-01`, 'YYYY-MM-DD');
        const lastDayOfMonth = filterDate.clone().endOf('month').date();
        const operations = await OperationModel.find({
          dateTime: {
            $gte: filterDate.startOf('month').toDate(),
            $lte: filterDate.date(lastDayOfMonth).endOf('day').toDate(), // Add 31 days to filter by the whole month
          },
        });
        return res.json(operations);
      } else if (year && !month && !day) {
        const filterDate = moment(`${year}-01-01`, 'YYYY-MM-DD');
        const operations = await OperationModel.find({
          dateTime: {
            $gte: filterDate.startOf('year').toDate(),
            $lte: filterDate.endOf('year').toDate(), // Add 365 days to filter by the whole year
          },
        });
        return res.json(operations);
      }
      return res.status(400).json({ msg: 'Send correct query params' });
    }
    const operations = await OperationModel.find().exec();
    return res.json(operations);
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
  dateTime?: Date;
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
      dateTime: req.body.dateTime ? req.body.dateTime : new Date(),
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
