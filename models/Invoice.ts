import mongoose from "mongoose";

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

export default mongoose.model('Invoice', InvoiceSchema);
