import mongoose from "mongoose";

const ActivityidSchema = new mongoose.Schema({
  Item_No: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  title_no: { type: String, required: true },
  Code_no: { type: String, required: true },
  quantity: { type: Number, required: true, min: 0 },
  analyze: { type: String, required: true },
  amount: { type: Number, required: true, min: 0 },
});

export default mongoose.models.ActivityidData || mongoose.model("ActivityidData", ActivityidSchema);
