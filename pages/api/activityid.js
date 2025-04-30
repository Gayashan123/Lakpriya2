import connectDB from "../../lib/mongodb";
import ActivityidData from "../../models/activityidData"; // Import the updated model

export default async function handler(req, res) {
  await connectDB();

  switch (req.method) {
    case "GET":
      try {
        const items = await ActivityidData.find({}); // Using ActivityidData model to fetch data
        return res.status(200).json(items);
      } catch (error) {
        return res.status(500).json({ message: "Error fetching data" });
      }

    case "POST":
      try {
        const { Item_No, title, title_no, Code_no,quantity,analyze } = req.body;

        // Ensure that necessary fields are provided
        if (!Item_No || !title || !title_no || !Code_no ||!analyze|| quantity == null ) {
          return res.status(400).json({ message: "All fields are required" });
        }

        const newActivity = new ActivityidData({
          Item_No,
          title,
          title_no,
          Code_no,
          quantity,
          analyze,
          amount: quantity * price, // Calculating amount before saving
        });

        await newActivity.save();
        return res.status(201).json({ message: "Activity added successfully", newActivity });
      } catch (error) {
        return res.status(500).json({ message: "Error saving data" });
      }

    case "PUT":
      try {
        const { id, Item_No, title, title_no, Code_no,analyze,quantity } = req.body;

        if (!id) {
          return res.status(400).json({ message: "Missing Activity ID" });
        }

        // Update the activity with the new data, also calculate the new amount
        const updatedActivity = await ActivityidData.findByIdAndUpdate(
          id,
          {
            Item_No,
            title,
            title_no,
            Code_no,
             quantity,
             analyze,
           amount: quantity * price, // Recalculate the amount
          },
          { new: true }
        );

        if (!updatedActivity) {
          return res.status(404).json({ message: "Activity not found" });
        }

        return res.status(200).json({ message: "Activity updated", updatedActivity });
      } catch (error) {
        return res.status(500).json({ message: "Error updating data" });
      }

    case "DELETE":
      try {
        const { id } = req.body;
        if (!id) {
          return res.status(400).json({ message: "Missing ID for deletion" });
        }

        await ActivityidData.findByIdAndDelete(id); // Delete using the ActivityidData model
        return res.status(200).json({ message: "Activity deleted successfully" });
      } catch (error) {
        return res.status(500).json({ message: "Error deleting data" });
      }

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
