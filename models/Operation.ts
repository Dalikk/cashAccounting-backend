import mongoose from "mongoose";

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
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Operation', OperationSchema);
