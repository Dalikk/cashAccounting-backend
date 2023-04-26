import mongoose from "mongoose";

const DebtSchema = new mongoose.Schema({
    clientName: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isRepaid: {
      type: Boolean,
      required: true,
      default: false,
    }
  },
  {
    timestamps: true
  })

export default mongoose.model('Debt', DebtSchema);
