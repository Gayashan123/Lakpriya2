import connectDB from "../../lib/mongodb";
import ActivityRate from "../../models/activity";

export default async function handler(req, res) {
  await connectDB();

  switch (req.method) {
    case "GET":
      try {
        const items = await ActivityRate.find({});
        return res.status(200).json(items);
      } catch (error) {
        return res.status(500).json({ message: "Error fetching data" });
      }

    case "POST":
      try {
        if (!req.body.name) {
          return res.status(400).json({ message: "Activity name is required" });
        }

        const newActivity = new ActivityRate({
          name: req.body.name,
        });

        await newActivity.save();
        return res.status(201).json({ message: "Activity added successfully", newActivity });
      } catch (error) {
        return res.status(500).json({ message: "Error saving data" });
      }

    case "PUT":
      try {
        const { id, name } = req.body;
        if (!id) {
          return res.status(400).json({ message: "Missing Activity ID" });
        }

        const updatedActivity = await ActivityRate.findByIdAndUpdate(
          id,
          { name },
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

        await ActivityRate.findByIdAndDelete(id);
        return res.status(200).json({ message: "Activity deleted successfully" });
      } catch (error) {
        return res.status(500).json({ message: "Error deleting data" });
      }

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}