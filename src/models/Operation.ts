import mongoose, { InferSchemaType } from 'mongoose';

// export interface IOperation {
//   type: 'cash' | 'credit' | 'mobileBank',
//   value: number,
//   description?: string,
// }

const OperationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ['cash', 'credit', 'mobileBank'],
    },
    value: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    dateTime: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  },
);

export type OperationType = InferSchemaType<typeof OperationSchema>;
export type OperationTypeCreate = Omit<
  OperationType,
  'createdAt' | 'updatedAt'
>;

export default mongoose.model('Operation', OperationSchema);
