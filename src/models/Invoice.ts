import mongoose, { InferSchemaType } from "mongoose";

const InvoiceSchema = new mongoose.Schema({
    organizationName: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    }
  },
  {
    timestamps: true
  })

export type InvoiceType = InferSchemaType<typeof InvoiceSchema>;
export type InvoiceCreateType = Omit<InvoiceType, 'createdAt' | 'updatedAt'>;

export default mongoose.model('Invoice', InvoiceSchema);
