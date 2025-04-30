import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema({
  
  name: { type: String, required: true },
  
});

export default mongoose.models.ActivityData || mongoose.model("ActivityData", ActivitySchema);
