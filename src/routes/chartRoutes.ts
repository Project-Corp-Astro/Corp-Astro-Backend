import express from "express";
import ChartService from "../service/chartService";
import authMiddleware from "../middleware/authMiddleware";

const chartrouter = express.Router();

// Generate a natal chart
chartrouter.post("/generate",  async (req: any, res: any) => { // Add authMiddleware to the route
  try {
    const userId = req.user?.userId; // Extract userId from authentication middleware
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const { birthDetails } = req.body;
    if (!birthDetails) {
      return res.status(400).json({ error: "Birth details are required" });
    }

    const chart = await ChartService.generateNatalChart(userId, birthDetails);

    return res.status(201).json(chart);
  } catch (error) {
    console.error("Error generating natal chart:", error);
    return res.status(500).json({ error: "Failed to generate chart" });
  }
});

// Get chart by ID
chartrouter.get("/:chartId", async (req, res) => {
  const { chartId } = req.params;
  try {
    const chart = await ChartService.getChartById(chartId);
    res.status(200).json(chart);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch chart" });
  }
});

export default chartrouter;